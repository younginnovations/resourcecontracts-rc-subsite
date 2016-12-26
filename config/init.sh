#!/bin/sh

#IMPORTANT!: Note that we do envsubst for all env variables for env.template. Take care with '$' characters in env.template, strings that start with $ will be treated like env vars.

#rc
export SERVER_NAME=${DOMAIN_PREFIX}resourcecontracts.org
export CATEGORY=rc
export TRACKING_ID=${RC_TRACKING_ID}
export DB_DATABASE=${RC_DB_DATABASE}
export CONTACT_MAIL=${RC_CONTACT_MAIL}
export COUNTRY=''

envsubst '$SERVER_NAME $CATEGORY'< ./nginx_subsite.template > /etc/nginx/sites-enabled/rc
envsubst < ./env.template > /var/www/rc/.env

#olc
export SERVER_NAME=${DOMAIN_PREFIX}openlandcontracts.org
export CATEGORY=olc
export TRACKING_ID=${OLC_TRACKING_ID}
export DB_DATABASE=${OLC_DB_DATABASE}
export CONTACT_MAIL=${OLC_CONTACT_MAIL}
export COUNTRY=''

envsubst '$SERVER_NAME $CATEGORY'< ./nginx_subsite.template > /etc/nginx/sites-enabled/olc
envsubst < ./env.template > /var/www/olc/.env

#country-tn
export SERVER_NAME=${DOMAIN_PREFIX}tunisia.resourcecontracts.org
export TRACKING_ID=${RC_TRACKING_ID}
export DB_DATABASE=${COUNTRY_DB_DATABASE}
export CONTACT_MAIL=${TN_CONTACT_MAIL}
export COUNTRY=tn

export CATEGORY=country-tn
envsubst '$SERVER_NAME $CATEGORY'< ./nginx_subsite.template > /etc/nginx/sites-enabled/country-tn

export CATEGORY=rc
envsubst < ./env.template > /var/www/country-tn/.env

