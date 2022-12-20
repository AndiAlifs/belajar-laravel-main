<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PromoModel extends Model
{
    use HasFactory;

    protected $table = 'm_promo';

    protected $primaryKey = 'id';

    public $timestamps = false;

    protected $guarded = [];
}
