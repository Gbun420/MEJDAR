# MEJDAR — Development Makefile

.PHONY: help up down install seed test logs shell reset clean build

# ─── Default target ──────────────────────────────────────────────────
help: ## Show this help
	@echo "MEJDAR Development Commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# ─── Docker lifecycle ────────────────────────────────────────────────
up: ## Start all services in background
	docker compose up -d
	@echo ""
	@echo "Services starting..."
	@echo "  Restaurant: http://localhost:8080"
	@echo "  Admin:      http://localhost:8080/admin"
	@echo "  Mailpit:    http://localhost:8025"
	@echo "  MySQL:      localhost:3306"
	@echo "  Redis:      localhost:6379"

down: ## Stop all services
	docker compose down

restart: ## Restart all services
	docker compose restart

logs: ## Follow all service logs
	docker compose logs -f

logs-app: ## Follow app logs only
	docker compose logs -f app

logs-nginx: ## Follow nginx logs only
	docker compose logs -f nginx

# ─── Shell access ────────────────────────────────────────────────────
shell: ## Open a bash shell in the app container
	docker compose exec app sh

shell-mysql: ## Open MySQL CLI
	docker compose exec mysql mysql -u mejdar -psecret mejdar

# ─── Application setup ──────────────────────────────────────────────
install: ## Create TastyIgniter project in apps/restaurant
	docker compose run --rm app composer create-project tastyigniter/tastyigniter /var/www/html --no-interaction
	docker compose run --rm app php artisan igniter:install --no-interaction

seed: ## Seed the Harbour Table demo data
	docker compose run --rm app php artisan migrate --seed

reset: ## Reset database and re-seed
	docker compose run --rm app php artisan migrate:fresh --seed

clear: ## Clear all caches
	docker compose run --rm app php artisan cache:clear
	docker compose run --rm app php artisan config:clear
	docker compose run --rm app php artisan view:clear
	docker compose run --rm app php artisan event:clear

optimize: ## Optimize for production
	docker compose run --rm app php artisan config:cache
	docker compose run --rm app php artisan route:cache
	docker compose run --rm app php artisan view:cache

# ─── Testing ─────────────────────────────────────────────────────────
test: ## Run PHP tests
	docker compose run --rm app php artisan test

test-verbose: ## Run PHP tests with verbose output
	docker compose run --rm app php artisan test --verbose

# ─── Queue ───────────────────────────────────────────────────────────
queue-work: ## Start queue worker (foreground)
	docker compose run --rm app php artisan queue:work redis

queue-restart: ## Restart queue workers
	docker compose run --rm app php artisan queue:restart

queue-failed: ## List failed jobs
	docker compose run --rm app php artisan queue:failed

queue-retry: ## Retry all failed jobs
	docker compose run --rm app php artisan queue:retry all

# ─── Artisan shortcuts ──────────────────────────────────────────────
artisan: ## Run artisan command (usage: make artisan args="migrate")
	docker compose run --rm app php artisan $(args)

doctor: ## Run MEJDAR doctor check
	docker compose run --rm app php artisan mejdar:doctor

# ─── Maintenance ─────────────────────────────────────────────────────
clean: ## Remove stopped containers and dangling images
	docker compose down --remove-orphans
	docker image prune -f

nuke: ## Full reset: remove containers, volumes, and images
	docker compose down -v --remove-orphans
	docker image prune -f
	@echo "All containers, volumes, and dangling images removed."

status: ## Show container status
	docker compose ps

health: ## Check service health
	@echo "=== Nginx ==="
	@curl -sf http://localhost:8080/ > /dev/null && echo "OK" || echo "FAIL"
	@echo "=== Mailpit ==="
	@curl -sf http://localhost:8025/ > /dev/null && echo "OK" || echo "FAIL"
