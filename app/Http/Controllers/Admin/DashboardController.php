<?php namespace App\Http\Controllers\Admin;

use Laravel\Lumen\Routing\Controller as BaseController;

/**
 * Class DashboardController
 * @package App\Http\Controllers\Admin
 */
class DashboardController extends BaseController
{

    public function __construct()
    {
        $this->middleware('user');
    }

    /**
     * Dashboard Page
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
        return view('admin.dashboard.index');
    }
}
