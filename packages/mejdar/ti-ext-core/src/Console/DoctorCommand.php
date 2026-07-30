<?php

declare(strict_types=1);

namespace Mejdar\Core\Console;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;

class DoctorCommand extends Command
{
    protected $signature = 'mejdar:doctor';

    protected $description = 'Check system health and configuration';

    public function handle(): int
    {
        $this->info('MEJDAR Doctor');
        $this->info('============');
        $this->newLine();

        $issues = [];

        // PHP Version
        $this->line('PHP Version: ' . PHP_VERSION);
        if (version_compare(PHP_VERSION, '8.3.0', '<')) {
            $issues[] = 'PHP 8.3+ is required';
            $this->error('  ✗ PHP 8.3+ is required');
        } else {
            $this->info('  ✓ PHP version OK');
        }

        // Laravel Version
        $this->line('Laravel Version: ' . app()->version());

        // Database
        $this->newLine();
        $this->line('Database:');
        try {
            DB::connection()->getPdo();
            $this->info('  ✓ Database connected');
        } catch (\Exception $e) {
            $issues[] = 'Database connection failed: ' . $e->getMessage();
            $this->error('  ✗ Database connection failed');
        }

        // Cache
        $this->line('Cache:');
        try {
            Cache::store('default')->put('doctor_check', true, 10);
            $this->info('  ✓ Cache working');
        } catch (\Exception $e) {
            $issues[] = 'Cache not working: ' . $e->getMessage();
            $this->error('  ✗ Cache not working');
        }

        // Queue
        $this->line('Queue:');
        $queueDriver = config('queue.default');
        $this->info('  Queue driver: ' . $queueDriver);
        if ($queueDriver === 'sync') {
            $this->warn('  ⚠ Queue is set to sync (jobs run synchronously)');
        } else {
            $this->info('  ✓ Queue configured');
        }

        // Theme
        $this->newLine();
        $this->line('Theme:');
        try {
            $theme = resolve(\Igniter\Main\Classes\ThemeManager::class)->getActiveTheme();
            $this->info('  ✓ Active theme: ' . $theme->getName() . ' (' . $theme->getCode() . ')');
        } catch (\Exception $e) {
            $issues[] = 'No active theme: ' . $e->getMessage();
            $this->error('  ✗ No active theme');
        }

        // Locations
        $this->newLine();
        $this->line('Data:');
        $locations = \Igniter\Local\Models\Location::count();
        $menus = \Igniter\Cart\Models\Menu::count();
        $categories = \Igniter\Cart\Models\Category::count();
        $orders = \Igniter\Main\Models\Order::count();

        $this->info("  Locations: {$locations}");
        $this->info("  Menu items: {$menus}");
        $this->info("  Categories: {$categories}");
        $this->info("  Orders: {$orders}");

        // Summary
        $this->newLine();
        if (empty($issues)) {
            $this->info('All checks passed!');
            return Command::SUCCESS;
        } else {
            $this->error(count($issues) . ' issue(s) found:');
            foreach ($issues as $issue) {
                $this->error("  - {$issue}");
            }
            return Command::FAILURE;
        }
    }
}
