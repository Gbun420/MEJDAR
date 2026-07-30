<?php

namespace Tests\Feature;

use Tests\TestCase;

class ExampleTest extends TestCase
{
    public function test_the_application_boots(): void
    {
        $response = $this->get('/');

        $this->assertContains($response->status(), [200, 301, 302]);
    }
}
