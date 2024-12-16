<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DichVu extends Model
{
    use HasFactory;

    // Tên bảng trong cơ sở dữ liệu
    protected $table = 'dich_vu';
    protected $primaryKey = 'ID_DichVu';

    // Các cột có thể gán giá trị
    protected $fillable = [
        'Ten_dich_vu',
        'Gia',
        'Don_vi',
        'Loai_dich_vu',
    ];

    public function phongs()
    {
        return $this->belongsToMany(Phong::class, 'phong_dich_vu', 'dich_vu_id', 'phong_id')
                    ->withPivot('chi_so', 'ngay_ghi_nhan')
                    ->withTimestamps();
    }

}
