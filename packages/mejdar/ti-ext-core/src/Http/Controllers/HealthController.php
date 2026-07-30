<?php

declare(strict_types=1);

namespace Mejdar\Core\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;

class HealthController extends Controller
{
    public function index(): JsonResponse
    {
        $checks = [
            'status' => 'healthy',
            'timestamp' => now()->toIso8601String(),
            'version' => config('mejdar-core.version', '1.0.0'),
            'php_version' => PHP_VERSION,
            'laravel_version' => app()->version(),
        ];

        // Database check
        try {
            DB::connection()->getPdo();
            $checks['database'] = 'connected';
        } catch (\Exception $e) {
            $checks['database'] = 'disconnected';
            $checks['status'] = 'unhealthy';
        }

        // Cache check
        try {
            Cache::store('default')->put('health_check', true, 10);
            $checks['cache'] = 'connected';
        } catch (\Exception $e) {
            $checks['cache'] = 'disconnected';
            $checks['status'] = 'degraded';
        }

        // Queue configuration check
        $checks['queue'] = config('queue.default', 'not_configured');

        // Scheduler heartbeat (check if scheduler ran recently)
        $lastRun = Cache::get('scheduler_heartbeat');
        if ($lastRun) {
            $minutesAgo = now()->diffInMinutes(\Carbon\Carbon::parse($lastRun));
            $checks['scheduler'] = [
                'status' => $minutesAgo < 5 ? 'healthy' : 'stale',
                'last_run' => $lastRun,
                'minutes_ago' => $minutesAgo,
            ];
        } else {
            $checks['scheduler'] = ['status' => 'unknown'];
        }

        // Theme check
        try {
            $theme = resolve(\Igniter\Main\Classes\ThemeManager::class)->getActiveTheme();
            $checks['theme'] = [
                'name' => $theme->getName(),
                'path' => $theme->getPath(),
            ];
        } catch (\Exception $e) {
            $checks['theme'] = ['status' => 'error'];
        }

        $statusCode = $checks['status'] === 'healthy' ? 200 : 503;

        return response()->json($checks, $statusCode);
    }
}
