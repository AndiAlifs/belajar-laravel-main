<?php

namespace App\Http\Controllers\Api\Master;

use App\Http\Controllers\Api\User\UserController;
use App\Http\Controllers\Controller;
use App\Http\Resources\DiskonCollection;
use App\Models\Master\DiskonModel;
use App\Models\Master\PromoModel;
use Illuminate\Http\Request;

class DiskonController extends Controller
{

    public function index()
    {   
        $filter['nama'] = request()->get('nama')? request()->get('nama') : '%';
        $allCustomer = $this->returnAllUniqueCustomer($filter);
        
        return response()->success(new DiskonCollection($allCustomer), 'Berhasil mengambil data diskon');
    }   

    public function returnAllUniqueCustomer($filter)
    {
        $result = DiskonModel::getAllCustomer($filter);
        return $result;
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
