<?php

declare(strict_types=1);

namespace Mejdar\Core\Console;

use Illuminate\Console\Command;

class ProvisionCommand extends Command
{
    protected $signature = 'mejdar:provision
        {--env=local : Environment to provision for}
        {--seed-demo : Also seed demo data}
        {--force : Skip production safety check}';

    protected $description = 'Provision a new MEJDAR installation with safe defaults';

    public function handle(): int
    {
        $this->info('MEJDAR Provisioning');
        $this->info('==================');
        $this->newLine();

        // Safety check
        if (app()->environment('production') && !$this->option('force')) {
            $this->error('Refusing to provision in production without --force flag.');
            $this->line('Use: php artisan mejdar:provision --force --env=production');
            return Command::FAILURE;
        }

        $environment = $this->option('env');
        $this->info("Environment: {$environment}");
        $this->newLine();

        // Step 1: Validate environment variables
        $this->line('Step 1: Validating environment...');
        $requiredVars = [
            'APP_KEY',
            'DB_HOST',
            'DB_DATABASE',
            'DB_USERNAME',
        ];

        $missing = [];
        foreach ($requiredVars as $var) {
            if (empty(config("database.connections.mysql.{$this->getEnvKey($var)}"))) {
                // Check in .env
                $missing[] = $var;
            }
        }

        if (!empty($missing)) {
            $this->warn('  Warning: Some environment variables may not be configured:');
            foreach ($missing as $var) {
                $this->warn("    - {$var}");
            }
        } else {
            $this->info('  ✓ Environment variables OK');
        }

        // Step 2: Run migrations
        $this->newLine();
        $this->line('Step 2: Running migrations...');
        $exitCode = $this->call('migrate', ['--force' => true]);
        if ($exitCode !== 0) {
            $this->error('  ✗ Migration failed');
            return Command::FAILURE;
        }
        $this->info('  ✓ Migrations complete');

        // Step 3: Set safe defaults
        $this->newLine();
        $this->line('Step 3: Configuring safe defaults...');
        $this->setDefaults();
        $this->info('  ✓ Defaults configured');

        // Step 4: Seed demo data if requested
        if ($this->option('seed-demo')) {
            $this->newLine();
            $this->line('Step 4: Seeding demo data...');
            $this->call('mejdar:seed-demo');
        }

        // Summary
        $this->newLine();
        $this->info('Provisioning complete!');
        $this->newLine();
        $this->info('Summary:');
        $this->line('  - Application configured for: ' . $environment);
        $this->line('  - Database: ' . config('database.default'));
        $this->line('  - Cache: ' . config('cache.default'));
        $this->line('  - Queue: ' . config('queue.default'));
        $this->line('  - Mail: ' . config('mail.default'));
        $this->newLine();

        return Command::SUCCESS;
    }

    protected function setDefaults(): void
    {
        // Set default settings if not already set
        $defaults = [
            'site_name' => 'Restaurant',
            'site_description' => 'Welcome to our restaurant',
            'enable_delivery' => true,
            'enable_collection' => true,
            'enable_reservations' => true,
        ];

        foreach ($defaults as $key => $value) {
            if (!setting($key)) {
                Setting::set($key, $value);
            }
        }

        Setting::save();
    }

    protected function getEnvKey(string $key): string
    {
        return strtolower(str_replace('.', '_', $key));
    }
}
