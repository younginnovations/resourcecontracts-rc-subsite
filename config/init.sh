#!/bin/sh

#IMPORTANT!: Note that we do envsubst for all env variables for env.template. Take care with '$' characters in env.template, strings that start with $ will be treated like env vars.

# When defining server names put the most likely name first to optimize matching performance
#rc
export SERVER_NAME="www.resourcecontracts.org resourcecontracts.org *.resourcecontracts.org"
export CATEGORY=rc
export TRACKING_ID=${RC_TRACKING_ID}
export GTM_ID=${RC_GTM_ID}
export DB_DATABASE=${RC_DB_DATABASE}
export CONTACT_MAIL=${RC_CONTACT_MAIL}
export COUNTRY=''

envsubst '$SERVER_NAME $CATEGORY'< ./nginx_subsite.template > /etc/nginx/sites-enabled/rc
envsubst < ./env.template > /var/www/rc/.env

#olc
export SERVER_NAME="www.openlandcontracts.org openlandcontracts.org *.openlandcontracts.org "
export CATEGORY=olc
export TRACKING_ID=${OLC_TRACKING_ID}
export GTM_ID=${OLC_GTM_ID}
export DB_DATABASE=${OLC_DB_DATABASE}
export CONTACT_MAIL=${OLC_CONTACT_MAIL}
export COUNTRY=''

envsubst '$SERVER_NAME $CATEGORY'< ./nginx_subsite.template > /etc/nginx/sites-enabled/olc
envsubst < ./env.template > /var/www/olc/.env

#olc.com redirect
cp ./nginx_olc_com /etc/nginx/sites-enabled/olc.com

#country-tn
export SERVER_NAME="tunisia.resourcecontracts.org *.tunisia.resourcecontracts.org"
export TRACKING_ID=${TN_TRACKING_ID}
export GTM_ID=${TN_GTM_ID}
export DB_DATABASE=${COUNTRY_DB_DATABASE}
export CONTACT_MAIL=${TN_CONTACT_MAIL}
export COUNTRY=tn

export CATEGORY=country-tn
envsubst '$SERVER_NAME $CATEGORY'< ./nginx_subsite.template > /etc/nginx/sites-enabled/country-tn

export CATEGORY=rc
envsubst < ./env.template > /var/www/country-tn/.env

#country-drc
export SERVER_NAME="drc.openlandcontracts.org *.drc.openlandcontracts.org"
export TRACKING_ID=${DRC_TRACKING_ID}
export GTM_ID=${DRC_GTM_ID}
export DB_DATABASE=${COUNTRY_DB_DATABASE}
export CONTACT_MAIL=${DRC_CONTACT_MAIL}
export COUNTRY=cd

export CATEGORY=country-drc
envsubst '$SERVER_NAME $CATEGORY'< ./nginx_subsite.template > /etc/nginx/sites-enabled/country-drc

export CATEGORY=olc
envsubst < ./env.template > /var/www/country-drc/.env

#country-tanzania-olc
export SERVER_NAME="tanzania.openlandcontracts.org *.tanzania.openlandcontracts.org"
export TRACKING_ID=${TZ_TRACKING_ID}
export GTM_ID=${TZ_GTM_ID}
export DB_DATABASE=${COUNTRY_DB_DATABASE}
export CONTACT_MAIL=${TZ_CONTACT_MAIL}
export COUNTRY=tz

export CATEGORY=country-tz-olc
envsubst '$SERVER_NAME $CATEGORY'< ./nginx_subsite.template > /etc/nginx/sites-enabled/country-tz-olc

export CATEGORY=olc
envsubst < ./env.template > /var/www/country-tz-olc/.env

#country-tanzania
export SERVER_NAME="tanzania.resourcecontracts.org *.tanzania.resourcecontracts.org"
export TRACKING_ID=${TZ_TRACKING_ID}
export GTM_ID=${TZ_GTM_ID}
export DB_DATABASE=${COUNTRY_DB_DATABASE}
export CONTACT_MAIL=${TZ_CONTACT_MAIL}
export COUNTRY=tz

export CATEGORY=country-tz
envsubst '$SERVER_NAME $CATEGORY'< ./nginx_subsite_protected.template > /etc/nginx/sites-enabled/protected-country-tz

export CATEGORY=rc
envsubst < ./env.template > /var/www/country-tz/.env

#country-guinea
export SERVER_NAME="guinea.resourcecontracts.org *.guinea.resourcecontracts.org contratsminiersguinee.org *.contratsminiersguinee.org"
export TRACKING_ID=${GN_TRACKING_ID}
export GTM_ID=${GN_GTM_ID}
export DB_DATABASE=${COUNTRY_DB_DATABASE}
export CONTACT_MAIL=${GN_CONTACT_MAIL}
export COUNTRY=gn

export CATEGORY=country-gn
envsubst '$SERVER_NAME $CATEGORY'< ./nginx_subsite.template > /etc/nginx/sites-enabled/country-gn

export CATEGORY=rc
envsubst < ./env.template > /var/www/country-gn/.env

#country-zambia
export SERVER_NAME="zambia.resourcecontracts.org *.zambia.resourcecontracts.org"
export TRACKING_ID=${ZM_TRACKING_ID}
export GTM_ID=${ZM_GTM_ID}
export DB_DATABASE=${COUNTRY_DB_DATABASE}
export CONTACT_MAIL=${ZM_CONTACT_MAIL}
export COUNTRY=zm

export CATEGORY=country-zm
envsubst '$SERVER_NAME $CATEGORY'< ./nginx_subsite.template > /etc/nginx/sites-enabled/country-zm

export CATEGORY=rc
envsubst < ./env.template > /var/www/country-zm/.env

#country-ivory-coast
export SERVER_NAME="ivorycoast.resourcecontracts.org *.ivorycoast.resourcecontracts.org"
export TRACKING_ID=${CI_TRACKING_ID}
export GTM_ID=${CI_GTM_ID}
export DB_DATABASE=${COUNTRY_DB_DATABASE}
export CONTACT_MAIL=${CI_CONTACT_MAIL}
export COUNTRY=ci

export CATEGORY=country-ci

# Only password protect the production site
if [[ $DEPLOYMENT_TYPE == 'master' ]]
then
	envsubst '$SERVER_NAME $CATEGORY'< ./nginx_subsite_protected.template > /etc/nginx/sites-enabled/protected-country-ci
else
	envsubst '$SERVER_NAME $CATEGORY'< ./nginx_subsite.template > /etc/nginx/sites-enabled/country-ci
fi

export CATEGORY=rc
envsubst < ./env.template > /var/www/country-ci/.env

#log_files
envsubst '${DEPLOYMENT_TYPE}' < ./log_files.yml.template > /etc/log_files.yml
