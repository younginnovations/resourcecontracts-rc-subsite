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
        return $this->page->where('country', get_country('code'))->get();
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
        $page = $this->page->where('slug', $page)->country()->get()->first();

        if ($array) {
            return $page->toArray();
        }

        return $page;
    }

    /**
     * Save Page
     * @param       $slug
     * @param array $content
     * @return bool
     * @internal param $page_id
     * @internal param $page
     */
    public function save($slug, array $content)
    {
        $page          = $this->page->where('slug', $slug)->country()->first();
        $page->title   = (object) $content['title'];
        $page->content = (object) $content['content'];
        $page->country = get_country('code');

        return $page->save();
    }

    /**
     * Find page
     *
     * @param        $key
     * @param string $column
     * @return Page
     * @internal param $id
     */
    public function find($key, $column = 'slug')
    {
        if ($column == 'id') {
            return $this->page->find($key);
        }

        return $this->page->where($column, $key);
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
            'slug'    => str_slug($input['title']['en']),
            'country' => get_country('code')
        ];

        $validate = $this->page->where('slug', $input['slug'])->country()->count();

        if ($validate == 0) {
            return $this->page->create($input);
        } else {
            return false;
        }
    }

    /**
     * Delete the page.
     * @param $id
     * @return bool|null
     */
    public function destroy($id)
    {
        $pageId = $this->find($id, 'id');

        return $pageId->delete();
    }
}
