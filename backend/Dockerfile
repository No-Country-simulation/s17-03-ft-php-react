FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    nginx \
    supervisor

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd sockets

# Get latest Composer
ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

RUN chmod +x /usr/local/bin/install-php-extensions && \
    install-php-extensions @composer-2.6.5

# Set working directory
WORKDIR /var/www

# Copy all files to the working directory
COPY . /var/www

# Copy nginx and supervisor configs
COPY ./docker-compose/nginx/sites-available /etc/nginx/sites-available
COPY ./docker-compose/nginx/conf.d /etc/nginx/conf.d
COPY ./docker-compose/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Set correct permissions and add required folders to app folder
RUN mkdir mkdir -p var/www/var
RUN chown -R www-data:www-data /var/www/var

# Set up php-fpm unix socket
COPY ./docker-compose/php-fpm/www.conf /usr/local/etc/php-fpm.d/www.conf

RUN mkdir /var/run/php/ && \ 
    touch /var/run/php/php-fpm.sock && \
    chown -R www-data:www-data /var/run/php

# Install all dependencies 
ENV COMPOSER_ALLOW_SUPERUSER=1
RUN composer install --optimize-autoloader --no-interaction

EXPOSE 80

# Use supervisord to run php-fpm and nginx
CMD ["/usr/bin/supervisord"]
