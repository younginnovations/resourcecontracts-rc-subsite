<?php namespace App\Http\Services\Admin;

use App\Http\Models\Option\Option;
use Illuminate\Support\Facades\Cache;

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
     * @var int
     */
    protected $cacheDuration;

    /**
     * OptionService constructor.
     *
     * @param Option $option
     */
    public function __construct(Option $option)
    {
        $this->option        = $option;
        $this->cacheDuration = 24 * 60 * 60;
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
            $update = $this->option->where('key', $key)->update(
                ['value' => $value, 'group' => $group]
            );
            Cache::forget($key);

            return $update;
        }
        Cache::forget($group);

        return $this->option->create(
            [
                'key'   => $key,
                'value' => $value,
                'group' => $group,
            ]
        );
    }

    /**
     * Save Option
     *
     * @param      $key
     * @param      $value
     * @param null $group
     * @param null $country_code
     *
     * @return Option
     */
    public function updateCountry($key, $value, $group = null, $country_code = null)
    {
        if (is_array($value) || is_object($value)) {
            $value = json_encode($value);
        }

        $option = $this->isCountryKeyUnique($key, $country_code);

        if (!$option) {
            $where_attr = ['key' => $key, 'country' => $country_code];
            $update_val = ['value' => $value, 'group' => $group, 'country' => $country_code];
            $update     = $this->option->where($where_attr)->update($update_val);
            Cache::forget($key);

            return $update;
        }
        Cache::forget($group);

        return $this->option->create(
            [
                'key'     => $key,
                'value'   => $value,
                'group'   => $group,
                'country' => $country_code,
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
        $option = Cache::remember(
            $key,
            $this->cacheDuration,
            function () use ($key) {
                return $this->option->select('value')->where('key', $key)->first();
            }
        );

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
     * Determine country key is unique.
     *
     * @param $key
     * @param $country_code
     *
     * @return bool
     */
    public function isCountryKeyUnique($key, $country_code)
    {
        $count = $this->option->where(['key' => $key, 'country' => $country_code])->count();

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
        $data = Cache::remember(
            $group,
            $this->cacheDuration,
            function () use ($group) {
                return $data = $this->option->where('group', $group)->get();
            }
        );

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
     * Get Option by Group
     *
     * @param      $group
     * @param      $country_code
     *
     * @return \stdClass
     */
    public function getByCountryGroup($group, $country_code)
    {
        $cache_key = "$group-$country_code";
        $data      = Cache::remember(
            $cache_key,
            $this->cacheDuration,
            function () use ($group, $country_code) {
                $homepage_text = $this->option->where(['group' => $group, 'country' => $country_code])->get();
                $footer_text   = $this->option->where(['group' => $group, 'key' => 'footer_text'])->get();

                return $homepage_text->merge($footer_text);
            }
        );

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
     * Update option by Group
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

        Cache::forget($group);

        return true;
    }

    /**
     * Update country option by Group
     *
     * @param $options
     * @param $group
     * @param $country_code
     *
     * @return bool
     */
    public function updateCountryGroup($options, $group, $country_code)
    {
        foreach ($options as $key => $option) {
            $this->updateCountry($key, $option, $group, $country_code);
        }

        $cache_key = "$group-$country_code";

        Cache::forget($cache_key);

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
        if (!is_array($options)) {
            return $links;
        }
        foreach ($options as $link) {
            $links           [] = [
                'title' => isset($link->title->$currentLang) ? $link->title->$currentLang : '',
                'url'   => isset($link->url->$currentLang) ? $link->url->$currentLang : '',
            ];
        }

        return $links;
    }

}
