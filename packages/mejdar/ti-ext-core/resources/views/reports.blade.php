@extends('layouts.master')

@section('title', 'MEJDAR Insights')
@section('description', 'Business performance dashboard and reporting.')

@section('content')
<div class="container">
    <div class="row mb-4">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="card-title mb-0">Filters</h5>
                    <a href="{{ route('igniter.mejdar-core.reports.export', request()->query()) }}"
                       class="btn btn-outline-primary btn-sm">
                        Export CSV
                    </a>
                </div>
                <div class="card-body">
                    <form method="GET" action="{{ route('igniter.mejdar-core.reports') }}">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>From Date</label>
                                    <input type="date" name="from_date" class="form-control"
                                           value="{{ $fromDate }}">
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>To Date</label>
                                    <input type="date" name="to_date" class="form-control"
                                           value="{{ $toDate }}">
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>Location</label>
                                    <select name="location_id" class="form-control">
                                        <option value="">All Locations</option>
                                        @foreach($locations as $id => $name)
                                            <option value="{{ $id }}" {{ $locationId == $id ? 'selected' : '' }}>
                                                {{ $name }}
                                            </option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>Order Type</label>
                                    <select name="order_type" class="form-control">
                                        <option value="all" {{ $orderType === 'all' ? 'selected' : '' }}>All</option>
                                        <option value="delivery" {{ $orderType === 'delivery' ? 'selected' : '' }}>Delivery</option>
                                        <option value="collection" {{ $orderType === 'collection' ? 'selected' : '' }}>Collection</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">Apply Filters</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <div class="row mb-4">
        <div class="col-md-3">
            <div class="card text-center">
                <div class="card-body">
                    <h6 class="card-subtitle mb-2 text-muted">Total Revenue</h6>
                    <h3 class="card-title mb-0">£{{ number_format($kpi['gross_sales'], 2) }}</h3>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card text-center">
                <div class="card-body">
                    <h6 class="card-subtitle mb-2 text-muted">Order Count</h6>
                    <h3 class="card-title mb-0">{{ number_format($kpi['order_count']) }}</h3>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card text-center">
                <div class="card-body">
                    <h6 class="card-subtitle mb-2 text-muted">Avg Order Value</h6>
                    <h3 class="card-title mb-0">£{{ number_format($kpi['aov'], 2) }}</h3>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card text-center">
                <div class="card-body">
                    <h6 class="card-subtitle mb-2 text-muted">Avg Items / Order</h6>
                    <h3 class="card-title mb-0">{{ number_format($kpi['avg_items_per_order'], 1) }}</h3>
                </div>
            </div>
        </div>
    </div>

    <div class="row mb-4">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title">Revenue by Day</h5>
                </div>
                <div class="card-body">
                    @if(count($revenueByDay) > 0)
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th class="text-right">Revenue</th>
                                        <th class="text-right">Orders</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach($revenueByDay as $day)
                                        <tr>
                                            <td>{{ $day->date }}</td>
                                            <td class="text-right">£{{ number_format($day->revenue, 2) }}</td>
                                            <td class="text-right">{{ number_format($day->orders) }}</td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    @else
                        <p class="text-muted mb-0">No data available for the selected period.</p>
                    @endif
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title">Top 10 Menu Items by Revenue</h5>
                </div>
                <div class="card-body">
                    @if(count($topItems) > 0)
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Item</th>
                                        <th class="text-right">Qty Sold</th>
                                        <th class="text-right">Revenue</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach($topItems as $index => $item)
                                        <tr>
                                            <td>{{ $index + 1 }}</td>
                                            <td>{{ $item->name }}</td>
                                            <td class="text-right">{{ number_format($item->quantity_sold) }}</td>
                                            <td class="text-right">£{{ number_format($item->revenue, 2) }}</td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    @else
                        <p class="text-muted mb-0">No menu item data available for the selected period.</p>
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
