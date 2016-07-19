<?php namespace App\Http\Services\Admin;

use App\Http\Models\Option\Option;

/**
 * Class OptionService
 * @package App\Http\Services\Admin
 */
class OptionService
{
    /**
     * @var Option
     */
    protected $option;

    /**
     * OptionService constructor.
     *
     * @param Option $option
     */
    public function __construct(Option $option)
    {
        $this->option = $option;
    }

    /**
     * Save Option
     *
     * @param      $key
     * @param      $value
     * @param null $group
     *
     * @return Option
     */
    public function update($key, $value, $group = null)
    {
        if (is_array($value) || is_object($value)) {
            $value = json_encode($value);
        }

        $option = $this->isKeyUnique($key);

        if (!$option) {
            return $this->option->where('key', $key)->update(['value' => $value, 'group' => $group]);
        }

        return $this->option->create(
            [
                'key'   => $key,
                'value' => $value,
                'group' => $group,
            ]
        );
    }

    /**
     * Get Option by key
     *
     * @param      $key
     * @param bool $array
     *
     * @return null|string
     */
    public function get($key, $array = false)
    {
        $option = $this->option->select('value')->where('key', $key)->first();

        if (empty($option)) {
            return null;
        }

        if ($this->isJson($option->value)) {
            return json_decode($option->value, $array);
        }

        return $option->value;
    }

    /**
     * Determine key is unique.
     *
     * @param $key
     *
     * @return bool
     */
    public function isKeyUnique($key)
    {
        $count = $this->option->where('key', $key)->count();

        return ($count > 0) ? false : true;
    }

    /**
     * Determine if string is json or not.
     *
     * @param $string
     *
     * @return bool
     */
    protected function isJson($string)
    {
        json_decode($string);

        return (json_last_error() == JSON_ERROR_NONE);
    }

    /**
     * Get Option by Group
     *
     * @param $group
     *
     * @return array
     */
    public function getByGroup($group)
    {
        $data  = $this->option->where('group', $group)->get();
        $group = new \stdClass();
        if (!empty($data)) {
            foreach ($data as $v) {
                $key = $v->key;

                if ($this->isJson($v->value)) {
                    $v->value = json_decode($v->value);
                }
                $group->$key = $v->value;
            }
        }

        return $group;
    }


    /**
     * write brief description
     *
     * @param $options
     * @param $group
     *
     * @return bool
     */
    public function updateGroup($options, $group)
    {
        foreach ($options as $key => $option) {
            $this->update($key, $option, $group);
        }

        return true;
    }

    /**
     * Get Links
     *
     * @return array
     */
    public function getLinks()
    {
        $options     = $this->get('links');
        $currentLang = app('translator')->getLocale();
        $links       = [];

        foreach ($options as $link) {
            $links           [] = [
                'title' => isset($link->title->$currentLang) ? $link->title->$currentLang : '',
                'url'   => isset($link->url->$currentLang) ? $link->url->$currentLang : '',
            ];
        }

        return $links;
    }

}
