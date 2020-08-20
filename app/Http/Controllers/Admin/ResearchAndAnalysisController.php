<?php


namespace App\Http\Controllers\Admin;


use App\Http\Services\Admin\ImageService;
use App\Http\Services\Admin\OptionService;
use App\Http\Services\Admin\ResearchAndAnalysisService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Laravel\Lumen\Routing\Controller;

class ResearchAndAnalysisController extends Controller
{
    /**
     * @var ResearchAndAnalysisService
     */
    private $researchAndAnalysisService;

    /**
     * @var OptionService
     */
    private $optionService;

    /**
     * ResearchAndAnalysisController constructor.
     * @param ResearchAndAnalysisService $researchAndAnalysisService
     * @param OptionService $optionService
     */
    public function __construct(ResearchAndAnalysisService $researchAndAnalysisService, OptionService $optionService)
    {
        $this->researchAndAnalysisService = $researchAndAnalysisService;
        $this->middleware('user');
        $this->optionService = $optionService;
    }

    /**
     * Show list of links
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
        $textOptions = $this->optionService->get('research_and_analysis_page_text', true);
        $pages = $this->researchAndAnalysisService->paginate(15, true);

        return view('admin.research-and-analysis.index', compact('pages', 'textOptions'));
    }

    /**
     * Show form for creating research link
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('admin.research-and-analysis.create');
    }

    /**
     * Store new research link
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        /* @var \Illuminate\Validation\Validator $validator */
        $validator = Validator::make(
            $request->all(),
            [
                'title'                  => 'required',
                'url'                    => 'required|url',
                'publication_date'       => 'required|date',
                'ignore_publication_day' => 'in:on,off'
            ]
        );

        if ($validator->fails()) {
            return redirect()->back()->with('error', 'Invalid data provided: '  . $validator->messages()->first());
        }

        $this->researchAndAnalysisService->create($request->all());

        return redirect()->route('admin.research-and-analysis.index')->withSuccess('Successfully added new research link');
    }

    /**
     * Show form for editing research links
     *
     * @param $id
     * @return \Illuminate\View\View
     */
    public function edit($id)
    {
        $research = $this->researchAndAnalysisService->find($id);

        return view('admin.research-and-analysis.edit', compact('research'));
    }

    /**
     * Update research link
     *
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, $id)
    {
        /* @var \Illuminate\Validation\Validator $validator */
        $validator = Validator::make(
            $request->all(),
            [
                'title'            => 'required',
                'url'              => 'required|url',
                'publication_date' => 'required|date'
            ]
        );

        if ($validator->fails()) {
            return redirect()->back()->with('error', 'Invalid data provided: '  . $validator->messages()->first());
        }

        $attributes = $request->all();
        $this->researchAndAnalysisService->update($id, $attributes);

        return redirect()->route('admin.research-and-analysis.index')->withSuccess('Successfully updated research link');
    }

    /**
     * Delete a research link
     *
     * @param $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function delete($id)
    {
        $this->researchAndAnalysisService->delete($id);

        return redirect()->route('admin.research-and-analysis.index')->withSuccess('Successfully deleted.');
    }

    /**
     * Show form for featured links
     *
     * @return \Illuminate\View\View
     */
    public function getFeatured()
    {
        return view('admin.research-and-analysis.edit-featured', [
            'featured' => $this->researchAndAnalysisService->getFeatured(),
            'researches' => $this->researchAndAnalysisService->all()
        ]);
    }

    /**
     * Update featured links
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateFeatured(Request $request)
    {
        $this->researchAndAnalysisService->updateFeatured($request->input('featured'));

        return redirect()->route('admin.research-and-analysis.index')->withSuccess('Successfully updated featured links.');
    }

    /**
     * Show form for updating heading text in research and analysis page
     *
     * @return \Illuminate\View\View
     */
    public function editHeadingText()
    {
        $textOptions = $this->optionService->get('research_and_analysis_page_text', true);

        return view('admin.research-and-analysis.edit-page-text', compact('textOptions'));
    }

    /**
     * Update heading text in research and analysis page
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateHeadingText(Request $request)
    {
        $options = $request->all();
        $this->optionService->update('research_and_analysis_page_text', $options, 'research_and_analysis');

        return redirect()->route('admin.research-and-analysis.index')->withSuccess('Successfully updated heading text.');
    }

    /**
     * Show form to edit page background image
     *
     * @return \Illuminate\View\View
     */
    public function editBackgroundImage()
    {
        $image = $this->optionService->get('research_and_analysis_bg_image', true);

        return view('admin.research-and-analysis.edit-bg-image', compact('image'));
    }

    /**
     * Store background image to options
     *
     * @param Request $request
     *
     * @return \Illuminate\View\View|\Illuminate\Http\RedirectResponse
     */
    public function storeBackgroundImage(Request $request)
    {
        try {
            /* @var ImageService $imageService*/
            $imageService = app(ImageService::class);
            $attributes = $request->all();
            $url = $imageService->uploadResearchAnalysisBgImage($attributes);
            $this->optionService->update(
                'research_and_analysis_bg_image',
                ['image_url' => $url,],
                'research_and_analysis'
            );

            return redirect()->route('admin.research-and-analysis.index')->withSuccess('Successfully updated background image.');
        } catch (\Exception $e) {

            return redirect()->back()->with('error', $e->getMessage());
        }

    }
}
