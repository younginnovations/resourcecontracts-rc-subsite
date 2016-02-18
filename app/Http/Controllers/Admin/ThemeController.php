<?php namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Services\Admin\ThemeService;
use Laravel\Lumen\Routing\Controller as BaseController;


/**
 * @property ThemeService themeservice
 */
class ThemeController extends BaseController
{
    /**
     * @param ThemeService $themeService
     * @internal param ImageService $image
     * @internal param Theme $theme
     * @internal param Filesystem $filesystem
     */
    public function __construct(ThemeService $themeService)
    {
        $this->middleware('user');
        $this->themeservice = $themeService;
    }

    /**
     * Index page for theme controller.
     * @return \Illuminate\View\View
     */
    public function index()
    {
        $homePageImage  = getDefaultThemeProperties('background-image');
        $sidebarImage   = getDefaultThemeProperties('sidebar-image');
        $primaryColor   = getDefaultThemeProperties('primary-color');
        $secondaryColor = getDefaultThemeProperties('secondary-color');
        $sidebarColor   = getDefaultThemeProperties('sidebar-color');
        $footerText     = getDefaultThemeProperties('footer-text');

        return view('admin.theme.index', compact('homePageImage', 'sidebarImage', 'primaryColor', 'secondaryColor', 'sidebarColor', 'footerText'));
    }

    /**
     * Store the input in the database.
     * @internal param Request $request
     * @param Request $request
     * @return string
     */
    public function store(Request $request)
    {
        $inputs = $request->all();
        $data   = $this->themeservice->getData($inputs);

        if ($this->themeservice->saveData($data)) {
            $this->themeservice->generateFile(true);

            return redirect()->back()->with('success', 'Successfully Updated.');
        } else {
            return redirect()->back()->with('error', 'Update Failed');
        }

    }

}
