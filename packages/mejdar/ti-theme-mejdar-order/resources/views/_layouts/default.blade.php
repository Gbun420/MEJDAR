@php
    $themeData = $this->theme->getCustomData() ?? [];
    $primaryColour = $themeData['primary_colour'] ?? '#006D6D';
    $secondaryColour = $themeData['secondary_colour'] ?? '#102F35';
    $accentColour = $themeData['accent_colour'] ?? '#C96546';
    $limestoneColour = $themeData['limestone_colour'] ?? '#F3EFE6';
    $oliveColour = $themeData['olive_colour'] ?? '#6C7D47';
    $headingFont = $themeData['heading_font'] ?? 'Inter';
    $bodyFont = $themeData['body_font'] ?? 'Inter';
    $logoImage = $themeData['logo_image'] ?? '';
    $favicon = $themeData['favicon'] ?? '';
    $showPoweredBy = $themeData['show_powered_by'] ?? true;
    $footerAttribution = $themeData['footer_attribution'] ?? 'Powered by MEJDAR';
@endphp
<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    @if($favicon)
        <link rel="icon" type="image/x-icon" href="{{ $favicon }}">
    @endif

    <title>@yield('title', setting('site_name', 'Restaurant'))</title>
    <meta name="description" content="@yield('description', setting('site_description', ''))">

    {{-- Google Fonts --}}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family={{ str_replace(' ', '+', $headingFont) }}:wght@400;500;600;700&family={{ str_replace(' ', '+', $bodyFont) }}:wght@400;500;600&display=swap" rel="stylesheet">

    {{-- Theme CSS --}}
    @yield('styles')
    <style>
        :root {
            --mejdar-primary: {{ $primaryColour }};
            --mejdar-secondary: {{ $secondaryColour }};
            --mejdar-accent: {{ $accentColour }};
            --mejdar-limestone: {{ $limestoneColour }};
            --mejdar-olive: {{ $oliveColour }};
            --font-heading: '{{ $headingFont }}', sans-serif;
            --font-body: '{{ $bodyFont }}', sans-serif;
        }
    </style>
</head>
<body class="@yield('body-class', $this->page->bodyClass ?? '')">

    {{-- Header --}}
    @section('header')
    <header class="mejdar-header" style="background-color: {{ $secondaryColour }}">
        <div class="container">
            <nav class="mejdar-nav" aria-label="Main navigation">
                <a href="{{ page_url('home') }}" class="mejdar-logo">
                    @if($logoImage)
                        <img src="{{ $logoImage }}" alt="{{ setting('site_name', 'Restaurant') }}" height="40">
                    @else
                        <span class="mejdar-logo-text">{{ setting('site_name', 'Restaurant') }}</span>
                    @endif
                </a>

                @if($contactPhone = $themeData['contact_phone'] ?? '')
                    <a href="tel:{{ $contactPhone }}" class="mejdar-phone-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        {{ $contactPhone }}
                    </a>
                @endif

                <button class="mejdar-menu-toggle" aria-label="Toggle menu" aria-expanded="false">
                    <span class="mejdar-hamburger"></span>
                </button>

                <div class="mejdar-nav-links">
                    <a href="{{ page_url('home') }}" class="mejdar-nav-link">{{ trans('igniter.orange::default.text_home') }}</a>
                    <a href="{{ page_url('menu') }}" class="mejdar-nav-link">{{ trans('igniter.cart::default.text_menu') }}</a>
                    @if(setting('enable_reservations'))
                        <a href="{{ page_url('reservation') }}" class="mejdar-nav-link">{{ trans('igniter.reservation::default.text_reservation') }}</a>
                    @endif
                    <a href="{{ page_url('contact') }}" class="mejdar-nav-link">{{ trans('igniter.orange::default.text_contact') }}</a>
                </div>
            </nav>
        </div>
    </header>
    @show

    {{-- Flash messages --}}
    @if(session()->has('message'))
        <div class="mejdar-flash" role="alert">
            <div class="container">
                {{ session('message') }}
            </div>
        </div>
    @endif

    {{-- Main content --}}
    <main class="mejdar-main">
        @yield('content')
    </main>

    {{-- Footer --}}
    @section('footer')
    <footer class="mejdar-footer" style="background-color: {{ $secondaryColour }}">
        <div class="container">
            <div class="mejdar-footer-grid">
                <div class="mejdar-footer-brand">
                    <h3 class="mejdar-footer-title">{{ setting('site_name', 'Restaurant') }}</h3>
                    @if($restaurantStory = $themeData['restaurant_story'] ?? '')
                        <p class="mejdar-footer-story">{!! $restaurantStory !!}</p>
                    @endif
                </div>

                <div class="mejdar-footer-links">
                    <h4 class="mejdar-footer-heading">{{ trans('igniter.orange::default.text_menu') }}</h4>
                    <ul>
                        <li><a href="{{ page_url('menu') }}">{{ trans('igniter.cart::default.text_menu') }}</a></li>
                        @if(setting('enable_reservations'))
                            <li><a href="{{ page_url('reservation') }}">{{ trans('igniter.reservation::default.text_reservation') }}</a></li>
                        @endif
                        <li><a href="{{ page_url('contact') }}">{{ trans('igniter.orange::default.text_contact') }}</a></li>
                    </ul>
                </div>

                <div class="mejdar-footer-links">
                    <h4 class="mejdar-footer-heading">Legal</h4>
                    <ul>
                        <li><a href="{{ page_url('privacy') }}">Privacy Policy</a></li>
                        <li><a href="{{ page_url('terms') }}">Terms of Service</a></li>
                    </ul>
                </div>

                <div class="mejdar-footer-contact">
                    <h4 class="mejdar-footer-heading">Contact</h4>
                    @if($contactEmail = $themeData['contact_email'] ?? '')
                        <p><a href="mailto:{{ $contactEmail }}">{{ $contactEmail }}</a></p>
                    @endif
                    @if($contactPhone = $themeData['contact_phone'] ?? '')
                        <p><a href="tel:{{ $contactPhone }}">{{ $contactPhone }}</a></p>
                    @endif
                    @if($contactAddress = $themeData['contact_address'] ?? '')
                        <p>{{ $contactAddress }}</p>
                    @endif

                    {{-- Social links --}}
                    <div class="mejdar-social">
                        @if($socialFacebook = $themeData['social_facebook'] ?? '')
                            <a href="{{ $socialFacebook }}" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                            </a>
                        @endif
                        @if($socialInstagram = $themeData['social_instagram'] ?? '')
                            <a href="{{ $socialInstagram }}" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            </a>
                        @endif
                        @if($socialTwitter = $themeData['social_twitter'] ?? '')
                            <a href="{{ $socialTwitter }}" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                            </a>
                        @endif
                    </div>
                </div>
            </div>

            @if($showPoweredBy)
                <div class="mejdar-footer-attribution">
                    <p>{{ $footerAttribution }}</p>
                </div>
            @endif
        </div>
    </footer>
    @show

    {{-- Scripts --}}
    @yield('scripts')

</body>
</html>
