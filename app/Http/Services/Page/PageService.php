<?php namespace App\Http\Services\Page;

use App\Http\Models\Page\Page;
use Illuminate\Support\Facades\Cache;

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
    protected $cacheDuration;

    /**
     * @param Page $page
     */
    public function __construct(Page $page)
    {
        $this->page          = $page;
        $this->cacheDuration = 24 * 60 * 60;
    }

    /**
     * Get All Pages
     *
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function all()
    {
        return Cache::remember(
            'all',
            $this->cacheDuration,
            function () {
                return $this->page->country()->orderBy('id', 'DESC')->get();
            }
        );
    }

    /**
     * Get Page
     *
     * @param      $page
     * @param bool $array
     *
     * @return null|object
     */
    public function get($page, $array = false)
    {
        $page = Cache::remember(
            $page,
            $this->cacheDuration,
            function () use ($page) {
                return $this->page->country()->where('slug', $page)->first();
            }
        );

        if ($array) {
            return $page->toArray();
        }

        return $page;
    }

    /**
     * Save Page
     *
     * @param       $page_id
     * @param array $content
     *
     * @return bool
     * @internal param $page
     */
    public function save($page_id, array $content)
    {
        $page          = $this->page->country()->where('id', $page_id)->first();
        $page->title   = (object) $content['title'];
        $page->content = (object) $content['content'];

        if($page->isDirty('content')){
            //if content changed
            $version = array_values((array) $page->version);
            array_push($version, (object) $content['content']);

            if(count($version) > 10){
                //if versions is greater than 10
                array_shift($version);
            }

            $page->version = (object) $version;
            $keys = array_keys($version);
            $selected_key = end($keys);
            $page->selected = $selected_key;
        }

        Cache::forget('all');
        Cache::forget($page_id);
        Cache::forget($page->slug);

        return $page->save();
    }

    /**
     * Find page
     *
     * @param $id
     *
     * @return Page
     */
    public function find($id)
    {
        return Cache::remember(
            $id,
            $this->cacheDuration,
            function () use ($id) {
                return $this->page->country()->find($id);
            }
        );
    }

    /**
     * Create new Page
     *
     * @param $input
     *
     * @return static
     */
    public function create($input)
    {
        $version = [];
        array_push($version, (object) $input['content']);

        $input = [
            'title'    => (object) $input['title'],
            'content'  => (object) $input['content'],
            'slug'     => str_slug($input['title']['en']),
            'version'  => (object) $version,
            'selected' => 0  
        ];
        Cache::forget('all');

        return $this->page->create($input);
    }

    /**
     * Delete the page.
     *
     * @param $id
     *
     * @return bool|null
     */
    public function destroy($id)
    {
        $page = $this->find($id);
        Cache::forget('all');
        Cache::forget($page->id);
        Cache::forget($page->slug);

        return $page->delete();
    }

    /** 
     * Change the version of content
     * 
     * @param $id
     * @param $new-selected
     * 
     * @return bool
    */
    public function versionUpdate($id, $new_selected)
    {
        $page = $this->page->country()->where('id', $id)->first();
        $versions = array_values((array) $page->version);
        
        if(array_key_exists($new_selected, $versions)){
            $page->content = (object) $versions[$new_selected];
            $page->selected = $new_selected;
        }

        Cache::forget('all');
        Cache::forget($id);
        Cache::forget($page->slug);

        return $page->save();  
    }
}
