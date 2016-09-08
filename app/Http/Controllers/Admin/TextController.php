<?php namespace App\Http\Controllers\Admin;

use App\Http\Services\Admin\OptionService;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;

/**
 * Class TextController
 * @package App\Http\Controllers\Admin
 */
class TextController extends BaseController
{
    /**
     * @var OptionService
     */
    private $option;

    /**
     * TextController constructor.
     *
     * @param OptionService $option
     */
    public function __construct(OptionService $option)
    {
        $this->middleware('user');
        $this->option = $option;
    }

    /**
     * Texts list
     *
     */
    public function index()
    {
        $text = $this->option->getByGroup('text');

        return view('admin.text.index', compact('text'));
    }

    /**
     * Update text
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request)
    {
        $input = $request->only('homepage_text', 'footer_text');

        if ($this->option->updateGroup($input, 'text')) {
            return redirect()->route('admin.text')->with('success', 'Text successfully updated.');
        }

        return redirect()->route('admin.text')->with('error', 'Text could not be updated.');
    }

}
