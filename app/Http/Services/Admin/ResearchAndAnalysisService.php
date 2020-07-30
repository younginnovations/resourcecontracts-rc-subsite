<?php


namespace App\Http\Services\Admin;


use App\Http\Models\ResearchAndAnalysis\ResearchAndAnalysis;

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
}