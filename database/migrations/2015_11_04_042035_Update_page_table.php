<?php
use App\Http\Models\Page\Page;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class UpdatePageTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $pages = DB::select('SELECT * FROM pages');

        foreach ($pages as $page) {
            $data = [
                'title'   => json_encode(['en' => $page->title, 'fr' => '']),
                'content' => json_encode(['en' => $page->content, 'fr' => ''])
            ];
            Page::where('id', $page->id)->update($data);
        }

        DB::statement('ALTER TABLE pages ALTER COLUMN title TYPE JSON USING title::JSON;');
        DB::statement('ALTER TABLE pages ALTER COLUMN content TYPE JSON USING content::JSON;');

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement('ALTER TABLE pages ALTER COLUMN title TYPE VARCHAR(200)');
        DB::statement('ALTER TABLE pages ALTER COLUMN content TYPE TEXT');

        $pages = DB::select('SELECT * FROM pages');

        foreach ($pages as $page) {
            $title   = json_decode($page->title);
            $content = json_decode($page->content);

            if (isset($title->en)) {
                $page->title = $title->en;
            }

            if (isset($content->en)) {
                $page->content = $content->en;
            }

            $data = [
                'title'   => $page->title,
                'content' => $page->content
            ];

            Page::where('id', $page->id)->update($data);
        }

    }
}
