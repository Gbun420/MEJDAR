@extends('mejdar-order::layout.default')

@section('title', 'Order Confirmation - ' . setting('site_name', 'Restaurant'))

@section('content')
    <div class="mejdar-confirmation">
        <div class="mejdar-confirmation-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </div>

        <h1 class="mejdar-confirmation-title">Order Confirmed!</h1>
        <p style="color: var(--mejdar-gray); margin-bottom: 2rem;">
            Thank you for your order. We&apos;re preparing it now.
        </p>

        @if(isset($order))
            <div style="background: var(--mejdar-gray-light); padding: 1.5rem; border-radius: 0.5rem; text-align: left; margin-bottom: 2rem;">
                <p style="font-weight: 600; margin-bottom: 0.5rem;">Order #{{ $order->order_id }}</p>
                <p style="font-size: 0.875rem; color: var(--mejdar-gray);">
                    Status: <strong>{{ $order->status_name }}</strong>
                </p>
                @if($order->order_type === 'delivery')
                    <p style="font-size: 0.875rem; color: var(--mejdar-gray);">
                        Delivery to: {{ $order->address_line_1 ?? 'Your address' }}
                    </p>
                @else
                    <p style="font-size: 0.875rem; color: var(--mejdar-gray);">
                        Collection from: {{ setting('site_name', 'Restaurant') }}
                    </p>
                @endif
            </div>
        @endif

        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <a href="{{ page_url('menu') }}" class="mejdar-btn mejdar-btn--primary">
                Order Again
            </a>
            <a href="{{ page_url('home') }}" class="mejdar-btn mejdar-btn--outline">
                Back to Home
            </a>
        </div>
    </div>
@endsection
