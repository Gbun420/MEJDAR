<div id="mejdar-cookie-consent" class="mejdar-cookie-banner" role="dialog" aria-label="Cookie consent" style="display: none;">
    <div class="container">
        <div class="mejdar-cookie-content">
            <p class="mejdar-cookie-text">
                We use cookies to improve your experience. By continuing to use this site, you agree to our use of cookies.
                <a href="{{ page_url('privacy') }}" class="mejdar-cookie-link">Learn more</a>
            </p>
            <button type="button" class="mejdar-cookie-btn" id="mejdar-cookie-accept">
                Accept
            </button>
        </div>
    </div>
</div>

<style>
    .mejdar-cookie-banner {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 9999;
        background-color: var(--mejdar-secondary);
        color: #fff;
        padding: 1rem 0;
        box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.15);
    }
    .mejdar-cookie-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        flex-wrap: wrap;
    }
    .mejdar-cookie-text {
        margin: 0;
        font-family: var(--font-body);
        font-size: 0.875rem;
        line-height: 1.5;
        color: #fff;
    }
    .mejdar-cookie-link {
        color: var(--mejdar-accent);
        text-decoration: underline;
    }
    .mejdar-cookie-link:hover {
        color: #fff;
    }
    .mejdar-cookie-btn {
        background-color: var(--mejdar-primary);
        color: #fff;
        border: none;
        padding: 0.5rem 1.5rem;
        border-radius: 4px;
        font-family: var(--font-body);
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        white-space: nowrap;
        transition: background-color 0.2s;
    }
    .mejdar-cookie-btn:hover {
        background-color: var(--mejdar-accent);
    }
    @media (max-width: 640px) {
        .mejdar-cookie-content {
            flex-direction: column;
            text-align: center;
        }
        .mejdar-cookie-btn {
            width: 100%;
        }
    }
</style>

<script>
(function () {
    var key = 'mejdar_cookie_consent';
    if (!localStorage.getItem(key)) {
        document.getElementById('mejdar-cookie-consent').style.display = 'block';
        document.getElementById('mejdar-cookie-accept').addEventListener('click', function () {
            localStorage.setItem(key, '1');
            document.getElementById('mejdar-cookie-consent').style.display = 'none';
        });
    }
})();
</script>
