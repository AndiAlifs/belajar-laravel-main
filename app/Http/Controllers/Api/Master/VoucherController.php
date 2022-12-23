<?php

namespace App\Http\Controllers\Api\Master;

use App\Http\Controllers\Api\User\UserController;
use App\Http\Controllers\Controller;
use App\Models\Master\VoucherModel;
use Illuminate\Http\Request;

class VoucherController extends Controller
{
    
    public function returnAllUniqueCustomerId()
    {
        $result = VoucherModel::select('id_user')->distinct()->get();

        return $result;
    }

    public function index()
    {
        $allVoucher = VoucherModel::all();
        foreach ($allVoucher as $voucher) {
            $voucher['nama_cust'] = UserController::getUserFromId($voucher->id_user)->nama;
            $voucher['nama_promo'] = PromoController::getPromoById($voucher->id_promo)->nama;
        }

        return response()->success($allVoucher, 'Success');
    }
}
