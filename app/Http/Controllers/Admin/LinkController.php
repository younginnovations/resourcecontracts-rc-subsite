<?php namespace App\Http\Controllers\Admin;

use App\Http\Services\Admin\OptionService;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;

/**
 * Class LinkController
 * @package App\Http\Controllers\Admin
 */
class LinkController extends BaseController
{
    /**
     * @var OptionService
     */
    protected $option;

    /**
     * @var string
     */
    protected $key = 'links';
    /**
     * @var int
     */
    protected $numberOfLinks = 3;

    /**
     * LinkController constructor.
     *
     * @param OptionService $option
     */
    public function __construct(OptionService $option)
    {
        $this->middleware('user');
        $this->option = $option;
    }

    /**
     * Links list
     *
     */
    public function index()
    {
        $links = $this->option->get($this->key);

        return view('admin.link.index', compact('links'));
    }

    /**
     * Update Link
     *
     * @param Request $request
     *
     * @return bool
     * @internal param $page
     *
     */
    public function update(Request $request)
    {
        $link = $request->input('link');

        if ($this->option->update($this->key, $link, 'link')) {
            return redirect()->route('admin.link')->with('success', 'Link successfully updated.');
        }

        return redirect()->route('admin.link')->with('error', 'Link could not be updated.');
    }
}
