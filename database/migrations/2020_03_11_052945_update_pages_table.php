<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdatePagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table(
            'pages',
            function (Blueprint $table) {
                $table->json('version')->nullable();
                $table->unsignedInteger('version_no')->nullable();
            }
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table(
            'pages',
            function ($table) {
                $table->dropColumn('version');
                $table->dropColumn('version_no');
            }
        );
    }
}
