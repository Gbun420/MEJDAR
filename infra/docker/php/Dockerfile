FROM php:8.3-fpm-bookworm

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpng-dev \
    libjpeg62-turbo-dev \
    libwebp-dev \
    libzip-dev \
    zip \
    unzip \
    curl \
    libicu-dev \
    libonig-dev \
    libxml2-dev \
    libsqlite3-dev \
    && docker-php-ext-configure gd --with-jpeg --with-webp \
    && docker-php-ext-install -j$(nproc) \
    pdo \
    pdo_mysql \
    mbstring \
    zip \
    exif \
    pcntl \
    bcmath \
    gd \
    opcache \
    intl \
    xml \
    soap \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# PHP production configuration
RUN cp "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

# Custom PHP settings
RUN echo "memory_limit = 256M" >> "$PHP_INI_DIR/conf.d/mejdar.ini" \
    && echo "upload_max_filesize = 20M" >> "$PHP_INI_DIR/conf.d/mejdar.ini" \
    && echo "post_max_size = 25M" >> "$PHP_INI_DIR/conf.d/mejdar.ini" \
    && echo "max_execution_time = 120" >> "$PHP_INI_DIR/conf.d/mejdar.ini" \
    && echo "max_input_time = 120" >> "$PHP_INI_DIR/conf.d/mejdar.ini" \
    && echo "realpath_cache_size = 4096K" >> "$PHP_INI_DIR/conf.d/mejdar.ini" \
    && echo "realpath_cache_ttl = 600" >> "$PHP_INI_DIR/conf.d/mejdar.ini"

# OPcache settings for production
RUN echo "opcache.enable=1" >> "$PHP_INI_DIR/conf.d/opcache.ini" \
    && echo "opcache.memory_consumption=128" >> "$PHP_INI_DIR/conf.d/opcache.ini" \
    && echo "opcache.interned_strings_buffer=8" >> "$PHP_INI_DIR/conf.d/opcache.ini" \
    && echo "opcache.max_accelerated_files=10000" >> "$PHP_INI_DIR/conf.d/opcache.ini" \
    && echo "opcache.validate_timestamps=0" >> "$PHP_INI_DIR/conf.d/opcache.ini" \
    && echo "opcache.save_comments=1" >> "$PHP_INI_DIR/conf.d/opcache.ini" \
    && echo "opcache.enable_file_override=1" >> "$PHP_INI_DIR/conf.d/opcache.ini"

WORKDIR /var/www/html

# Create non-root user
RUN groupadd -g 1000 www && useradd -u 1000 -g www -m -s /bin/false www

EXPOSE 9000

CMD ["php-fpm"]
