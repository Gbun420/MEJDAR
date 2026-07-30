<?php

declare(strict_types=1);

return [
    'form' => [
        'general' => [
            'title' => 'MEJDAR Brand',
            'fields' => [
                'logo_image' => [
                    'label' => 'Logo Image',
                    'span' => 'left',
                    'comment' => 'Upload your restaurant logo.',
                    'type' => 'mediafinder',
                    'rules' => 'nullable|string',
                ],
                'favicon' => [
                    'label' => 'Favicon',
                    'type' => 'mediafinder',
                    'span' => 'right',
                    'comment' => 'Upload your favicon (png, ico, jpg).',
                    'rules' => 'nullable|string',
                ],
            ],
        ],
        'colours' => [
            'title' => 'Colours',
            'fields' => [
                'primary_colour' => [
                    'label' => 'Primary Colour',
                    'type' => 'colorpicker',
                    'span' => 'left',
                    'default' => '#006D6D',
                    'comment' => 'Main brand colour (buttons, links).',
                    'rules' => 'required|string',
                    'assetVar' => 'mejdar-primary',
                ],
                'secondary_colour' => [
                    'label' => 'Secondary Colour',
                    'type' => 'colorpicker',
                    'span' => 'right',
                    'default' => '#102F35',
                    'comment' => 'Header and footer background.',
                    'rules' => 'required|string',
                    'assetVar' => 'mejdar-secondary',
                ],
                'accent_colour' => [
                    'label' => 'Accent Colour',
                    'type' => 'colorpicker',
                    'span' => 'left',
                    'default' => '#C96546',
                    'comment' => 'Call-to-action highlights.',
                    'rules' => 'required|string',
                    'assetVar' => 'mejdar-accent',
                ],
                'limestone_colour' => [
                    'label' => 'Background Colour',
                    'type' => 'colorpicker',
                    'span' => 'right',
                    'default' => '#F3EFE6',
                    'comment' => 'Page background colour.',
                    'rules' => 'nullable|string',
                    'assetVar' => 'mejdar-limestone',
                ],
                'olive_colour' => [
                    'label' => 'Success Colour',
                    'type' => 'colorpicker',
                    'span' => 'left',
                    'default' => '#6C7D47',
                    'comment' => 'Success and availability indicators.',
                    'rules' => 'nullable|string',
                    'assetVar' => 'mejdar-olive',
                ],
            ],
        ],
        'typography' => [
            'title' => 'Typography',
            'fields' => [
                'heading_font' => [
                    'label' => 'Heading Font',
                    'type' => 'text',
                    'span' => 'left',
                    'default' => 'Inter',
                    'comment' => 'Google Fonts family name for headings.',
                    'rules' => 'nullable|string',
                    'assetVar' => 'font-family-heading',
                ],
                'body_font' => [
                    'label' => 'Body Font',
                    'type' => 'text',
                    'span' => 'right',
                    'default' => 'Inter',
                    'comment' => 'Google Fonts family name for body text.',
                    'rules' => 'nullable|string',
                    'assetVar' => 'font-family-body',
                ],
            ],
        ],
        'hero' => [
            'title' => 'Hero Section',
            'fields' => [
                'hero_title' => [
                    'label' => 'Hero Title',
                    'type' => 'text',
                    'span' => 'left',
                    'default' => 'Your restaurant. Your customers. Your ordering channel.',
                    'comment' => 'Main headline on the homepage.',
                    'rules' => 'nullable|string',
                ],
                'hero_subtitle' => [
                    'label' => 'Hero Subtitle',
                    'type' => 'text',
                    'span' => 'right',
                    'default' => 'Order online for delivery or collection.',
                    'comment' => 'Supporting text below the headline.',
                    'rules' => 'nullable|string',
                ],
                'hero_image' => [
                    'label' => 'Hero Image',
                    'type' => 'mediafinder',
                    'span' => 'left',
                    'comment' => 'Background image for the hero section.',
                    'rules' => 'nullable|string',
                ],
                'ordering_cta' => [
                    'label' => 'Ordering CTA Text',
                    'type' => 'text',
                    'span' => 'left',
                    'default' => 'Order Now',
                    'comment' => 'Text for the ordering call-to-action button.',
                    'rules' => 'nullable|string',
                ],
                'reservation_cta' => [
                    'label' => 'Reservation CTA Text',
                    'type' => 'text',
                    'span' => 'right',
                    'default' => 'Book a Table',
                    'comment' => 'Text for the reservation call-to-action button.',
                    'rules' => 'nullable|string',
                ],
            ],
        ],
        'content' => [
            'title' => 'Content',
            'fields' => [
                'restaurant_story' => [
                    'label' => 'Restaurant Story',
                    'type' => 'richeditor',
                    'span' => 'full',
                    'comment' => 'About section content displayed on the homepage.',
                    'rules' => 'nullable|string',
                ],
            ],
        ],
        'social' => [
            'title' => 'Social Links',
            'fields' => [
                'social_facebook' => [
                    'label' => 'Facebook URL',
                    'type' => 'text',
                    'span' => 'left',
                    'comment' => 'Full URL to your Facebook page.',
                    'rules' => 'nullable|url',
                ],
                'social_instagram' => [
                    'label' => 'Instagram URL',
                    'type' => 'text',
                    'span' => 'right',
                    'comment' => 'Full URL to your Instagram profile.',
                    'rules' => 'nullable|url',
                ],
                'social_twitter' => [
                    'label' => 'Twitter/X URL',
                    'type' => 'text',
                    'span' => 'left',
                    'comment' => 'Full URL to your Twitter/X profile.',
                    'rules' => 'nullable|url',
                ],
            ],
        ],
        'footer' => [
            'title' => 'Footer',
            'fields' => [
                'show_powered_by' => [
                    'label' => 'Show "Powered by MEJDAR"',
                    'type' => 'switch',
                    'span' => 'left',
                    'default' => true,
                    'comment' => 'Display attribution in the footer.',
                    'rules' => 'boolean',
                ],
                'footer_attribution' => [
                    'label' => 'Footer Attribution Text',
                    'type' => 'text',
                    'span' => 'right',
                    'default' => 'Powered by MEJDAR',
                    'comment' => 'Custom attribution text.',
                    'rules' => 'nullable|string',
                ],
            ],
        ],
        'contact' => [
            'title' => 'Contact Details',
            'fields' => [
                'contact_email' => [
                    'label' => 'Contact Email',
                    'type' => 'text',
                    'span' => 'left',
                    'comment' => 'Email displayed in footer and contact page.',
                    'rules' => 'nullable|email',
                ],
                'contact_phone' => [
                    'label' => 'Contact Phone',
                    'type' => 'text',
                    'span' => 'right',
                    'comment' => 'Phone number displayed in header and footer.',
                    'rules' => 'nullable|string',
                ],
                'contact_address' => [
                    'label' => 'Address',
                    'type' => 'textarea',
                    'span' => 'full',
                    'comment' => 'Restaurant address.',
                    'rules' => 'nullable|string',
                ],
            ],
        ],
    ],
];
