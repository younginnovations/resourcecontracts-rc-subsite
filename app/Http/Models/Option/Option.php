<?php namespace App\Http\Models\Option;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Option
 * @package App\Http\Models\Option
 */
class Option extends Model
{
    /**
     * @var string
     */
    protected $table = 'options';
    /**
     * @var array
     */
    protected $fillable = ['key', 'value', 'group', 'country'];
}
