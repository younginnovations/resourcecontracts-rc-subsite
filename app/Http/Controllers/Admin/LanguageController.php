<?php namespace App\Http\Controllers\Admin;

use App\Http\Services\Admin\OptionService;
use App\Http\Services\LocalizationService;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;

/**
 * Class LanguageController
 * @package App\Http\Controllers\Admin
 */
class LanguageController extends BaseController
{
    /**
     * @var OptionService
     */
    protected $option;
    /**
     * @var LocalizationService
     */
    protected $lang;

    /**
     * LanguageController constructor.
     *
     * @param OptionService       $option
     * @param LocalizationService $lang
     */
    public function __construct(OptionService $option, LocalizationService $lang)
    {
        $this->middleware('user');
        $this->option = $option;
        $this->lang   = $lang;
    }

    /**
     * Languages list
     *
     */
    public function index()
    {
        $locale   = $this->lang->getAllLang();
        $language = $this->option->get('site_lang');

        return view('admin.language.index', compact('language', 'locale'));
    }

    /**
     * Update language
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request)
    {
        $input = $request->input('site_lang');
        if (isset($input['enable'])) {
            if (empty($input['available'])) {
                $input['available'] = [$input['default']];
            } else {
                $input['available'] = array_unique(array_merge($input['available'], [$input['default']]));;
            }
        } else {
            $input['available'] = [$input['default']];
        }

        $default = [
            "default"   => 'en',
            "enable"    => false,
            'available' => [],
        ];

        $input = array_merge($default, $input);

        if ($this->option->update('site_lang', $input)) {
            return redirect()->route('admin.language')->with('success', 'Language successfully updated.');
        }

        return redirect()->route('admin.language')->with('error', 'Language could not be updated.');
    }

}
