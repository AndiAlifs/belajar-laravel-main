<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class VoucherModel extends Model
{
    use HasFactory;

    protected $table = 'm_voucher';

    protected $primaryKey = 'id_voucher';

    protected $guarded = [];

    public $timestamps = false;
    
    public static function getAllCustomer()
    {
        $Othertable = 'm_user';
        $sql = "SELECT * FROM $Othertable";
        $result = DB::select($sql);
        return $result;
    }
}
