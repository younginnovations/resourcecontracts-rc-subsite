<?php


namespace App\Http\Controllers\Admin;


use App\Http\Services\Admin\ResearchAndAnalysisService;
use Illuminate\Http\Request;
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
        $pages = $this->researchAndAnalysisService->all();
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
        $attritbutes = $request->all();
        $attritbutes['status'] = isset($attritbutes['status']) ? $attritbutes['status'] : 0;

        $this->researchAndAnalysisService->update($id, $request->all());

        return redirect()->route('admin.research-and-analysis.index');
    }

    public function delete($id)
    {
        $this->researchAndAnalysisService->delete($id);

        return redirect()->route('admin.research-and-analysis.index');
    }

    public function featured()
    {

    }
}