<?php


namespace App\Http\Models\ResearchAndAnalysis;


use Illuminate\Database\Eloquent\Model;

class ResearchAndAnalysis extends Model
{
    protected $table = 'research_analysis';

    protected $fillable = ['title','url', 'featured_index' , 'featured_at', 'publication_date', 'ignore_publication_day'];

    protected $casts = [
        'content' => 'object',
        'title'   => 'object',
        'publication_date' => 'date'
    ];

    /**
     * Format publication date
     *
     * @return string
     */
    public function getPublicationDate()
    {
        if (empty($this->publication_date)) {
            return '';
        }
        $trans = trans('codelist/month');

        if($this->ignore_publication_day) {
            $date_arr = explode(" ", $this->publication_date->format('F Y'));
            $translated_month = $trans[$date_arr[0]];

            return $translated_month." ".$date_arr[1];
        }

        $date_arr = explode(" ", $this->publication_date->format('j F Y'));
        $translated_month = $trans[$date_arr[1]];

        return $date_arr[0]." ".$translated_month." ".$date_arr[2];
    }
}
