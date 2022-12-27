<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class DiskonModel extends Model
{
    use HasFactory;

    protected $table = 'm_diskon';

    protected $primaryKey = 'id_diskon';


    public $timestamps = false;

    protected $guarded = [];

    public static function getAllCustomer($filter,$paginate = 5)
    {   
        return DB::table('m_user')->where('nama','like','%'.$filter['nama'].'%')->paginate($paginate);
    }
}
