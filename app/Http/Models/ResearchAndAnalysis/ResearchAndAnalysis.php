<?php


namespace App\Http\Models\ResearchAndAnalysis;


use Illuminate\Database\Eloquent\Model;

class ResearchAndAnalysis extends Model
{
    const STATUS_UNPUBLISHED = 0;
    const STATUS_PUBLISHED   = 1;
    const STATUS_FEATURED    = 2;

    protected $table = 'research_analysis';

    protected $fillable = ['title', 'content', 'slug', 'status'];

    protected $casts = [
        'content' => 'object',
        'title'   => 'object'
    ];
}