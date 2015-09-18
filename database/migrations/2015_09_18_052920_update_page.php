<?php
use App\Http\Models\Page\Page;
use Illuminate\Database\Migrations\Migration;

class UpdatePage extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $page = Page::where('slug', 'guides')->first();

        if ($page) {
            $page->slug  = 'resources';
            $page->title = 'Resources';
            $page->save();
        }

        $glossary = ['title' => 'Glossary', 'slug' => 'glossary', 'content' => 'Glossary content'];

        Page::create($glossary);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $page        = Page::where('slug', 'resources')->first();
        if($page)
        {
            $page->slug  = 'guides';
            $page->title = 'Guides';
            $page->save();
        }

        Page::where('slug', 'glossary')->delete();
    }
}
