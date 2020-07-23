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
        if (site()->isCountrySite()) {
            $text = $this->option->getByCountryGroup('text', strtolower(site()->getCountryCode()));
        } else {
            $text = $this->option->getByGroup('text');
        }

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
        if (site()->isCountrySite()) {
            if ($this->updateCountryText($request)) {
                return redirect()->route('admin.text')->with('success', 'Text successfully updated.');
            }

            return redirect()->route('admin.text')->with('error', 'Text could not be updated.');
        }

        $input = $request->only(
            'homepage_new_sub_tag_line_text',
            'homepage_new_tag_line_text',
            'homepage_new_tag_line_desc_text',
            'homepage_search_placeholder_text',
            'homepage_get_started_text',
            'homepage_annotation_navigation_text',
            'homepage_map_card_text',
            'homepage_footer_text',
            'homepage_footer_link_text',
            'footer_text'
        );

        if ($this->option->updateGroup($input, 'text')) {
            return redirect()->route('admin.text')->with('success', 'Text successfully updated.');
        }

        return redirect()->route('admin.text')->with('error', 'Text could not be updated.');
    }

    /**
     * Update country text
     *
     * @param $request
     *
     * @return bool
     */
    public function updateCountryText($request)
    {
        $input = $request->only(
            'homepage_new_sub_tag_line_text',
            'homepage_new_tag_line_text',
            'homepage_new_tag_line_desc_text',
            'homepage_search_placeholder_text',
            'homepage_get_started_text'
        );

        $country_update = $this->option->updateCountryGroup($input, 'text', strtolower(site()->getCountryCode()));
        $footer_update  = $this->option->updateGroup($request->only('footer_text'), 'text');

        return ($country_update && $footer_update);
    }

}
