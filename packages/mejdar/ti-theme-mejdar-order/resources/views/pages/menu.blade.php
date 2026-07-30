@extends('mejdar-order::layout.default')

@section('title', 'Menu - ' . setting('site_name', 'Restaurant'))
@section('description', 'Browse our menu and order online for delivery or collection.')

@section('content')
    <section class="mejdar-section">
        <div class="container">
            <h1 class="mejdar-section-title">Our Menu</h1>
            <p class="mejdar-section-subtitle">Browse our dishes and order online</p>

            {{-- Category filter --}}
            @if(isset($categories) && count($categories) > 0)
                <div class="mejdar-categories" role="tablist" aria-label="Menu categories">
                    <button
                        class="mejdar-category-btn mejdar-category-btn--active"
                        role="tab"
                        aria-selected="true"
                        data-category="all"
                    >
                        All
                    </button>
                    @foreach($categories as $category)
                        <button
                            class="mejdar-category-btn"
                            role="tab"
                            aria-selected="false"
                            data-category="{{ $category->slug }}"
                        >
                            {{ $category->name }}
                        </button>
                    @endforeach
                </div>
            @endif

            {{-- Menu items --}}
            @if(isset($menuItems) && count($menuItems) > 0)
                <div class="mejdar-menu-grid">
                    @foreach($menuItems as $item)
                        @include('mejdar-order::partials.menu-card', ['item' => $item])
                    @endforeach
                </div>
            @else
                <div class="mejdar-status mejdar-status--empty">
                    <h2>No items available</h2>
                    <p>Our menu is being prepared. Check back soon!</p>
                </div>
            @endif
        </div>
    </section>
@endsection
