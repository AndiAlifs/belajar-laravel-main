<?php

namespace App\Http\Controllers\Api\Master;

use App\Http\Controllers\Api\User\UserController;
use App\Http\Controllers\Controller;
use App\Http\Resources\Voucher\Voucher;
use App\Http\Resources\Voucher\VoucherCollection;
use App\Models\Master\VoucherModel;
use App\Models\User\UserModel;
use Illuminate\Http\Request;

class VoucherController extends Controller
{

    public function index()
    {
        $allVoucher = VoucherModel::paginate(5);
        foreach ($allVoucher as $voucher) {
            $voucher['nama_cust'] = UserController::getUserFromId($voucher->id_user)->nama;
            $voucher['nama_promo'] = PromoController::getPromoById($voucher->id_promo)->nama;
        }

        return response()->success(new VoucherCollection($allVoucher), 'Success');
    }

    public function indexCustomer()
    {
        $allCustomer = UserModel::getAllCustomerNoPage();
        return response()->success($allCustomer, 'Success');
    }

    public function create(Request $request)
    {
        if ($request->model_id == 0) {
            $voucher = VoucherModel::create($request->except('model_id'));
        }
        if ($voucher) {
            return response()->success($voucher, 'Voucher Berhasil Ditambahkan');
        } else {
            return response()->error('Voucher Gagal Ditambahkan');
        }
    }

    public function delete($id_voucher)
    {
        $voucher = VoucherModel::find($id_voucher);
        if ($voucher->delete()) {
            return response()->success($voucher, 'Voucher Berhasil Dihapus');
        } else {
            return response()->error('Voucher Gagal Dihapus');
        }
    }

    public function show($id_voucher)
    {
        $voucher = VoucherModel::find($id_voucher);
        if ($voucher) {
            return response()->success(new Voucher($voucher), 'Voucher Berhasil Ditemukan');
        } else {
            return response()->error('Voucher Gagal Ditemukan');
        }
    }

    public function update(Request $request)
    {
        if ($request->model_id) {
            $id_voucher = $request->model_id;

            $voucher = VoucherModel::find($id_voucher);
            $status = $voucher->update($request->except('model_id'));

            if ($status) {
                return response()->success($voucher, 'Voucher Berhasil Diubah');
            } else {
                return response()->error('Voucher Gagal Diubah');
            }
        } else {
            return response()->error('Model ID tidak ditemukan');
        }
    }
}
