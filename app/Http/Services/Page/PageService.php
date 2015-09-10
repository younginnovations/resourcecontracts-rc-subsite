<?php namespace App\Http\Services\Page;

use App\Http\Models\Page\Page;

/**
 * Class Page
 * @package App\Http\Services
 */
Class PageService
{
    /**
     * @var Page
     */
    protected $page;

    /**
     * @param Page $page
     */
    public function __construct(Page $page)
    {
        $this->page = $page;
    }

    /**
     * Get Page
     *
     * @param      $page
     * @param bool $array
     * @return null|object
     */
    public function get($page, $array = false)
    {
        $page = $this->page->where('slug', $page)->first();

        if ($array) {
            return $page->toArray();
        }

        return $page;
    }

    /**
     * Save Page
     * @param       $page
     * @param array $content
     * @return bool
     */
    public function save($page, array $content)
    {
        $page          = $this->page->where('slug', $page)->first();
        $page->title   = $content['title'];
        $page->content = $content['content'];

        return $page->save();
    }
}
