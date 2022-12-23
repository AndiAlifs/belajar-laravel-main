<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VoucherModel extends Model
{
    use HasFactory;

    protected $table = 'm_voucher';

    protected $primaryKey = 'id_voucher';

    protected $guarded = [];

    public $timestamps = false;
}
