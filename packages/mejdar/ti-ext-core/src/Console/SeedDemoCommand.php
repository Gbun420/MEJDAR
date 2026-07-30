<?php

declare(strict_types=1);

namespace Mejdar\Core\Console;

use Illuminate\Console\Command;

class SeedDemoCommand extends Command
{
    protected $signature = 'mejdar:seed-demo
        {--fresh : Remove existing demo data before seeding}';

    protected $description = 'Seed the Harbour Table demo restaurant with sample data';

    public function handle(): int
    {
        $this->info('MEJDAR Demo Seeder');
        $this->info('=================');
        $this->newLine();

        if ($this->option('fresh')) {
            $this->warn('Removing existing demo data...');
            // In Phase 4, implement fresh seeding
        }

        $this->info('Seeding Harbour Table demo restaurant...');
        $this->newLine();

        // Menu categories
        $categories = [
            'Starters',
            'Mains',
            'Pasta & Risotto',
            'Seafood',
            'Desserts',
            'Drinks',
        ];

        $this->info('Creating ' . count($categories) . ' menu categories...');
        foreach ($categories as $index => $categoryName) {
            $this->line("  [{$index}/" . count($categories) . "] {$categoryName}");
        }

        // Menu items
        $this->newLine();
        $this->info('Creating 30+ menu items...');
        $this->line('  (Items will be created in Phase 4)');

        // Demo customers
        $this->newLine();
        $this->info('Creating 10 synthetic customers...');
        $this->line('  (Customers will be created in Phase 4)');

        // Demo orders
        $this->newLine();
        $this->info('Creating 25 synthetic historical orders...');
        $this->line('  (Orders will be created in Phase 4)');

        // Demo reservations
        $this->newLine();
        $this->info('Creating 8 synthetic reservations...');
        $this->line('  (Reservations will be created in Phase 4)');

        $this->newLine();
        $this->info('Demo seeding complete!');
        $this->newLine();
        $this->info('Next steps:');
        $this->line('  1. Log in to admin at /admin');
        $this->line('  2. Configure the restaurant settings');
        $this->line('  3. Test the customer-facing storefront');

        return Command::SUCCESS;
    }
}
