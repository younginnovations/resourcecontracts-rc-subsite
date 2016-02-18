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
        $country = get_country('code');


        $pages = [
            ['title' => ['en' => 'About', 'fr' => 'Fr About'], 'slug' => 'about', 'content' => ['en' => 'About content for country ' . $country, 'fr' => 'Fr About Content'], 'country' => $country],
            [
                'title'   => ['en' => 'Contact', 'fr' => 'Fr Contact'],
                'slug'    => 'contact',
                'content' => ['en' => 'Contact content for country ' . $country, 'fr' => 'Fr Contact Content'],
                'country' => $country
            ],
            [
                'title'   => ['en' => 'Resources', 'fr' => 'Fr Resources'],
                'slug'    => 'resources',
                'content' => ['en' => 'Guide content for country ' . $country, 'fr' => 'Fr Guide Content'],
                'country' => $country
            ],
            ['title' => ['en' => 'FAQs', 'fr' => 'Fr Faqs'], 'slug' => 'faqs', 'content' => ['en' => 'FAQs content for country ' . $country, 'fr' => 'Fr FAQS Content'], 'country' => $country],
            [
                'title'   => ['en' => 'Glossary', 'fr' => 'Fr Glossary'],
                'slug'    => 'glossary',
                'content' => ['en' => 'Glossary content for country ' . $country, 'fr' => 'Fr Glossary Content'],
                'country' => $country
            ],
            [
                'title'   => ['en' => 'Publish Contracts', 'fr' => 'Publish Contracts'],
                'slug'    => 'publish-contracts',
                'content' => ['en' => 'Publish Contracts for country ' . $country, 'fr' => 'Fr Publish Contract Content'],
                'country' => $country
            ],
        ];


        foreach ($pages as $page) {

            $validate = Page::where('slug', $page['slug'])->country()->count();

            if ($validate == 0) {
                Page::create($page);
            }
        }
    }

}
