@extends('layouts.master')

@section('title', 'MEJDAR Settings')
@section('description', 'Configure MEJDAR Core settings and view system information.')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title">MEJDAR System Information</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <table class="table">
                                <tr>
                                    <th>MEJDAR Version</th>
                                    <td>{{ $settings['version'] }}</td>
                                </tr>
                                <tr>
                                    <th>Installation ID</th>
                                    <td><code>{{ $settings['installation_id'] }}</code></td>
                                </tr>
                                <tr>
                                    <th>Environment</th>
                                    <td>
                                        <span class="badge badge-{{ $settings['environment'] === 'production' ? 'danger' : 'success' }}">
                                            {{ ucfirst($settings['environment']) }}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>PHP Version</th>
                                    <td>{{ $settings['php_version'] }}</td>
                                </tr>
                                <tr>
                                    <th>Laravel Version</th>
                                    <td>{{ $settings['laravel_version'] }}</td>
                                </tr>
                                <tr>
                                    <th>Database Version</th>
                                    <td>{{ $settings['database_version'] }}</td>
                                </tr>
                                <tr>
                                    <th>Active Theme</th>
                                    <td>{{ $settings['theme']['name'] }} ({{ $settings['theme']['code'] }})</td>
                                </tr>
                            </table>
                        </div>

                        <div class="col-md-6">
                            <h6>Onboarding Checklist</h6>
                            <ul class="list-unstyled">
                                <li>
                                    @if($settings['onboarding']['restaurant_created'])
                                        <span class="text-success">✓</span>
                                    @else
                                        <span class="text-danger">✗</span>
                                    @endif
                                    Restaurant created
                                </li>
                                <li>
                                    @if($settings['onboarding']['menu_created'])
                                        <span class="text-success">✓</span>
                                    @else
                                        <span class="text-danger">✗</span>
                                    @endif
                                    Menu items added
                                </li>
                                <li>
                                    @if($settings['onboarding']['categories_created'])
                                        <span class="text-success">✓</span>
                                    @else
                                        <span class="text-danger">✗</span>
                                    @endif
                                    Categories configured
                                </li>
                                <li>
                                    @if($settings['onboarding']['payments_configured'])
                                        <span class="text-success">✓</span>
                                    @else
                                        <span class="text-danger">✗</span>
                                    @endif
                                    Payments configured
                                </li>
                                <li>
                                    @if($settings['onboarding']['delivery_configured'])
                                        <span class="text-success">✓</span>
                                    @else
                                        <span class="text-danger">✗</span>
                                    @endif
                                    Delivery enabled
                                </li>
                                <li>
                                    @if($settings['onboarding']['reservation_configured'])
                                        <span class="text-success">✓</span>
                                    @else
                                        <span class="text-danger">✗</span>
                                    @endif
                                    Reservations enabled
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card mt-4">
                <div class="card-header">
                    <h5 class="card-title">Support & Contact</h5>
                </div>
                <div class="card-body">
                    <form>
                        <div class="form-group">
                            <label>Support Email</label>
                            <input type="email" name="support_email" class="form-control" value="{{ $settings['support_email'] }}">
                        </div>
                        <div class="form-group">
                            <label>Support Phone</label>
                            <input type="text" name="support_phone" class="form-control" value="{{ $settings['support_phone'] }}">
                        </div>
                        <div class="form-group">
                            <label>Support Website</label>
                            <input type="url" name="support_website" class="form-control" value="{{ $settings['support_website'] }}">
                        </div>
                        <button type="submit" class="btn btn-primary">Save Settings</button>
                    </form>
                </div>
            </div>

            <div class="card mt-4">
                <div class="card-header">
                    <h5 class="card-title">Health Check</h5>
                </div>
                <div class="card-body">
                    <p>
                        <a href="{{ url('api/health') }}" target="_blank" class="btn btn-outline-primary">
                            View Health Endpoint
                        </a>
                    </p>
                    <p class="text-muted">
                        The health endpoint provides real-time system status including database, cache, queue, and theme checks.
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
