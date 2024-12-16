<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PhongDichVu extends Model
{
    use HasFactory;

    protected $table = 'phong_dich_vu';

    protected $fillable = [
        'phong_id',
        'dich_vu_id',
        'chi_so',
        'ngay_ghi_nhan',
    ];

    public function phong()
    {
        return $this->belongsTo(Phong::class, 'phong_id', 'ID_Phong');
    }

    public function dichVu()
    {
        return $this->belongsTo(DichVu::class, 'dich_vu_id', 'ID_DichVu');
    }
}
