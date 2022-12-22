<?php

namespace App\Http\Controllers\Api\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Helpers\User\UserHelper;
use App\Http\Resources\User\UserResource;
use App\Http\Resources\User\UserCollection;
use App\Http\Requests\User\CreateRequest;
use App\Http\Requests\User\UpdateRequest;
use App\Http\Resources\User\DetailResource;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    private $user;

    public function __construct()
    {
        $this->user = new UserHelper();
    }

    /**
     * Mengambil data user dilengkapi dengan pagination
     *
     * @author Wahyu Agung <wahyuagung26@email.com>
     */
    public function index(Request $request)
    {
        $filter = [
            'nama' => $request->nama ?? '',
            'email' => $request->email ?? '',
        ];
        $users = $this->user->getAll($filter, 5, $request->sort ?? '');

        return response()->success(new UserCollection($users));
    }

    /**
     * Membuat data user baru & disimpan ke tabel user_auth
     *
     * @author Wahyu Agung <wahyuagung26@email.com>
     */
    public function store(CreateRequest $request)
    {
        /**
         * Menampilkan pesan error ketika validasi gagal
         * pengaturan validasi bisa dilihat pada class app/Http/request/User/CreateRequest
         */
        if (isset($request->validator) && $request->validator->fails()) {
            return response()->failed($request->validator->errors());
        }

        $dataInput = $request->only(['email', 'nama', 'password', 'user_roles_id']);
        $foto64 = $request->fotoUrl;
        $dataInput['foto'] = $this->upload_foto($request->nama, $foto64);
        $dataUser = $this->user->create($dataInput);

        if (!$dataUser['status']) {
            return response()->failed($dataUser['error']);
        }

        return response()->success(new UserResource($dataUser['data']), 'Data user berhasil disimpan');
    }


    public function upload_foto($nama, $image_64)
    {
        $extension = explode('/', explode(':', substr($image_64, 0, strpos($image_64, ';')))[1])[1];   // .jpg .png .pdf
        $replace = substr($image_64, 0, strpos($image_64, ',') + 1);

        // find substring fro replace here eg: data:image/png;base64,
        $image = str_replace($replace, '', $image_64);
        $image = str_replace(' ', '+', $image);
        $nama = str_replace(' ', '-', $nama);
        $imageName = 'upload/foto_user/'.$nama.'.'. $extension;

        // delete if imagename exists
        if (file_exists(public_path(). '/' . $imageName)) {
            unlink(public_path(). '/' . $imageName);
        }

        file_put_contents(public_path(). '/' . $imageName, base64_decode($image));
        return $imageName;
    }

    /**
     * Menampilkan user secara spesifik dari tabel user_auth
     *
     * @author Wahyu Agung <wahyuagung26@email.com>
     */
    public function show($id)
    {
        $dataUser = $this->user->getById($id);

        if (empty($dataUser)) {
            return response()->failed(['Data user tidak ditemukan']);
        }

        return response()->success(new DetailResource($dataUser));
    }

    /**
     * Mengubah data user di tabel user_auth
     *
     * @author Wahyu Agung <wahyuagung26@email.com>
     */
    public function update(UpdateRequest $request)
    {
        /**
         * Menampilkan pesan error ketika validasi gagal
         * pengaturan validasi bisa dilihat pada class app/Http/request/User/UpdateRequest
         */
        if (isset($request->validator) && $request->validator->fails()) {
            return response()->failed($request->validator->errors());
        }

        $dataInput = $request->only(['email', 'nama', 'password', 'id', 'user_roles_id']);
        $foto64 = $request->fotoUrl;
        $dataInput['foto'] = $this->upload_foto($request->nama, $foto64);
        $dataUser = $this->user->update($dataInput, $dataInput['id']);

        if (!$dataUser['status']) {
            return response()->failed($dataUser['error']);
        }

        return response()->success(new UserResource($dataUser['data']), 'Data user berhasil disimpan');
    }

    /**
     * Soft delete data user
     *
     * @author Wahyu Agung <wahyuagung26@email.com>
     */
    public function destroy($id)
    {
        $dataUser = $this->user->delete($id);

        if (!$dataUser) {
            return response()->failed(['Mohon maaf data pengguna tidak ditemukan']);
        }

        return response()->success($dataUser, 'Data user telah dihapus');
    }

    public static function getUserFromId($id)
    {
        $table = 'm_user';

        $data = DB::table($table)
            ->where('id_user', $id)
            ->first();

        return $data;
    }
}
