<?php


namespace App\Http\Controllers\Admin;


use App\Http\Services\Admin\ResearchAndAnalysisService;
use Illuminate\Contracts\Validation\ValidationException;
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
     * ResearchAndAnalysisController constructor.
     * @param ResearchAndAnalysisService $researchAndAnalysisService
     */
    public function __construct(ResearchAndAnalysisService $researchAndAnalysisService)
    {
        $this->researchAndAnalysisService = $researchAndAnalysisService;
        $this->middleware('user');
    }

    /**
     * @return \Illuminate\View\View
     */
    public function index()
    {
        $pages = $this->researchAndAnalysisService->paginate();
        return view('admin.research-and-analysis.index', compact('pages'));
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
        /* @var \Illuminate\Validation\Validator $validator*/
        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'url'   => 'required|url'
        ]);
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
        $attributes = $request->all();
        $attributes['status'] = isset($attributes['status']) ? (int) $attributes['status'] : 0;
        $this->researchAndAnalysisService->create($request->all());

        return redirect()->route('admin.research-and-analysis.index');
    }

    public function edit($id)
    {
        $research = $this->researchAndAnalysisService->find($id);

        return view('admin.research-and-analysis.edit', compact('research'));
    }

    public function update(Request $request, $id)
    {
        $attributes = $request->all();
        $attributes['status'] = isset($attributes['status']) ? $attributes['status'] : 0;

        $this->researchAndAnalysisService->update($id, $attributes);

        return redirect()->route('admin.research-and-analysis.index');
    }

    public function delete($id)
    {
        $this->researchAndAnalysisService->delete($id);

        return redirect()->route('admin.research-and-analysis.index');
    }

    public function getFeatured()
    {
        return view('admin.research-and-analysis.edit-featured', [
            'featured' => $this->researchAndAnalysisService->getFeatured(),
            'researches' => $this->researchAndAnalysisService->all()
        ]);
    }

    public function updateFeatured(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'featured' => 'array',
            'featured.*.id' => 'required|integer|exists:research_analysis,id',
            'featured.*.featured_index' => 'required|integer|in:' . join(',', [1,2,3])
        ]);
//        if ($validator->fails()) {
//            return redirect()->back()->withErrors($validator);
//        }

        $this->researchAndAnalysisService->updateFeatured($request->input('featured'));

        return redirect()->route('admin.research-and-analysis.index');
    }
}