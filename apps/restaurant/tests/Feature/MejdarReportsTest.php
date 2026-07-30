<?php

namespace Tests\Feature;

use Tests\TestCase;

class MejdarReportsTest extends TestCase
{
    public function test_reports_route_exists(): void
    {
        $response = $this->get('/admin/mejdar/reports');

        $this->assertContains($response->status(), [200, 302, 403]);
    }

    public function test_reports_export_route_exists(): void
    {
        $response = $this->get('/admin/mejdar/reports/export');

        $this->assertContains($response->status(), [200, 302, 403]);
    }

    public function test_reports_page_renders_when_authenticated(): void
    {
        $user = \Igniter\User\Models\User::where('super_user', 1)->first();

        if (!$user) {
            $this->markTestSkipped('No super admin user found.');
        }

        $response = $this->actingAs($user, 'igniter')
            ->get('/admin/mejdar/reports');

        $response->assertStatus(200);
    }
}
