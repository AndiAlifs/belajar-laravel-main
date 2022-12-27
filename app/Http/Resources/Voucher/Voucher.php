<?php

namespace App\Http\Resources\Voucher;

use Illuminate\Http\Resources\Json\JsonResource;

class Voucher extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id_voucher' => $this->id_voucher,
            'id_user' => $this->id_user,
            'id_promo' => $this->id_promo,
            'nama_cust' => $this->nama_cust,
            'nama_promo' => $this->nama_promo,
            'nominal' => $this->nominal,
            'status' => $this->status,
            'info_voucher' => $this->info_voucher,
            'periode_mulai' => $this->periode_mulai,
            'periode_selesai' => $this->periode_selesai,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
