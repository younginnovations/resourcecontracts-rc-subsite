<?php


namespace App\Http\Services\Admin;


use App\Http\Models\ResearchAndAnalysis\ResearchAndAnalysis;

class ResearchAndAnalysisService
{
    public function __construct()
    {
    }

    public function all()
    {
        return ResearchAndAnalysis::paginate();
    }

    public function create(array $attributes)
    {
        $attributes['slug'] = str_slug($attributes['title']['en']);
        $attributes['status'] = isset($attributes['status'])
            && in_array($attributes['status'], [ResearchAndAnalysis::STATUS_UNPUBLISHED,ResearchAndAnalysis::STATUS_PUBLISHED])
            ? $attributes['status'] : ResearchAndAnalysis::STATUS_UNPUBLISHED;
        return ResearchAndAnalysis::create($attributes);
    }
}