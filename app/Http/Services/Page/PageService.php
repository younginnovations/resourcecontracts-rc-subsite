<?php namespace App\Http\Services\Page;

use App\Http\Models\Page\Page;
use Carbon\Carbon;
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
    public function save($page_id, array $content, array $options = [])
    {
        $page          = $this->page->country()->where('id', $page_id)->first();
        $page->title   = (object) $content['title'];

        if (($options['version_action'] && $options['version_action'] == 'update') && (!empty($page->version)) ) {
            $targetVersion = isset($options['target_version']) ? $options['target_version'] : $page->version_no;
            $versionContent = $page->version;
            $targetVersionContent = (object)$content['content'];
            $targetVersionContent->ver = $targetVersion;
            $targetVersionContent->updated_at = Carbon::now()->toIso8601String();
            $targetVersionContent->created_at = $versionContent->{$page->version_no}->created_at;
            $versionContent->{$targetVersion} = $targetVersionContent;
            $page->version = $versionContent;
            $page->content = (object) $content['content'];
        } else {
            // create new version
            $hasVersions = !empty($page->version);
            $version = array_values((array)$page->version);
            $new_content = $content['content'];
            $last_key = end($version);
            $new_content['ver'] = empty($version) ? 0 : intval($last_key->ver) + 1;
            $new_content['created_at'] = $new_content['updated_at'] = Carbon::now()->toIso8601String();
            array_push($version, (object)$new_content);

            if (count($version) > 10) {
                //if versions is greater than 10
                array_shift($version);
            }

            $page->version = (object) $version;
            $keys = array_keys($version);
            $selected_key = end($keys);
            if (!$hasVersions) {
                $page->content = (object) $content['content'];
                $page->version_no = $selected_key;
            }
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
        $content =  $input['content'];
        $content["ver"] = 0;
        $content['updated_at'] = $content['created_at'] = Carbon::now()->toIso8601String();
        array_push($version, (object) $content);

        $input = [
            'title'      => (object)$input['title'],
            'content'    => (object)$input['content'],
            'slug'       => str_slug($input['title']['en']),
            'version'    => (object)$version,
            'version_no' => 0
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
     * @param $new_selected
     * 
     * @return bool
    */
    public function versionUpdate($id, $new_selected)
    {
        $page = $this->page->country()->where('id', $id)->first();
        $versions = array_values((array) $page->version);
        
        if(array_key_exists($new_selected, $versions)){
            $page->content = (object) $versions[$new_selected];
            $page->version_no = $new_selected;
        }

        Cache::forget('all');
        Cache::forget($id);
        Cache::forget($page->slug);

        return $page->save();  
    }

    public function deleteVersion($page_id, $version)
    {
        $page = $this->page->country()->where('id', $page_id)->first();

        if ($version == $page->version_no) {
            throw new \Exception('Cannot delete currently active version');
        }
        $versionContent = $page->version;

        if ($versionContent && isset($versionContent->$version)) {
            unset($versionContent->$version);
            $page->version = $versionContent;
        }

        Cache::forget('all');
        Cache::forget($page_id);
        Cache::forget($page->slug);

        return $page->save();
    }
}
