<?php namespace App\Http\Controllers\Admin;

use App\Http\Services\Admin\PartnerService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Laravel\Lumen\Routing\Controller as BaseController;

/**
 * Class PartnerController
 * @package App\Http\Controllers\Admin
 */
class PartnerController extends BaseController
{
    /**
     * @var PartnerService
     */
    protected $partner;

    /**
     * @param PartnerService $partner
     */
    public function __construct(PartnerService $partner)
    {
        $this->middleware('user');
        $this->partner = $partner;
    }

    /**
     * Partner Manage Page
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
        $partners = $this->partner->all();

        return view('admin.partner.index', compact('partners'));
    }

    /**
     * Partner Add Page
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('admin.partner.create');
    }

    /**
     * Upload Partner
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'link'  => 'required|url',
                'image' => 'required|image',
            ]
        );

        if ($validator->fails()) {
            return redirect()->back()
                             ->with('error', join('<br/>', $validator->errors()->all()))
                             ->withInput();
        }

        try {
            $this->partner->add($request->input('link'), 'image');

            return redirect()->back()->with('success', 'Partner successfully added.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage())->withInput();
        }
    }

    /**
     * Delete Partner
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function delete(Request $request)
    {
        if ($this->partner->delete($request->input('id'))) {
            return redirect()->back()->with('success', 'Partner successfully deleted.');
        }

        return redirect()->back()->with('success', 'Partner could not be deleted.');
    }
}