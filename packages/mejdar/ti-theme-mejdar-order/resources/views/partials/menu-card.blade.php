@php
    $image = $item->getImage();
    $isAvailable = $item->isAvailable();
    $isSoldOut = $item->isSoldOut();
@endphp

<div class="mejdar-menu-card" data-menu-item-id="{{ $item->menu_id }}">
    @if($image)
        <img
            src="{{ $image->getPath() }}"
            alt="{{ $item->name }}"
            class="mejdar-menu-card-image"
            loading="lazy"
            width="400"
            height="250"
        >
    @else
        <div class="mejdar-menu-card-image" style="display: flex; align-items: center; justify-content: center; color: var(--mejdar-gray);">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"></path></svg>
        </div>
    @endif

    <div class="mejdar-menu-card-body">
        {{-- Dietary labels --}}
        @if($item->isVegetarian() || $item->isVegan() || $item->isSpicy())
            <div class="mejdar-labels">
                @if($item->isVegetarian())
                    <span class="mejdar-label mejdar-label--vegetarian">Vegetarian</span>
                @endif
                @if($item->isVegan())
                    <span class="mejdar-label mejdar-label--vegan">Vegan</span>
                @endif
                @if($item->isSpicy())
                    <span class="mejdar-label mejdar-label--spicy">Spicy</span>
                @endif
            </div>
        @endif

        <h3 class="mejdar-menu-card-title">{{ $item->name }}</h3>

        @if($item->description)
            <p class="mejdar-menu-card-description">{{ $item->description }}</p>
        @endif

        {{-- Allergens --}}
        @if($item->getAllergens()->count())
            <div class="mejdar-allergens" style="font-size: 0.75rem; color: var(--mejdar-gray); margin-bottom: 0.5rem;">
                <span>Allergens:</span>
                @foreach($item->getAllergens() as $allergen)
                    <span>{{ $allergen->name }}{{ !$loop->last ? ', ' : '' }}</span>
                @endforeach
            </div>
        @endif

        <div class="mejdar-menu-card-footer">
            <span class="mejdar-menu-card-price">
                @if($item->hasOption('price') && $item->getOption('price') > 0)
                    {{ currency_format($item->getOption('price')) }}
                @else
                    {{ currency_format($item->menu_price) }}
                @endif
            </span>

            @if($isAvailable && !$isSoldOut)
                <button
                    type="button"
                    class="mejdar-menu-card-btn"
                    data-control="add-to-cart"
                    data-menu-id="{{ $item->menu_id }}"
                    aria-label="Add {{ $item->name }} to cart"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 01-8 0"></path></svg>
                    Add
                </button>
            @else
                <button type="button" class="mejdar-menu-card-btn" disabled aria-label="{{ $isSoldOut ? 'Sold out' : 'Unavailable' }}">
                    {{ $isSoldOut ? 'Sold Out' : 'Unavailable' }}
                </button>
            @endif
        </div>
    </div>
</div>
