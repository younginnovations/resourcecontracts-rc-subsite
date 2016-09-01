<?php namespace App\Http\Models\Clip;

use Illuminate\Database\Eloquent\Model;

class Clip extends Model
{
    /**
     * @var string
     */
    protected $table = 'clips';
    /**
     * @var array
     */
    protected $fillable = ['key', 'annotations'];

    protected $casts = ['annotations' => 'json'];

}