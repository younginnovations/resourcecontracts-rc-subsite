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

    public function scopeCountry($query)
    {
        $query->where('country', get_country('code'));
    }

    /**
     * Get FAQ Content
     *
     * @return string
     */
    public function faqContent()
    {
        $faq   = array_map('trim', explode("<hr />", $this->content()));
        $final = [];

        foreach ($faq as $k => $v):
            $text = explode("\r\n", $v);
            $a    = $text[0];
            unset($text[0]);
            $q       = join('', $text);
            $final[] = [
                'a' => $a,
                'q' => $q
            ];
        endforeach;

        return $final;
    }


}
