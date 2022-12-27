<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DiskonModel extends Model
{
    use HasFactory;

    protected $table = 'm_diskon';

    protected $primaryKey = 'id_diskon';

    public $timestamps = false;

    protected $guarded = [];
}
