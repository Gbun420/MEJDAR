@extends('mejdar-order::layout.default')

@section('title', 'Reservation - ' . setting('site_name', 'Restaurant'))
@section('description', 'Book a table at our restaurant.')

@section('content')
    <div class="mejdar-reservation">
        <h1 class="mejdar-section-title" style="text-align: center;">Book a Table</h1>
        <p class="mejdar-section-subtitle" style="text-align: center;">Reserve your table online</p>

        <div class="mejdar-reservation-form">
            <form method="POST" action="{{ route('igniter.reservation.store') }}">
                @csrf

                {{-- Date --}}
                <div class="mejdar-form-group">
                    <label for="reservation_date" class="mejdar-form-label">Date</label>
                    <input
                        type="date"
                        id="reservation_date"
                        name="reservation_date"
                        class="mejdar-form-input"
                        value="{{ old('reservation_date') }}"
                        min="{{ date('Y-m-d') }}"
                        required
                    >
                </div>

                {{-- Time --}}
                <div class="mejdar-form-group">
                    <label for="reservation_time" class="mejdar-form-label">Time</label>
                    <select id="reservation_time" name="reservation_time" class="mejdar-form-select" required>
                        <option value="">Select a time</option>
                        @for($hour = 11; $hour <= 22; $hour++)
                            @for($min = 0; $min < 60; $min += 30)
                                <option value="{{ sprintf('%02d:%02d', $hour, $min) }}" {{ old('reservation_time') === sprintf('%02d:%02d', $hour, $min) ? 'selected' : '' }}>
                                    {{ sprintf('%02d:%02d', $hour, $min) }}
                                </option>
                            @endfor
                        @endfor
                    </select>
                </div>

                {{-- Party size --}}
                <div class="mejdar-form-group">
                    <label for="guest_num" class="mejdar-form-label">Number of Guests</label>
                    <select id="guest_num" name="guest_num" class="mejdar-form-select" required>
                        @for($i = 1; $i <= 12; $i++)
                            <option value="{{ $i }}" {{ old('guest_num', 2) == $i ? 'selected' : '' }}>
                                {{ $i }} {{ $i === 1 ? 'Guest' : 'Guests' }}
                            </option>
                        @endfor
                    </select>
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

                {{-- Special requests --}}
                <div class="mejdar-form-group">
                    <label for="comment" class="mejdar-form-label">Special Requests (optional)</label>
                    <textarea
                        id="comment"
                        name="comment"
                        class="mejdar-form-textarea"
                        rows="3"
                        placeholder="Any dietary requirements or special occasions?"
                    >{{ old('comment') }}</textarea>
                </div>

                {{-- Submit --}}
                <button type="submit" class="mejdar-btn mejdar-btn--primary mejdar-btn--block">
                    Reserve Table
                </button>
            </form>
        </div>
    </div>
@endsection
