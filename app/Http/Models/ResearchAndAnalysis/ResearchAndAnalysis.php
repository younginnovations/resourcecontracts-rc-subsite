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
        return $this->ignore_publication_day ? $this->publication_date->format('F Y') : $this->publication_date->format('j F Y');
    }
}
