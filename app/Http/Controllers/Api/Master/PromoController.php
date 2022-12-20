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

    public function getPromoById($id)
    {
        $promo = PromoModel::find($id);
        return $promo;
    }

    public function createPromo(Request $request)
    {
        $promo = PromoModel::create($request->all());
        if ($promo) {
            return response()->json([
                'status' => 'success',
                'message' => 'Promo berhasil ditambahkan',
                'data' => $promo
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Promo gagal ditambahkan',
                'data' => $promo
            ], 400);
        }
    }
}
