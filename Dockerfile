FROM alpine:3.5
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
    php5-zip \
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
    libffi-dev \
 && rm /var/cache/apk/* \
 && npm install --global gulp-cli \
 && gem install --no-rdoc --no-ri sass \
 && gem install --no-rdoc --no-ri bourbon \
 && gem install --no-rdoc --no-ri io-console \
 && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin --filename=composer \
 && curl -O -L https://github.com/papertrail/remote_syslog2/releases/download/v0.20/remote_syslog_linux_amd64.tar.gz \
 && tar -zxf remote_syslog_linux_amd64.tar.gz \
 && cp remote_syslog/remote_syslog /usr/local/bin \
 && rm -r remote_syslog_linux_amd64.tar.gz \
 && rm -r remote_syslog

RUN mkdir -p /etc/nginx \
 && mkdir -p /run/nginx \
 && mkdir -p /etc/nginx/sites-enabled \
 && mkdir -p /var/run/php-fpm \
 && mkdir -p /var/log/supervisor \
 && rm /etc/nginx/nginx.conf \
 && mkdir -p /var/container_init \
 && mkdir -p /var/container_init/site_content

WORKDIR /var/container_init/site_content

COPY composer.json /var/container_init/site_content
COPY composer.lock /var/container_init/site_content
COPY package.json /var/container_init/site_content
RUN composer install --no-interaction --prefer-dist --no-scripts --no-autoloader \
 && npm install --save-dev gulp-rename \
 && npm install --save-dev gulp-react \
 && npm install --dev \
 && bourbon install

COPY config/init.sh /var/container_init/init.sh
COPY config/nginx_subsite.template /var/container_init/nginx_subsite.template
COPY config/nginx_subsite_protected.template /var/container_init/nginx_subsite_protected.template
COPY config/nginx_olc_com /var/container_init/nginx_olc_com
COPY config/log_files.yml.template /var/container_init/log_files.yml.template
COPY config/logrotate.conf /etc/logrotate.d/rc-subsite
COPY config/env.template /var/container_init/env.template
COPY config/nginx.conf /etc/nginx/nginx.conf
COPY config/supervisord.conf /etc/supervisord.conf
COPY . /var/container_init/site_content

# Increase the number of worker processes for php-fpm
RUN sed -i 's/^pm\.max_children.*/pm.max_children = 30/' /etc/php5/php-fpm.conf
RUN sed -i 's/^pm\.start_servers.*/pm.start_servers = 5/' /etc/php5/php-fpm.conf
RUN sed -i 's/^pm\.min_spare_servers.*/pm.min_spare_servers = 5/' /etc/php5/php-fpm.conf
RUN sed -i 's/^pm\.max_spare_servers.*/pm.max_spare_servers = 5/' /etc/php5/php-fpm.conf

RUN composer dump-autoload --optimize \
 && chmod +x /var/container_init/init.sh \
#RC
 && mkdir -p /var/www/rc \
 && cp -R /var/container_init/site_content/. /var/www/rc \
 && gulp --cwd /var/www/rc rc \
 && chmod -R 777 /var/www/rc/storage \
 && chmod -R 777 /var/www/rc/public \
 && touch /var/www/rc/.env \
#OLC
 && mkdir -p /var/www/olc \
 && cp -R /var/container_init/site_content/. /var/www/olc \
 && gulp --cwd /var/www/olc olc \
 && chmod -R 777 /var/www/olc/storage \
 && chmod -R 777 /var/www/olc/public \
 && touch /var/www/olc/.env \
#country site -- Tunisia / tn
 && mkdir -p /var/www/country-tn \
 && cp -R /var/container_init/site_content/. /var/www/country-tn \
 && gulp --cwd /var/www/country-tn theme_blue \
 && chmod -R 777 /var/www/country-tn/storage \
 && chmod -R 777 /var/www/country-tn/public \
 && touch /var/www/country-tn/.env \
#country site -- Congo / drc
 && mkdir -p /var/www/country-drc \
 && cp -R /var/container_init/site_content/. /var/www/country-drc \
 && gulp --cwd /var/www/country-drc theme_blue \
 && chmod -R 777 /var/www/country-drc/storage \
 && chmod -R 777 /var/www/country-drc/public \
 && touch /var/www/country-drc/.env \
#country site -- Tanzania /tz
 && mkdir -p /var/www/country-tz \
 && cp -R /var/container_init/site_content/. /var/www/country-tz \
 && gulp --cwd /var/www/country-tz theme_blue \
 && chmod -R 777 /var/www/country-tz/storage \
 && chmod -R 777 /var/www/country-tz/public \
#country site -- Tanzania /tz olc
 && mkdir -p /var/www/country-tz-olc \
 && cp -R /var/container_init/site_content/. /var/www/country-tz-olc \
 && gulp --cwd /var/www/country-tz-olc theme_blue \
 && chmod -R 777 /var/www/country-tz-olc/storage \
 && chmod -R 777 /var/www/country-tz-olc/public \
 && touch /var/www/country-tz-olc/.env \
#country site -- Guinea /gn
 && mkdir -p /var/www/country-gn \
 && cp -R /var/container_init/site_content/. /var/www/country-gn \
 && gulp --cwd /var/www/country-gn theme_blue \
 && chmod -R 777 /var/www/country-gn/storage \
 && chmod -R 777 /var/www/country-gn/public \
 && touch /var/www/country-gn/.env \
#country site -- Zambia /zm
 && mkdir -p /var/www/country-zm \
 && cp -R /var/container_init/site_content/. /var/www/country-zm \
 && gulp --cwd /var/www/country-zm theme_blue \
 && chmod -R 777 /var/www/country-zm/storage \
 && chmod -R 777 /var/www/country-zm/public \
 && touch /var/www/country-zm/.env \

#cleanup
 && rm -r /var/container_init/site_content

EXPOSE 80
CMD cd /var/container_init && ./init.sh && /usr/bin/supervisord -c /etc/supervisord.conf
