<?php


namespace App\Http\Controllers\Admin;


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
     * @return \Illuminate\View\View
     */
    public function index()
    {
        $textOptions = $this->optionService->get('research_and_analysis_page_text', true);
        $pages = $this->researchAndAnalysisService->paginate();
        return view('admin.research-and-analysis.index', compact('pages', 'textOptions'));
    }

    /**
     * @return \Illuminate\View\View|\Laravel\Lumen\Application
     */
    public function create()
    {
        return view('admin.research-and-analysis.create');
    }

    /**
     * @param Request $request
     */
    public function store(Request $request)
    {
        $attributes = $request->all();
        $attributes['status'] = isset($attributes['status']) ? (int) $attributes['status'] : 0;
        $this->researchAndAnalysisService->create($request->all());

        return redirect()->route('admin.research-and-analysis.index');
    }

    /**
     * @param $id
     * @return \Illuminate\View\View|\Laravel\Lumen\Application
     */
    public function edit($id)
    {
        $research = $this->researchAndAnalysisService->find($id);

        return view('admin.research-and-analysis.edit', compact('research'));
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, $id)
    {
        $attributes = $request->all();
        $attributes['status'] = isset($attributes['status']) ? $attributes['status'] : 0;
        $this->researchAndAnalysisService->update($id, $attributes);

        return redirect()->route('admin.research-and-analysis.index');
    }

    /**
     * @param $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function delete($id)
    {
        $this->researchAndAnalysisService->delete($id);

        return redirect()->route('admin.research-and-analysis.index');
    }

    /**
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
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateFeatured(Request $request)
    {
        $this->researchAndAnalysisService->updateFeatured($request->input('featured'));

        return redirect()->route('admin.research-and-analysis.index');
    }

    /**
     * @return \Illuminate\View\View
     */
    public function editHeadingText()
    {
        $textOptions = $this->optionService->get('research_and_analysis_page_text', true);

        return view('admin.research-and-analysis.edit-page-text', compact('textOptions'));
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateHeadingText(Request $request)
    {
        $options = $request->all();
        $this->optionService->update('research_and_analysis_page_text', $options, 'research_and_analysis');

        return redirect()->route('admin.research-and-analysis.index');
    }
}
