<?php


namespace App\Http\Services\Admin;


use App\Http\Models\ResearchAndAnalysis\ResearchAndAnalysis;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Cache;

class ResearchAndAnalysisService
{
    const FEATURED_LINKS_CACHE_KEY = 'research_and_analysis.featured';

    const PAGINATED_LINK_LISTS_CACHE_KEY = 'research_and_analysis.links.%s';

    const PAGINATED_LINK_LIST_LIMIT = 10;

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
     * Gets all links
     *
     * @return ResearchAndAnalysis[]|\Illuminate\Database\Eloquent\Collection
     */
    public function all()
    {
        return $this->researchAndAnalysis->all();
    }

    /**
     * Gets paginated list of links
     *
     * @param int $limit
     * @param bool $withFeatured
     * @return mixed
     */
    public function paginate($limit = 10, $withFeatured = false)
    {
        $query = $this->researchAndAnalysis->newQuery();

        if (!$withFeatured) {
            $query->whereNull('featured_index');
        }
        return $query->orderBy('updated_at', 'desc')->paginate($limit);
    }

    /**
     * Create new research link
     *
     * @param array $attributes
     * @return ResearchAndAnalysis
     */
    public function create(array $attributes)
    {
        $attributes['status'] = isset($attributes['status']) ? (int) $attributes['status'] : 0;
        $attributes['ignore_publication_day'] = array_get($attributes, 'ignore_publication_day') == 'on';
        $model = $this->researchAndAnalysis->create($attributes);
        $this->clearResearchLinksCache();

        return $model;
    }

    /**
     * Update research link
     *
     * @param $id
     * @param array $attributes
     * @return mixed
     */
    public function update($id, array $attributes)
    {
        $attributes['ignore_publication_day'] = array_get($attributes, 'ignore_publication_day') == 'on';

        $research = $this->researchAndAnalysis->find($id);
        $result = $research->update($attributes);
        $this->clearResearchLinksCache();

        return $result;
    }

    /**
     * Finds research by id
     *
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
     * Delete a research
     *
     * @param $id
     * @return bool
     */
    public function delete($id)
    {
        $research = $this->researchAndAnalysis->find($id);
        $result = $research->delete();
        $this->clearResearchLinksCache();

        return $result;
    }

    /**
     * Gets list of featured research items
     *
     * @return Collection
     */
    public function getFeatured()
    {
        return $this->researchAndAnalysis->whereNotNull('featured_at')->orderBy('featured_index')->limit(3)->get();
    }

    /**
     * Updates featured research items
     *
     * @param array $featuredAttributes
     *
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
        Cache::forget(self::FEATURED_LINKS_CACHE_KEY);

        return $models;
    }

    /**
     * Gets paginated list of links for front page
     *
     * @return LengthAwarePaginator
     */
    public function getLinks()
    {
        $page = Paginator::resolveCurrentPage('page');

        return Cache::remember(
            sprintf(self::PAGINATED_LINK_LISTS_CACHE_KEY, $page),
            Carbon::now()->addDay(1),
            function () {
                $query = $this->researchAndAnalysis->newQuery();

                return $query->orderByRaw('publication_date DESC NULLS LAST')->whereNull('featured_at')->paginate(self::PAGINATED_LINK_LIST_LIMIT);
            }
        );
    }

    /**
     * Get list of featured links for front page
     *
     * @return LengthAwarePaginator
     */
    public function getFeaturedLinks()
    {
        return Cache::remember(
            self::FEATURED_LINKS_CACHE_KEY,
            Carbon::now()->addDay(1),
            function () {
                return $this->researchAndAnalysis
                    ->whereNotNull('featured_at')
                    ->orderBy('featured_index')
                    ->limit(3)
                    ->get();
            }
        );
    }

    /**
     * Clear paginated list cache by iterating over all possible pages
     */
    protected function clearResearchLinksCache()
    {
        $pageCount = (int) ceil($this->researchAndAnalysis->whereNull('featured_at')->count() / self::PAGINATED_LINK_LIST_LIMIT);
        for ($index = 1; $index <= $pageCount; $index++) {
            Cache::forget(sprintf(self::PAGINATED_LINK_LISTS_CACHE_KEY, $index));
        }

        Cache::forget(self::FEATURED_LINKS_CACHE_KEY);
    }
}
