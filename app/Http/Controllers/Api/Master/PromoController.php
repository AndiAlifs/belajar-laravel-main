<?php

namespace App\Http\Controllers\Api\Master;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Master\PromoModel;

class PromoController extends Controller
{
    public function getVoucherPromo()
    {
        $promo = PromoModel::where('type', 'voucher')->get();
        return $promo;
    }

    public function getDiscountPromo()
    {
        $promo = PromoModel::where('type', 'discount')->get();
        return $promo;
    }
}
