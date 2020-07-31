<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFeaturedFieldsToResearchAnalysisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('research_analysis', function(Blueprint $table)
        {
            $table->tinyInteger('featured_index')->nullable();
            $table->timestamp('featured_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('research_analysis', function(Blueprint $table)
        {
            $table->dropColumn('featured_index');
            $table->dropColumn('featured_at');
        });

    }
}
