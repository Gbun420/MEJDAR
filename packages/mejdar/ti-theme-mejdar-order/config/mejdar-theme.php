<?php

declare(strict_types=1);

return [
    /*
    |--------------------------------------------------------------------------
    | MEJDAR Theme Defaults
    |--------------------------------------------------------------------------
    |
    | Default configuration for the MEJDAR Order theme. These values can be
    | overridden through the admin theme customisation panel.
    |
    */

    'brand_name' => env('MEJDAR_BRAND_NAME', 'MEJDAR'),

    // Brand colours (used as CSS custom properties)
    'primary_colour' => '#006D6D',
    'secondary_colour' => '#102F35',
    'accent_colour' => '#C96546',

    // Limestone and Olive for additional accents
    'limestone_colour' => '#F3EFE6',
    'olive_colour' => '#6C7D47',

    // Typography
    'heading_font' => 'Inter',
    'body_font' => 'Inter',

    // Hero content
    'hero_title' => 'Your restaurant. Your customers. Your ordering channel.',
    'hero_subtitle' => 'Order online for delivery or collection.',
    'hero_image' => '',

    // CTAs
    'ordering_cta' => 'Order Now',
    'reservation_cta' => 'Book a Table',

    // Restaurant story
    'restaurant_story' => '',

    // Social links
    'social_facebook' => '',
    'social_instagram' => '',
    'social_twitter' => '',

    // Footer
    'footer_attribution' => 'Powered by MEJDAR',
    'show_powered_by' => true,

    // Media
    'logo_image' => '',
    'favicon' => '',

    // Contact details
    'contact_email' => '',
    'contact_phone' => '',
    'contact_address' => '',
];
