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
        return view('admin.research-and-analysis.index' , compact('pages'));
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
        $this->researchAndAnalysisService->create($request->all());

        return redirect()->route('admin.research-and-analysis.index');
    }

    public function edit()
    {

    }

    public function update()
    {

    }

    public function delete()
    {

    }
}