<?php

declare(strict_types=1);

namespace Mejdar\Core;

use Igniter\System\Classes\BaseExtension;

class Extension extends BaseExtension
{
    /**
     * Extension metadata.
     */
    public function extensionMeta(): array
    {
        return [
            'code' => 'igniter.mejdarcore',
            'name' => 'MEJDAR Core',
            'description' => 'MEJDAR Core extension - settings, health checks, provisioning, and management commands.',
            'author' => 'MEJDAR',
            'icon' => 'icon-settings',
            'homepage' => 'https://mejdar.com',
            'require' => [
                'igniter.user' => '*',
            ],
        ];
    }
}
