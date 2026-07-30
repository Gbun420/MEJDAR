<?php

declare(strict_types=1);

namespace Mejdar\Core;

use Illuminate\Support\Facades\Route;

class ServiceProvider extends \Illuminate\Support\ServiceProvider
{
    public function register(): void
    {
        $this->mergeConfigFrom(__DIR__.'/../config/mejdar-core.php', 'mejdar-core');

        // Register commands
        $this->commands([
            Console\DoctorCommand::class,
            Console\SeedDemoCommand::class,
            Console\ProvisionCommand::class,
            Console\BackupCheckCommand::class,
        ]);

        // Register role manager
        $this->app->singleton(Classes\RoleManager::class);
    }

    public function boot(): void
    {
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'mejdar-core');
        $this->loadTranslationsFrom(__DIR__.'/../resources/lang', 'mejdar.core');

        $this->registerRoutes();
        $this->registerSettingsTab();
    }

    protected function registerRoutes(): void
    {
        Route::middleware(['web', 'admin'])->prefix('admin/mejdar')->group(function(): void {
            Route::get('settings', [Http\Controllers\SettingsController::class, 'index'])->name('igniter.mejdar-core.settings');
            Route::post('settings', [Http\Controllers\SettingsController::class, 'update'])->name('igniter.mejdar-core.settings.update');
        });

        // Health endpoint (no auth required)
        Route::middleware(['web'])->prefix('api')->group(function(): void {
            Route::get('health', [Http\Controllers\HealthController::class, 'index'])->name('igniter.mejdar-core.health');
        });
    }

    protected function registerSettingsTab(): void
    {
        // Register settings in admin
        \Event::listen('admin.menu.extendItems', function($manager): void {
            $manager->addSideMenuItem('main', 'advanced', 'mejdar', [
                'label' => 'MEJDAR',
                'icon' => 'icon-settings',
                'url' => 'mejdar/settings',
                'permission' => 'igniter.manage_settings',
            ]);
        });
    }
}
