<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;

class MejdarSeederTest extends TestCase
{
    public function test_seed_demo_command_succeeds(): void
    {
        $exitCode = Artisan::call('mejdar:seed-demo');

        $this->assertEquals(0, $exitCode);
    }

    public function test_seed_demo_creates_expected_data(): void
    {
        Artisan::call('mejdar:seed-demo');

        $this->assertDatabaseHas('locations', [
            'location_name' => 'Harbour Table',
        ]);

        $this->assertDatabaseHas('menus', [
            'menu_name' => 'Bruschetta al Pomodoro',
        ]);
    }

    public function test_seed_demo_creates_menu_options(): void
    {
        Artisan::call('mejdar:seed-demo');

        $this->assertDatabaseHas('menu_options', [
            'option_name' => 'Size',
        ]);
    }

    public function test_seed_demo_creates_customers(): void
    {
        Artisan::call('mejdar:seed-demo');

        $this->assertDatabaseHas('customers', [
            'first_name' => 'Sarah',
        ]);
    }
}
