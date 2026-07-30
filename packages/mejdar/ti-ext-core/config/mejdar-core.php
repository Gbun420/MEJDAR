<?php

declare(strict_types=1);

return [
    /*
    |--------------------------------------------------------------------------
    | MEJDAR Core Configuration
    |--------------------------------------------------------------------------
    */

    // Version display
    'version' => '1.0.0',

    // Installation identifier (generated on first install)
    'installation_id' => null,

    // Support details
    'support_email' => env('MEJDAR_SUPPORT_EMAIL', 'support@mejdar.com'),
    'support_phone' => env('MEJDAR_SUPPORT_PHONE', '+356 2123 4567'),
    'support_website' => env('MEJDAR_SUPPORT_WEBSITE', 'https://mejdar.com/support'),

    // Health check settings
    'health_check_enabled' => true,

    // Onboarding
    'onboarding_completed' => false,

    // Backup status
    'last_backup_at' => null,
    'backup_status' => 'unknown',
];
