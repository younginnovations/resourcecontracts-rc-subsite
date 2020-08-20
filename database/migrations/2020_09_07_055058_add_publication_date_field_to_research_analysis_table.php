<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class AddPublicationDateFieldToResearchAnalysisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('research_analysis', function (Blueprint $table) {
            $table->timestamp('publication_date')->nullable()->after('url');
            $table->boolean('ignore_publication_day')->default(false)->after('publication_date');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('research_analysis', function (Blueprint $table) {
            $table->dropColumn('publication_date');
            $table->dropColumn('ignore_publication_day');
        });
    }
}
