<?php

use App\Http\Models\Page\Page;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $pages = [
            ['title' => 'About', 'slug' => 'about', 'content' => 'About content'],
            ['title' => 'Contact', 'slug' => 'contact', 'content' => 'Contact content'],
            ['title' => 'Guides', 'slug' => 'guides', 'content' => 'Guide content'],
            ['title' => 'FAQs', 'slug' => 'faqs', 'content' => 'FAQs content'],
        ];

        foreach ($pages as $page) {
            Page::create($page);
        }
    }

}
