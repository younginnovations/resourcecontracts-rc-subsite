<?php namespace App\Http\Models\Page;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Page
 * @package App\Http\Models\Page
 */
class Page extends Model
{
    /**
     * @var string
     */
    protected $table = 'pages';
    /**
     * @var array
     */
    protected $fillable = ['title', 'slug', 'content', 'country', 'version', 'version_no'];

    /**
     * @var array
     */
    protected $casts = ['title' => 'object', 'content' => 'object', 'version' => 'object'];

    /**
     *
     * @return void|bool
     */
    public static function boot()
    {
        parent::boot();
        static::creating(
            function ($page) {
                if (site()->isCountrySite()) {
                    $page->country = static::getDBKey();
                }

                return true;
            }
        );

        static::updating(
            function ($page) {
                if (site()->isCountrySite()) {
                    $page->country = static::getDBKey();
                }

                return true;
            }
        );

        static::deleting(
            function ($page) {
                if (site()->isCountrySite()) {
                    $page->country = static::getDBKey();
                }

                return true;
            }
        );
    }

    /**
     * Get Database Key
     *
     * @return string
     */
    static protected function getDBKey()
    {
        $country = strtolower(site()->getCountryCode());

        if (site()->isCategory('olc')) {
            $country = $country.'-'.'olc';
        }

        return $country;
    }

    /**
     * Get Page Title
     *
     * @return string
     */
    public function title()
    {
        $lang = app('translator')->getLocale();

        $title = isset($this->title->$lang) ? $this->title->$lang : $this->title->en;

        return $title;
    }

    /**
     * Get Page Content
     *
     * @return string
     */
    public function content($v = null)
    {
        $lang    = app('translator')->getLocale();
        if (isset($v)) {
            $content = isset($this->version->{$v}) ? (
            isset($this->version->{$v}->{$lang}) ?
                $this->version->{$v}->{$lang} :
                $this->version->{$v}->en
            ) : (
                'This version not available'
            );
        } else {
            $content = isset($this->content->$lang) ? $this->content->$lang : $this->content->en;
        }

        return $content;
    }

    /**
     * Country Scope
     *
     * @param $query
     *
     */
    public function scopeCountry($query)
    {
        if (site()->isCountrySite()) {
            return $query->where('country', static::getDBKey());
        }

        return $query;
    }

}
