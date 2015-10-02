# NRGI-Subsite

## Install

NRGI-Subsite can be cloned from github repository and installed. Following the procedure given below:

* git clone https://github.com/younginnovations/resourcecontracts-rc-subsite.git
* cd rc-subsite

## Run

The app can be run with the command below:

* install the application dependencies using command: `composer install`
* copy .env.example to .env and update your the database configurations, elasticsearch host and category.
* give write permission to the storage folder using `chmod -R 777 storage`
* run migration using `php artisan migrate`
* seed dummy data using `php artisan db:seed`
* run `php artisan serve`.

## Framework

The application is written in PHP based on the [Laravel Lumen](http://lumen.laravel.com/) framework, current version of Laravel 
used for this project is 5.1 .
 

## Tools and packages

This application uses many tools and packages, the packages can 
be seen in the [composer.json](https://github.com/younginnovations/resourcecontracts-rc-subsite/blob/master/composer.json) file and javascript

## Deployment

We use Elastic Beanstalk CLI. 
