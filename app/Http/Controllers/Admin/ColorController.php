<?php namespace App\Http\Controllers\Admin;

use Laravel\Lumen\Routing\Controller as BaseController;

/**
 * Class ImageController
 * @package App\Http\Controllers\Admin
 */
class ColorController extends BaseController
{
    public function __construct()
    {
        $this->middleware('user');

    }

    /**
     * Image Manage Page
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
        return view('admin.color.index');
    }


}
