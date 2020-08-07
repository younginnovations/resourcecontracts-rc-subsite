<?php


namespace App\Http\Services\Admin;


use App\Http\Models\ResearchAndAnalysis\ResearchAndAnalysis;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;

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

    /**
     * @return ResearchAndAnalysis[]|\Illuminate\Database\Eloquent\Collection
     */
    public function all()
    {
        return $this->researchAndAnalysis->all();
    }

    /**
     * @return mixed
     */
    public function paginate()
    {
        return $this->researchAndAnalysis->whereNull('featured_index')->orderBy('updated_at','desc')->paginate();
    }

    /**
     * @param array $attributes
     * @return ResearchAndAnalysis
     */
    public function create(array $attributes)
    {
        $attributes['status'] = 0;
        return $this->researchAndAnalysis->create($attributes);
    }

    /**
     * @param $id
     * @param array $data
     * @return mixed
     */
    public function update($id, array $data)
    {
        $research = $this->researchAndAnalysis->find($id);
        return $research->update($data);
    }

    /**
     * @param $id
     * @return ResearchAndAnalysis
     *
     * @throws ModelNotFoundException
     */
    public function find($id)
    {
        return $this->researchAndAnalysis->findOrFail($id);
    }

    /**
     * @param $id
     * @return bool
     */
    public function delete($id)
    {
        $research = $this->researchAndAnalysis->find($id);
        return $research->delete();
    }

    /**
     * @return Collection
     */
    public function getFeatured()
    {
        return $this->researchAndAnalysis->whereNotNull('featured_at')->orderBy('featured_index')->limit(3)->get();
    }

    /**
     * @param array $featuredAttributes
     * @return Collection
     */
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
