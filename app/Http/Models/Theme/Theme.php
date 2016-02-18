<?php namespace App\Http\Models\Theme;

use Illuminate\Database\Eloquent\Model;

class Theme extends Model
{

    protected $table = 'settings';

    protected $fillable = ['option_key', 'option_value', 'group' , 'country'];

    /**
     * write brief description
     * @param $query
     */
    public function scopeCountry($query)
    {
        $query->where('country', get_country('code'));
    }



}
