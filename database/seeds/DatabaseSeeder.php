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
            ['title' => ['en' => 'About', 'fr' => 'Fr About'], 'slug' => 'about', 'content' => ['en' => 'About content', 'fr' => 'Fr About Content']],
            ['title' => ['en' => 'Contact', 'fr' => 'Fr Contact'], 'slug' => 'contact', 'content' => ['en' => 'Contact content', 'fr' => 'Fr Contact Content']],
            ['title' => ['en' => 'Resources', 'fr' => 'Fr Resources'], 'slug' => 'resources', 'content' => ['en' => 'Guide content', 'fr' => 'Fr Guide Content']],
            ['title' => ['en' => 'FAQs', 'fr' => 'Fr Faqs'], 'slug' => 'faqs', 'content' => ['en' => 'FAQs content', 'fr' => 'Fr FAQS Content']],
            ['title' => ['en' => 'Glossary', 'fr' => 'Fr Glossary'], 'slug' => 'glossary', 'content' => ['en' => 'Glossary content', 'fr' => 'Fr Glossary Content']],
            ['title' => ['en' => 'Publish Contracts', 'fr' => 'Publish Contracts'], 'slug' => 'publish-contracts', 'content' => ['en' => 'Publish Contracts', 'fr' => 'Fr Publish Contracts1']],
        ];

        foreach ($pages as $page) {
            Page::create($page);
        }
    }

}
