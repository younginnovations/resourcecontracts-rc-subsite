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
    nodejs \
    ruby \
    ruby-dev \
    make \
    g++ \
    gettext \
 && rm /var/cache/apk/* \
 && npm install --global gulp-cli \
 && gem install --no-rdoc --no-ri sass \
 && gem install --no-rdoc --no-ri bourbon \
 && gem install --no-rdoc --no-ri io-console \
 && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin --filename=composer

RUN mkdir -p /etc/nginx \
 && mkdir -p /run/nginx \
 && mkdir -p /etc/nginx/sites-enabled \
 && mkdir -p /var/run/php-fpm \
 && mkdir -p /var/log/supervisor \
 && rm /etc/nginx/nginx.conf \
 && mkdir -p /var/container_init \
 && mkdir -p /var/container_init/site_content 

COPY config/init.sh /var/container_init/init.sh
COPY config/nginx_subsite.template /var/container_init/nginx_subsite.template
COPY config/env.template /var/container_init/env.template
COPY config/nginx.conf /etc/nginx/nginx.conf
COPY config/nginx-supervisor.ini /etc/supervisor.d/nginx-supervisor.ini
COPY . /var/container_init/site_content

#copy the site contents and install npm prerequsites and run composer
WORKDIR /var/container_init/site_content
RUN npm install --save-dev gulp-rename \
 && npm install --save-dev gulp-react \
 && npm install --dev \
 && bourbon install \
 && composer install --no-interaction --prefer-dist \
 && chmod +x /var/container_init/init.sh \
#RC
 && mkdir -p /var/www/rc \
 && cp -R /var/container_init/site_content/. /var/www/rc \
 && gulp --cwd /var/www/rc rc \
 && chmod -R 777 /var/www/rc/storage \
 && touch /var/www/rc/.env \
#OLC
 && mkdir -p /var/www/olc \
 && cp -R /var/container_init/site_content/. /var/www/olc \
 && gulp -cwd /var/www/olc olc \
 && chmod -R 777 /var/www/olc/storage \
 && touch /var/www/olc/.env \
#country site -- Tunisia / tn
 && mkdir -p /var/www/country-tn \
 && cp -R /var/container_init/site_content/. /var/www/country-tn \
 && gulp --cwd /var/www/country-tn tn \
 && chmod -R 777 /var/www/country-tn/storage \
 && touch /var/www/country-tn/.env \
#cleanup
 && rm -r /var/container_init/site_content

EXPOSE 80
CMD cd /var/container_init && ./init.sh && /usr/bin/supervisord
