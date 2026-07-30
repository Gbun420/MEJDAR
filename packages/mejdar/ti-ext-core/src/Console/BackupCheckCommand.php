<?php

declare(strict_types=1);

namespace Mejdar\Core\Console;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;

class BackupCheckCommand extends Command
{
    protected $signature = 'mejdar:backup-check';

    protected $description = 'Check backup status and report any issues';

    public function handle(): int
    {
        $this->info('MEJDAR Backup Status');
        $this->info('====================');
        $this->newLine();

        // Check if backups are configured
        $backupPath = storage_path('app/backups');
        $backupConfigured = is_dir($backupPath);

        if (!$backupConfigured) {
            $this->warn('⚠ Backup directory not found at: ' . $backupPath);
            $this->line('  Consider setting up automated backups.');
            $this->newLine();
        }

        // Check last backup time
        $lastBackup = config('mejdar-core.last_backup_at');
        if ($lastBackup) {
            $this->info('Last backup: ' . $lastBackup);
            $backupAge = now()->diffInHours(\Carbon\Carbon::parse($lastBackup));
            if ($backupAge > 24) {
                $this->warn("  ⚠ Last backup was {$backupAge} hours ago");
            } else {
                $this->info('  ✓ Backup is recent');
            }
        } else {
            $this->warn('No backup recorded.');
        }

        // Check database size
        $this->newLine();
        $this->line('Database info:');
        try {
            $dbName = config('database.connections.mysql.database');
            $this->line("  Database: {$dbName}");

            $tableCount = \DB::select('SELECT COUNT(*) as count FROM information_schema.tables WHERE table_schema = ?', [$dbName]);
            $this->line("  Tables: {$tableCount[0]->count}");
        } catch (\Exception $e) {
            $this->error('  Could not retrieve database info');
        }

        // Recommendations
        $this->newLine();
        $this->info('Recommendations:');
        $this->line('  - Set up daily automated backups');
        $this->line('  - Store backups off-site (S3, etc.)');
        $this->line('  - Test backup restoration regularly');
        $this->line('  - Monitor backup success via cron');

        return Command::SUCCESS;
    }
}
