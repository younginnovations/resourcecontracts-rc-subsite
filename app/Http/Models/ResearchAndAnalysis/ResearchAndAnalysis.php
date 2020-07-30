<?php


namespace App\Http\Models\ResearchAndAnalysis;


use Illuminate\Database\Eloquent\Model;

class ResearchAndAnalysis extends Model
{
    protected $table = 'research_analysis';

    protected $fillable = ['title','url'];

    protected $casts = [
        'content' => 'object',
        'title'   => 'object'
    ];
}