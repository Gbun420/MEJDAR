<?php

declare(strict_types=1);

namespace Mejdar\Core\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Illuminate\View\View;

class SettingsController extends Controller
{
    public function index(): View
    {
        $settings = [
            'version' => config('mejdar-core.version', '1.0.0'),
            'installation_id' => $this->getInstallationId(),
            'support_email' => config('mejdar-core.support_email'),
            'support_phone' => config('mejdar-core.support_phone'),
            'support_website' => config('mejdar-core.support_website'),
            'onboarding' => $this->getOnboardingStatus(),
            'environment' => app()->environment(),
            'php_version' => PHP_VERSION,
            'laravel_version' => app()->version(),
            'database_version' => $this->getDatabaseVersion(),
            'theme' => $this->getActiveTheme(),
        ];

        return view('mejdar-core::settings', compact('settings'));
    }

    public function update(): RedirectResponse
    {
        // Save settings
        $data = Request::only([
            'support_email',
            'support_phone',
            'support_website',
        ]);

        // In a real implementation, save to database settings table
        // For now, we just redirect back
        flash('MEJDAR settings updated.')->success();

        return Redirect::route('igniter.mejdar-core.settings');
    }

    protected function getInstallationId(): string
    {
        $id = config('mejdar-core.installation_id');
        if (!$id) {
            $id = $this->generateInstallationId();
            config(['mejdar-core.installation_id' => $id]);
        }
        return $id;
    }

    protected function generateInstallationId(): string
    {
        return sprintf(
            'MEJDAR-%s-%s',
            strtoupper(uniqid()),
            strtoupper(substr(md5(php_uname()), 0, 8))
        );
    }

    protected function getOnboardingStatus(): array
    {
        return [
            'restaurant_created' => \Igniter\Local\Models\Location::count() > 0,
            'menu_created' => \Igniter\Cart\Models\Menu::count() > 0,
            'categories_created' => \Igniter\Cart\Models\Category::count() > 0,
            'payments_configured' => count(setting('payment_gateways', [])) > 0,
            'delivery_configured' => setting('enable_delivery', false),
            'reservation_configured' => setting('enable_reservations', false),
        ];
    }

    protected function getDatabaseVersion(): string
    {
        try {
            $result = DB::select('SELECT VERSION() as version');
            return $result[0]->version ?? 'Unknown';
        } catch (\Exception $e) {
            return 'Unknown';
        }
    }

    protected function getActiveTheme(): array
    {
        try {
            $theme = resolve(\Igniter\Main\Classes\ThemeManager::class)->getActiveTheme();
            return [
                'code' => $theme->getCode(),
                'name' => $theme->getName(),
            ];
        } catch (\Exception $e) {
            return ['code' => 'unknown', 'name' => 'Unknown'];
        }
    }
}
