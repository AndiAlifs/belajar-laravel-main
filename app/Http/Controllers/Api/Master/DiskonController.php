<?php

namespace App\Http\Controllers\Api\Master;

use App\Http\Controllers\Api\User\UserController;
use App\Http\Controllers\Controller;
use App\Models\Master\DiskonModel;
use App\Models\Master\PromoModel;
use Illuminate\Http\Request;

class DiskonController extends Controller
{

    public function index()
    {   
        $allCustomer = $this->returnAllUniqueCustomer();
        $returnedData['customer'] = $allCustomer;

        return response()->json($returnedData);
    }   

    public function returnAllUniqueCustomer()
    {
        $returnedResult = [];
        $result = DiskonModel::select('id_user')->distinct()->get();
        foreach ($result as $r) {
            $nama = UserController::getUserFromId($r->id_user)->nama;
            $returnedResult[] = [
                'id_user' => $r->id_user,
                'nama' => $nama
            ];
        }

        return $returnedResult;
    }

    public function returnAllDiskonId()
    {
        $result = PromoModel::where('type', 'diskon')->get();
        $returnedResult = [];
        foreach ($result as $r) {
            $id_promo = $r->id_promo;
            $nama = PromoModel::select('nama')->where('id_promo', $id_promo)->first();
            $returnedResult[] = [
                'id_promo' => $id_promo,
                'nama' => $nama->nama
            ];
        }

        return response()->success($returnedResult, 'Berhasil mengambil data diskon');
    }

    public function returnAllAcquiredDiskon($id_user)
    {
        $result = DiskonModel::where('id_user', $id_user)->where('status',1)->get();
        $returnedResult = [];
        foreach ($result as $r) {
            $id_promo = $r->id_promo;
            $nama = PromoModel::select('nama')->where('id_promo', $id_promo)->first();
            $returnedResult[] = [
                'id_promo' => $id_promo,
                'nama' => $nama->nama
            ];
        }

        return response()->success($returnedResult, 'Berhasil mengambil data diskon');
    }

    public function updateStatusDiskon(Request $request)
    {
        $id_user = $request->id_user;
        $id_promo = $request->id_promo;
        $status = ($request->status == 'true' ? 1 : 0);

        $result = DiskonModel::firstorCreate([
            'id_user' => $id_user,
            'id_promo' => $id_promo
        ]);
        $result->status = $status;
        $result->save();

        return response()->success($result, 'Berhasil mengubah status diskon');
    }
}
