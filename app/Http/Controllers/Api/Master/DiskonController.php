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
        $returnedResult = [];
        $allCustomer = $this->returnAllUniqueCustomerId();

        foreach ($allCustomer as $custID) {
            $id_user = $custID->id_user;
            $userName = UserController::getUserFromId($id_user)->nama;
            $allDiskon = $this->returnAllAcquiredDiskon($id_user);
            
            $returnedResult[] = [
                'id_user' => $id_user,
                'nama' => $userName,
                'diskon' => $allDiskon
            ];
        }

        $allAvailableDiskon = $this->returnAllUniqueDiskonId();

        $returnedData['customer'] = $returnedResult;
        $returnedData['diskon'] = $allAvailableDiskon;

        return response()->json($returnedData);
    }   

    public function returnAllUniqueCustomerId()
    {
        $result = DiskonModel::select('id_user')->distinct()->get();

        return $result;
    }

    public function returnAllUniqueDiskonId()
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

        return $returnedResult;
    }

    public function returnAllAcquiredDiskon($id_user)
    {
        $result = DiskonModel::where('id_user', $id_user)->get();
        $returnedResult = [];
        foreach ($result as $r) {
            $id_promo = $r->id_promo;
            $nama = PromoModel::select('nama')->where('id_promo', $id_promo)->first();
            $returnedResult[] = [
                'id_promo' => $id_promo,
                'nama' => $nama->nama
            ];
        }

        return $returnedResult;
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
