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
    protected $fillable = ['title', 'slug', 'content', 'country'];

    protected $casts = ['title' => 'object', 'content' => 'object'];

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
    public function content()
    {
        $lang    = app('translator')->getLocale();
        $content = isset($this->content->$lang) ? $this->content->$lang : $this->content->en;

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
            return $query->where('country', strtolower(site()->getCountryCode()));
        }

        return $query;
    }

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
                    $page->country = strtolower(site()->getCountryCode());
                }

                return true;
            }
        );

        static::updating(
            function ($page) {
                if (site()->isCountrySite()) {
                    $page->country = strtolower(site()->getCountryCode());
                }

                return true;
            }
        );

        static::deleting(
            function ($page) {
                if (site()->isCountrySite()) {
                    $page->country = strtolower(site()->getCountryCode());
                }

                return true;
            }
        );
    }

}
