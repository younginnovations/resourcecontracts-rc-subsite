FROM alpine:latest
RUN apk --update add \
    nginx \
    php5-fpm \
    php5-pdo \
    php5-json \
    php5-openssl \
    php5-mysql \
    php5-pdo_mysql \
    php5-mcrypt \
    php5-sqlite3 \
    php5-pdo_sqlite \
    php5-ctype \
    php5-zlib \
    php5-pdo_pgsql \
    php5-phar \
    php5-dom \
    php5-curl \
    php5-xml \
    supervisor \
    git \
    curl \
 && rm /var/cache/apk/*

RUN mkdir -p /etc/nginx \
 && mkdir -p /run/nginx \
 && mkdir -p /var/run/php-fpm \
 && mkdir -p /var/log/supervisor \
 && rm /etc/nginx/nginx.conf

ADD config/nginx.conf /etc/nginx/nginx.conf
ADD config/nginx-supervisor.ini /etc/supervisor.d/nginx-supervisor.ini

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin --filename=composer

COPY config/default /etc/nginx/sites-enabled/default

COPY . /var/www/rc/
WORKDIR /var/www/rc/

RUN chmod -R 777 /var/www/rc/storage

RUN composer install --no-interaction --prefer-dist

EXPOSE 80
CMD ["/usr/bin/supervisord"]
