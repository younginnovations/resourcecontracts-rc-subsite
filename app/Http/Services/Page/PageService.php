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
     * Get All Pages
     *
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function all()
    {
        return $this->page->orderBy('id', 'DESC')->get();
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
     * @param       $page_id
     * @param array $content
     * @return bool
     * @internal param $page
     */
    public function save($page_id, array $content)
    {
        $page          = $this->page->where('id', $page_id)->first();
        $page->title   = (object) $content['title'];
        $page->content = (object) $content['content'];

        return $page->save();
    }

    /**
     * Find page
     *
     * @param $id
     * @return Page
     */
    public function find($id)
    {
        return $this->page->find($id);
    }

    /**
     * Create new Page
     *
     * @param $input
     * @return static
     */
    public function create($input)
    {
        $input = [
            'title'   => (object) $input['title'],
            'content' => (object) $input['content'],
            'slug'    => str_slug($input['title']['en'])
        ];

        return $this->page->create($input);
    }
}
