<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCountryColumnInOptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if(site()->isCountrySite()) {
            Schema::table(
                'options',
                function (Blueprint $table) {
                    $table->string('country', 20)->nullable();
                    $table->dropUnique('options_key_unique');
                }
            );
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if(site()->isCountrySite()) {
            Schema::table(
                'options',
                function ($table) {
                    $table->dropColumn('country');
                    $table->unique('key');
                }
            );
        }
    }
}
