<?php namespace App\Http\Services;

use Illuminate\Support\Facades\File;

/**
 * Class Page
 * @package App\Http\Services
 */
Class PageService
{
    /**
     * @var string
     */
    protected $folder = 'page';

    /**
     * Get Page
     *
     * @param      $page
     * @param bool $array
     * @return null|object
     */
    public function get($page, $array = false)
    {
        $filePath = $this->filPath($page);

        if (File::exists($filePath)) {
            $page = File::get($filePath);

            return json_decode($page, $array);
        }

        return null;
    }

    /**
     * Save PAge
     * @param       $page
     * @param array $content
     * @return bool
     */
    public function save($page, array $content)
    {
        $pageContent = $this->get($page, true);

        if (!is_null($pageContent)) {
            $filePath = $this->filPath($page);
            $content  = array_merge($pageContent, $content);

            return File::put($filePath, json_encode($content));
        }

        return false;
    }

    /**
     * Get File Path
     *
     * @param $page
     * @return string
     */
    protected function filPath($page)
    {
        $path = sprintf('public/page/%s.json', $page);

        return base_path($path);
    }

}
