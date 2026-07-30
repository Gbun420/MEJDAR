<?php

namespace Tests\Feature;

use Tests\TestCase;

class HealthEndpointTest extends TestCase
{
    public function test_health_endpoint_returns_valid_response(): void
    {
        $response = $this->get('/api/health');

        $this->assertContains($response->status(), [200, 503]);
        $response->assertJsonStructure();
    }

    public function test_health_response_contains_required_fields(): void
    {
        $response = $this->get('/api/health');

        $response->assertJsonStructure([
            'status',
            'timestamp',
            'database',
        ]);
    }

    public function test_health_response_has_valid_status(): void
    {
        $response = $this->get('/api/health');

        $data = $response->json();
        $this->assertContains($data['status'], ['healthy', 'degraded', 'unhealthy']);
    }

    public function test_health_response_timestamp_is_iso8601(): void
    {
        $response = $this->get('/api/health');

        $data = $response->json();
        $this->assertMatchesRegularExpression(
            '/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/',
            $data['timestamp']
        );
    }

    public function test_health_response_database_field_exists(): void
    {
        $response = $this->get('/api/health');

        $data = $response->json();
        $this->assertArrayHasKey('database', $data);
    }
}
