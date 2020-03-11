<?php

use Carbon\Carbon;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class PrepopulateWithDefaultVersionZeroInPagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $pages = DB::table('pages')->get();

        foreach ($pages as $page) {
            $content = json_decode($page->content);
            if (is_null($page->version)) {
                $versionContent = [
                    0 => $content
                ];
                $versionContent['0']->ver = 0;
                $createdAt = Carbon::parse($page->created_at);
                $updatedAt = Carbon::parse($page->updated_at);
                $versionContent['0']->created_at = $createdAt->toIso8601String();
                $versionContent['0']->updated_at = $updatedAt->toIso8601String();
                $page->version = json_encode((object)$versionContent);
                $page->version_no = 0;
                DB::table('pages')->where('id', $page->id)->update((array) $page);
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
