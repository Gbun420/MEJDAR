<?php

declare(strict_types=1);

namespace Mejdar\Core\Http\Controllers;

use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;
use Illuminate\View\View;

class ReportsController extends \Illuminate\Routing\Controller
{
    public function index(): View
    {
        if (!auth()->user()?->hasPermission('igniter.manage_settings')) {
            abort(403);
        }

        $fromDate = Request::input('from_date', now()->subDays(30)->format('Y-m-d'));
        $toDate = Request::input('to_date', now()->format('Y-m-d'));
        $locationId = Request::input('location_id');
        $orderType = Request::input('order_type', 'all');

        $kpi = $this->getKPIs($fromDate, $toDate, $locationId, $orderType);
        $revenueByDay = $this->getRevenueByDay($fromDate, $toDate, $locationId, $orderType);
        $topItems = $this->getTopItems($fromDate, $toDate, $locationId, $orderType);
        $locations = $this->getLocations();

        return view('mejdar-core::reports', compact(
            'kpi', 'revenueByDay', 'topItems', 'locations',
            'fromDate', 'toDate', 'locationId', 'orderType'
        ));
    }

    public function export(): Response
    {
        if (!auth()->user()?->hasPermission('igniter.manage_settings')) {
            abort(403);
        }

        $fromDate = Request::input('from_date', now()->subDays(30)->format('Y-m-d'));
        $toDate = Request::input('to_date', now()->format('Y-m-d'));
        $locationId = Request::input('location_id');
        $orderType = Request::input('order_type', 'all');

        $kpi = $this->getKPIs($fromDate, $toDate, $locationId, $orderType);
        $revenueByDay = $this->getRevenueByDay($fromDate, $toDate, $locationId, $orderType);
        $topItems = $this->getTopItems($fromDate, $toDate, $locationId, $orderType);

        $csvRows = [];
        $csvRows[] = ['MEJDAR Insights Report'];
        $csvRows[] = ['Period', $fromDate . ' to ' . $toDate];
        $csvRows[] = [];
        $csvRows[] = ['Key Performance Indicators'];
        $csvRows[] = ['Total Revenue', $this->sanitizeCsvCell($kpi['gross_sales'])];
        $csvRows[] = ['Order Count', $this->sanitizeCsvCell($kpi['order_count'])];
        $csvRows[] = ['Average Order Value', $this->sanitizeCsvCell($kpi['aov'])];
        $csvRows[] = ['Avg Items Per Order', $this->sanitizeCsvCell($kpi['avg_items_per_order'])];
        $csvRows[] = [];
        $csvRows[] = ['Revenue by Day'];
        $csvRows[] = ['Date', 'Revenue', 'Orders'];
        foreach ($revenueByDay as $row) {
            $csvRows[] = [
                $row->date,
                $this->sanitizeCsvCell($row->revenue),
                $this->sanitizeCsvCell($row->orders),
            ];
        }
        $csvRows[] = [];
        $csvRows[] = ['Top Menu Items by Revenue'];
        $csvRows[] = ['Item', 'Quantity Sold', 'Revenue'];
        foreach ($topItems as $item) {
            $csvRows[] = [
                $this->sanitizeCsvCell($item->name),
                $this->sanitizeCsvCell($item->quantity_sold),
                $this->sanitizeCsvCell($item->revenue),
            ];
        }

        $csvContent = '';
        foreach ($csvRows as $row) {
            $csvContent .= implode(',', array_map(function ($cell) {
                return '"' . str_replace('"', '""', $cell) . '"';
            }, $row)) . "\n";
        }

        $bom = "\xEF\xBB\xBF";
        $filename = 'mejdar-insights-' . $fromDate . '-to-' . $toDate . '.csv';

        return response($bom . $csvContent, 200, [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
            'Cache-Control' => 'no-cache, no-store, must-revalidate',
        ]);
    }

    protected function getKPIs(string $fromDate, string $toDate, ?int $locationId, string $orderType): array
    {
        $query = DB::table('orders')
            ->selectRaw('
                COALESCE(SUM(order_total), 0) as gross_sales,
                COUNT(*) as order_count,
                COALESCE(AVG(order_total), 0) as aov,
                COALESCE(AVG(total_items), 0) as avg_items_per_order
            ')
            ->where('created_at', '>=', $fromDate . ' 00:00:00')
            ->where('created_at', '<=', $toDate . ' 23:59:59');

        if ($locationId) {
            $query->where('location_id', $locationId);
        }

        if ($orderType !== 'all') {
            $query->where('order_type', $orderType);
        }

        $result = $query->first();

        return [
            'gross_sales' => round((float) $result->gross_sales, 2),
            'order_count' => (int) $result->order_count,
            'aov' => round((float) $result->aov, 2),
            'avg_items_per_order' => round((float) $result->avg_items_per_order, 2),
        ];
    }

    protected function getRevenueByDay(string $fromDate, string $toDate, ?int $locationId, string $orderType): array
    {
        $query = DB::table('orders')
            ->selectRaw('DATE(created_at) as date, SUM(order_total) as revenue, COUNT(*) as orders')
            ->where('created_at', '>=', $fromDate . ' 00:00:00')
            ->where('created_at', '<=', $toDate . ' 23:59:59')
            ->groupBy(DB::raw('DATE(created_at)'))
            ->orderBy('date');

        if ($locationId) {
            $query->where('location_id', $locationId);
        }

        if ($orderType !== 'all') {
            $query->where('order_type', $orderType);
        }

        return $query->get()->all();
    }

    protected function getTopItems(string $fromDate, string $toDate, ?int $locationId, string $orderType): array
    {
        $query = DB::table('order_menus')
            ->join('orders', 'orders.order_id', '=', 'order_menus.order_id')
            ->selectRaw('order_menus.name, SUM(order_menus.quantity) as quantity_sold, SUM(order_menus.subtotal) as revenue')
            ->where('orders.created_at', '>=', $fromDate . ' 00:00:00')
            ->where('orders.created_at', '<=', $toDate . ' 23:59:59')
            ->groupBy('order_menus.name')
            ->orderByDesc('revenue')
            ->limit(10);

        if ($locationId) {
            $query->where('orders.location_id', $locationId);
        }

        if ($orderType !== 'all') {
            $query->where('orders.order_type', $orderType);
        }

        return $query->get()->all();
    }

    protected function getLocations(): array
    {
        return DB::table('locations')
            ->select('location_id', 'location_name')
            ->where('location_status', 1)
            ->orderBy('location_name')
            ->get()
            ->pluck('location_name', 'location_id')
            ->all();
    }

    protected function sanitizeCsvCell($value): string
    {
        $string = (string) $value;
        if (preg_match('/^[=+\-@]/', $string)) {
            return "'" . $string;
        }
        return $string;
    }
}
