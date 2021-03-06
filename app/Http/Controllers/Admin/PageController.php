<?php namespace App\Http\Controllers\Admin;

use App\Http\Services\Page\PageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Laravel\Lumen\Routing\Controller as BaseController;

/**
 * Class PageController
 * @package App\Http\Controllers\Admin
 */
class PageController extends BaseController
{
    /**
     * @var PageService
     */
    protected $page;

    /**
     * @var bool
     */
    public $hideSearchBar;

    /**
     * @param PageService $page
     */
    public function __construct(PageService $page)
    {
        $this->page = $page;
        $this->middleware('user');
        $this->hideSearchBar = true;
    }

    public function cacheClear()
    {
        Artisan::call('cache:clear');

        return "Cache is cleared";
    }

    /**
     * Pages list
     *
     */
    public function index()
    {

        $pages = $this->page->all();
        $hideSearchBar = $this->hideSearchBar;

        return view('admin.page.index', compact('pages','hideSearchBar'));
    }

    /**
     * Create Page
     *
     */
    public function create()
    {
        $hideSearchBar = $this->hideSearchBar;
        return view('admin.page.create', compact('hideSearchBar'));
    }

    /**
     * Store page
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $input = [
            'title'   => $request->input('title'),
            'content' => $request->input('content'),
        ];

        if ($this->page->create($input)) {
            return redirect()->route('admin.page')->withSuccess('Page successfully created.');
        }

        return redirect()->route('admin.page')->withError('Page could not be created.');
    }

    /**
     * Edit page
     *
     * @param $id
     *
     * @param Request $request
     * @return \Illuminate\View\View
     */
    public function edit($id, Request $request)
    {
        $version = $request->query('v');
        $page = $this->page->find($id);
        $hideSearchBar = $this->hideSearchBar;

        if (!$page) {
            abort(404);
        }

        if (!is_null($version)) {
            if (isset($page->version->$version)) {
                $page->content = $page->version->$version;
            }
            else{
                abort(404, 'Invalid version provided');
            }
        }
        return view('admin.page.edit', compact('page','hideSearchBar'));
    }

    /**
     * Update Page
     *
     * @param Request $request
     *
     * @return bool
     * @internal param $page
     *
     */
    public function update(Request $request, $id)
    {
        $versionAction = $request->input('version_action');
        $options = ['version_action' => $versionAction, 'target_version' => $request->input('target_version')];
        $input = [
            'title'   => $request->input('title'),
            'content' => $request->input('content'),
        ];

        if ($this->page->save($id, $input, $options)) {
            return redirect()->route('admin.page')->withSuccess('Page successfully updated.');
        }

        return redirect()->route('admin.page')->withError('Page could not be updated.');
    }

    /**
     * Delete the page.
     *
     * @param $id
     *
     * @return mixed
     */
    public function delete($id)
    {
        if ($this->page->destroy($id)) {
            return redirect()->route('admin.page')->withSuccess('Page successfully deleted.');
        }

        return redirect()->route('admin.page')->withError('Page could not be deleted');
    }

    /**
     * Change version of content
     *
     * @param Request $request
     * @param $id
     *
     * @return mixed
     */
    public function versionUpdate(Request $request, $id)
    {
        $new_selected = $request->input('version_no');
        if($this->page->versionUpdate($id, $new_selected)){
            return redirect()->route('admin.page')->withSuccess('Version successfully changed.');
        }

        return redirect()->route('admin.page')->withError('Version could not be changed.');
    }

    /**
     * Delete a page version
     * @param Request $request
     * @param $id
     * @param $version
     * @return mixed
     * @throws \Exception
     */
    public function deleteVersion(Request $request, $id, $version)
    {
        $this->page->deleteVersion($id, $version);
        return redirect()->route('admin.page')->withSuccess('Version deleted successfully');
    }
}
