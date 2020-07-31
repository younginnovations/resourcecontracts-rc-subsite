<?php


namespace App\Http\Services\Admin;


use App\Http\Models\ResearchAndAnalysis\ResearchAndAnalysis;
use Carbon\Carbon;

class ResearchAndAnalysisService
{
    /**
     * @var ResearchAndAnalysis
     */
    private $researchAndAnalysis;

    /**
     * ResearchAndAnalysisService constructor.
     * @param ResearchAndAnalysis $researchAndAnalysis
     */
    public function __construct(ResearchAndAnalysis $researchAndAnalysis)
    {
        $this->researchAndAnalysis = $researchAndAnalysis;
    }

    public function all()
    {
        return $this->researchAndAnalysis->all();
    }

    public function paginate()
    {
        return $this->researchAndAnalysis->paginate();
    }

    public function create(array $attributes)
    {
        $attributes['status'] = 0;
        return $this->researchAndAnalysis->create($attributes);
    }

    public function update($id, array $data)
    {
        $research = $this->researchAndAnalysis->find($id);
        return $research->update($data);
    }

    public function find($id)
    {
        return $this->researchAndAnalysis->findOrFail($id);
    }

    public function delete($id)
    {
        $research = $this->researchAndAnalysis->find($id);
        return $research->delete();
    }

    public function getFeatured()
    {
        return $this->researchAndAnalysis->whereNotNull('featured_at')->orderBy('featured_index')->limit(3)->get();
    }

    public function updateFeatured(array $featuredAttributes)
    {
        $ids = array_pluck($featuredAttributes, 'id');
        $this->researchAndAnalysis->whereNotNull('featured_at')->update(['featured_at' => null, 'featured_index' => null]);
        $models = $this->researchAndAnalysis->find($ids);
        foreach ($featuredAttributes as $featuredAttribute) {
            $model = $models->where('id', (int) $featuredAttribute['id'])->first();
            $model->update(['featured_at' => Carbon::now(), 'featured_index' => $featuredAttribute['featured_index']]);
        }

        return $models;
    }
}