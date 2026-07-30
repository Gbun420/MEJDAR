<?php

namespace Tests\Unit;

use Mejdar\Core\Http\Controllers\ReportsController;
use Tests\TestCase;

class CsvExportTest extends TestCase
{
    private ReportsController $controller;

    protected function setUp(): void
    {
        parent::setUp();
        $this->controller = new ReportsController();
    }

    public function test_sanitize_csv_cell_prefixes_equals_sign(): void
    {
        $method = new \ReflectionMethod($this->controller, 'sanitizeCsvCell');

        $result = $method->invoke($this->controller, '=SUM(A1:A10)');

        $this->assertEquals("'=SUM(A1:A10)", $result);
    }

    public function test_sanitize_csv_cell_prefixes_plus_sign(): void
    {
        $method = new \ReflectionMethod($this->controller, 'sanitizeCsvCell');

        $result = $method->invoke($this->controller, '+100');

        $this->assertEquals("'+100", $result);
    }

    public function test_sanitize_csv_cell_prefixes_minus_sign(): void
    {
        $method = new \ReflectionMethod($this->controller, 'sanitizeCsvCell');

        $result = $method->invoke($this->controller, '-50.00');

        $this->assertEquals("'-50.00", $result);
    }

    public function test_sanitize_csv_cell_prefixes_at_sign(): void
    {
        $method = new \ReflectionMethod($this->controller, 'sanitizeCsvCell');

        $result = $method->invoke($this->controller, '@SUM');

        $this->assertEquals("'@SUM", $result);
    }

    public function test_sanitize_csv_cell_passes_regular_strings_through(): void
    {
        $method = new \ReflectionMethod($this->controller, 'sanitizeCsvCell');

        $result = $method->invoke($this->controller, 'Bruschetta al Pomodoro');

        $this->assertEquals('Bruschetta al Pomodoro', $result);
    }

    public function test_sanitize_csv_cell_passes_numbers_through(): void
    {
        $method = new \ReflectionMethod($this->controller, 'sanitizeCsvCell');

        $result = $method->invoke($this->controller, '42.50');

        $this->assertEquals('42.50', $result);
    }

    public function test_sanitize_csv_cell_passes_empty_string_through(): void
    {
        $method = new \ReflectionMethod($this->controller, 'sanitizeCsvCell');

        $result = $method->invoke($this->controller, '');

        $this->assertEquals('', $result);
    }

    public function test_sanitize_csv_cell_handles_non_formula_first_char(): void
    {
        $method = new \ReflectionMethod($this->controller, 'sanitizeCsvCell');

        $result = $method->invoke($this->controller, 'abc=def');

        $this->assertEquals('abc=def', $result);
    }
}
