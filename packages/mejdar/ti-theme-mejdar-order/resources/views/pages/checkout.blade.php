@extends('mejdar-order::layout.default')

@section('title', 'Checkout - ' . setting('site_name', 'Restaurant'))
@section('description', 'Complete your order.')

@section('content')
    <div class="mejdar-checkout">
        <h1 class="mejdar-checkout-title">Checkout</h1>

        {{-- Order type selector --}}
        <div class="mejdar-form-group">
            <label class="mejdar-form-label">Order Type</label>
            <div style="display: flex; gap: 1rem;">
                @if(setting('enable_delivery'))
                    <label class="mejdar-checkout-option" style="flex: 1; padding: 1rem; border: 2px solid var(--mejdar-gray-light); border-radius: 0.5rem; cursor: pointer; text-align: center;">
                        <input type="radio" name="order_type" value="delivery" {{ old('order_type', 'delivery') === 'delivery' ? 'checked' : '' }} style="margin-bottom: 0.5rem;">
                        <span style="display: block; font-weight: 500;">Delivery</span>
                    </label>
                @endif
                @if(setting('enable_collection'))
                    <label class="mejdar-checkout-option" style="flex: 1; padding: 1rem; border: 2px solid var(--mejdar-gray-light); border-radius: 0.5rem; cursor: pointer; text-align: center;">
                        <input type="radio" name="order_type" value="collection" {{ old('order_type', 'collection') === 'collection' ? 'checked' : '' }} style="margin-bottom: 0.5rem;">
                        <span style="display: block; font-weight: 500;">Collection</span>
                    </label>
                @endif
            </div>
        </div>

        {{-- Delivery address (shown when delivery is selected) --}}
        <div class="mejdar-form-group mejdar-delivery-fields" style="{{ old('order_type', 'delivery') !== 'delivery' ? 'display: none;' : '' }}">
            <label for="delivery_address" class="mejdar-form-label">Delivery Address</label>
            <input
                type="text"
                id="delivery_address"
                name="delivery_address"
                class="mejdar-form-input"
                value="{{ old('delivery_address') }}"
                placeholder="Enter your delivery address"
                required
            >
        </div>

        {{-- Customer details --}}
        <div class="mejdar-form-group">
            <label for="first_name" class="mejdar-form-label">First Name</label>
            <input
                type="text"
                id="first_name"
                name="first_name"
                class="mejdar-form-input"
                value="{{ old('first_name', auth()->user()->first_name ?? '') }}"
                required
            >
        </div>

        <div class="mejdar-form-group">
            <label for="last_name" class="mejdar-form-label">Last Name</label>
            <input
                type="text"
                id="last_name"
                name="last_name"
                class="mejdar-form-input"
                value="{{ old('last_name', auth()->user()->last_name ?? '') }}"
                required
            >
        </div>

        <div class="mejdar-form-group">
            <label for="email" class="mejdar-form-label">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                class="mejdar-form-input"
                value="{{ old('email', auth()->user()->email ?? '') }}"
                required
            >
        </div>

        <div class="mejdar-form-group">
            <label for="phone" class="mejdar-form-label">Phone</label>
            <input
                type="tel"
                id="phone"
                name="phone"
                class="mejdar-form-input"
                value="{{ old('phone', auth()->user()->phone ?? '') }}"
                required
            >
        </div>

        {{-- Order notes --}}
        <div class="mejdar-form-group">
            <label for="order_comment" class="mejdar-form-label">Order Notes (optional)</label>
            <textarea
                id="order_comment"
                name="order_comment"
                class="mejdar-form-textarea"
                rows="3"
                placeholder="Any special instructions?"
            >{{ old('order_comment') }}</textarea>
        </div>

        {{-- Payment methods --}}
        <div class="mejdar-form-group">
            <label class="mejdar-form-label">Payment Method</label>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                @if(setting('enable_cash_payment'))
                    <label style="display: flex; align-items: center; gap: 0.5rem; padding: 1rem; border: 2px solid var(--mejdar-gray-light); border-radius: 0.5rem; cursor: pointer;">
                        <input type="radio" name="payment" value="cash" {{ old('payment', 'cash') === 'cash' ? 'checked' : '' }}>
                        <span>Cash</span>
                    </label>
                @endif
                @if(setting('enable_stripe'))
                    <label style="display: flex; align-items: center; gap: 0.5rem; padding: 1rem; border: 2px solid var(--mejdar-gray-light); border-radius: 0.5rem; cursor: pointer;">
                        <input type="radio" name="payment" value="stripe" {{ old('payment') === 'stripe' ? 'checked' : '' }}>
                        <span>Card (Stripe)</span>
                    </label>
                @endif
            </div>
        </div>

        {{-- Submit --}}
        <button type="submit" class="mejdar-btn mejdar-btn--primary mejdar-btn--block" data-control="checkout">
            Place Order
        </button>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const orderTypeInputs = document.querySelectorAll('input[name="order_type"]');
            const deliveryFields = document.querySelector('.mejdar-delivery-fields');

            orderTypeInputs.forEach(function(input) {
                input.addEventListener('change', function() {
                    if (this.value === 'delivery') {
                        deliveryFields.style.display = 'block';
                    } else {
                        deliveryFields.style.display = 'none';
                    }
                });
            });
        });
    </script>
@endsection
