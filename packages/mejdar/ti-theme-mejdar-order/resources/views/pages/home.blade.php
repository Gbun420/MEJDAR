@extends('mejdar-order::layout.default')

@section('body-class', 'mejdar-home')

@section('content')
    {{-- Hero Section --}}
    <section class="mejdar-hero">
        <div class="container">
            <h1 class="mejdar-hero-title">{{ $page->vars['hero_title'] ?? 'Your restaurant. Your customers. Your ordering channel.' }}</h1>
            <p class="mejdar-hero-subtitle">{{ $page->vars['hero_subtitle'] ?? 'Order online for delivery or collection.' }}</p>

            <div class="mejdar-hero-actions">
                <a href="{{ page_url('menu') }}" class="mejdar-hero-cta mejdar-hero-cta--primary">
                    {{ $page->vars['ordering_cta'] ?? 'Order Now' }}
                </a>
                @if(setting('enable_reservations'))
                    <a href="{{ page_url('reservation') }}" class="mejdar-hero-cta mejdar-hero-cta--secondary">
                        {{ $page->vars['reservation_cta'] ?? 'Book a Table' }}
                    </a>
                @endif
            </div>
        </div>
    </section>

    {{-- Restaurant Story --}}
    @if(!empty($page->vars['restaurant_story']))
        <section class="mejdar-section mejdar-section--alt">
            <div class="container">
                <div class="mejdar-story">
                    {!! $page->vars['restaurant_story'] !!}
                </div>
            </div>
        </section>
    @endif

    {{-- Featured Menu --}}
    <section class="mejdar-section">
        <div class="container">
            <h2 class="mejdar-section-title">Our Menu</h2>
            <p class="mejdar-section-subtitle">Explore our delicious dishes</p>

            @if(isset($menuItems) && count($menuItems) > 0)
                <div class="mejdar-menu-grid">
                    @foreach($menuItems->take(6) as $item)
                        @include('mejdar-order::partials.menu-card', ['item' => $item])
                    @endforeach
                </div>

                <div style="text-align: center; margin-top: 2rem;">
                    <a href="{{ page_url('menu') }}" class="mejdar-btn mejdar-btn--outline">
                        View Full Menu
                    </a>
                </div>
            @else
                <div class="mejdar-status mejdar-status--empty">
                    <p>Menu coming soon. Check back later!</p>
                </div>
            @endif
        </div>
    </section>

    {{-- CTA Section --}}
    <section class="mejdar-hero" style="background-color: var(--mejdar-primary)">
        <div class="container">
            <h2 class="mejdar-hero-title" style="font-size: 1.75rem;">Ready to order?</h2>
            <p class="mejdar-hero-subtitle">Browse our full menu and place your order for delivery or collection.</p>
            <a href="{{ page_url('menu') }}" class="mejdar-hero-cta mejdar-hero-cta--secondary">
                {{ $page->vars['ordering_cta'] ?? 'Order Now' }}
            </a>
        </div>
    </section>
@endsection
