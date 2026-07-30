<?php

declare(strict_types=1);

namespace Mejdar\ThemeOrder;

use Igniter\Main\Classes\Theme;
use Illuminate\Support\Facades\View as ViewFacade;
use Illuminate\View\View;

class ServiceProvider extends \Illuminate\Support\ServiceProvider
{
    public function register(): void
    {
        // Merge MEJDAR default config
        $this->mergeConfigFrom(__DIR__.'/../config/mejdar-theme.php', 'mejdar-theme');
    }

    public function boot(): void
    {
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'mejdar-order');
        $this->loadTranslationsFrom(__DIR__.'/../resources/lang', 'mejdar.theme');

        $this->publishes([
            __DIR__.'/../resources/views' => resource_path('views/vendor/mejdar-order'),
        ], 'mejdar-theme-views');

        $this->publishes([
            __DIR__.'/../public' => public_path('vendor/mejdar-order'),
        ], 'mejdar-theme-assets');

        $this->composeViewVariables();
    }

    protected function composeViewVariables(): void
    {
        ViewFacade::composer('*', function(View $view): void {
            $themeData = $this->getThemeData();

            $view->with([
                'mejdar_brand' => [
                    'name' => config('mejdar-theme.brand_name', 'MEJDAR'),
                    'primary_colour' => $themeData['primary_colour'] ?? '#006D6D',
                    'secondary_colour' => $themeData['secondary_colour'] ?? '#102F35',
                    'accent_colour' => $themeData['accent_colour'] ?? '#C96546',
                    'heading_font' => $themeData['heading_font'] ?? 'Inter',
                    'body_font' => $themeData['body_font'] ?? 'Inter',
                    'hero_title' => $themeData['hero_title'] ?? 'Your restaurant. Your customers. Your ordering channel.',
                    'hero_subtitle' => $themeData['hero_subtitle'] ?? 'Order online for delivery or collection.',
                    'ordering_cta' => $themeData['ordering_cta'] ?? 'Order Now',
                    'reservation_cta' => $themeData['reservation_cta'] ?? 'Book a Table',
                    'restaurant_story' => $themeData['restaurant_story'] ?? '',
                    'social_links' => [
                        'facebook' => $themeData['social_facebook'] ?? '',
                        'instagram' => $themeData['social_instagram'] ?? '',
                        'twitter' => $themeData['social_twitter'] ?? '',
                    ],
                    'footer_attribution' => $themeData['footer_attribution'] ?? 'Powered by MEJDAR',
                    'show_powered_by' => $themeData['show_powered_by'] ?? true,
                    'logo_image' => $themeData['logo_image'] ?? '',
                    'favicon' => $themeData['favicon'] ?? '',
                ],
            ]);
        });
    }

    protected function getThemeData(): array
    {
        try {
            $theme = resolve(\Igniter\Main\Classes\ThemeManager::class)->getActiveTheme();
            return $theme->getCustomData() ?? [];
        } catch (\Exception $e) {
            return [];
        }
    }
}
