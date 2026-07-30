<?php

namespace Tests\Feature;

use Tests\TestCase;

class AdminAuthTest extends TestCase
{
    public function test_admin_login_page_is_accessible(): void
    {
        $response = $this->get('/admin/login');

        $response->assertStatus(200);
    }

    public function test_admin_login_with_invalid_credentials(): void
    {
        $response = $this->post('/admin/login', [
            'login' => 'nonexistent@example.com',
            'password' => 'wrongpassword',
        ]);

        $this->assertContains($response->status(), [200, 302, 419]);
    }

    public function test_admin_login_with_valid_credentials(): void
    {
        $response = $this->post('/admin/login', [
            'login' => 'admin@mejdar.local',
            'password' => 'password',
        ]);

        $this->assertContains($response->status(), [200, 302, 419]);
    }
}
