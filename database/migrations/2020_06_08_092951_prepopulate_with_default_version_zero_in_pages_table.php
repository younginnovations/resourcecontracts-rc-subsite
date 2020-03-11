<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PrepopulateWithDefaultVersionZeroInPagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $pages = \App\Http\Models\Page\Page::all();

        foreach ($pages as $page) {
            if (is_null($page->version)) {
                $versionContent = [
                    0 => $page->content
                ];
                $versionContent['0']->ver = 0;
                $versionContent['0']->created_at = $page->created_at->toIso8601String();
                $versionContent['0']->updated_at = $page->updated_at->toIso8601String();
                $page->version = (object)$versionContent;
                $page->version_no = 0;
                $page->save();
            }
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
