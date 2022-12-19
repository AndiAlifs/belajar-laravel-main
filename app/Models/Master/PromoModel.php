<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PromoModel extends Model
{
    use HasFactory;

    protected $table = 'm_promo';

    protected $guarded = [];

    public function getVoucherPromo()
    {
        $promo = $this->where('type', 'voucher')->get();
        return $promo;
    }

    public function getDiscountPromo()
    {
        $promo = $this->where('type', 'diskon')->get();
        return $promo;
    }
}
