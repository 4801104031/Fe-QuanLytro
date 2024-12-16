<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CuDan extends Model
{
    use HasFactory;

    // Tên bảng trong cơ sở dữ liệu
    protected $table = 'cu_dan';

    // Khóa chính của bảng
    protected $primaryKey = 'ID_CuDan';

    // Các cột có thể được gán hàng loạt
    protected $fillable = [
        'Ho',
        'Ten',
        'Ngay_sinh',
        'CMND_CCCD',
        'So_dien_thoai',
        'phong_id',
    ];

    // Định nghĩa quan hệ với bảng `phong`
    public function phong()
    {
        return $this->belongsTo(Phong::class, 'phong_id', 'ID_Phong');
    }

    public function taiKhoan()
    {
        return $this->hasOne(TaiKhoan::class, 'CuDan_id', 'ID_CuDan');
    }

    public function hopDongs()
    {
        return $this->hasMany(HopDong::class, 'CuDan_id', 'ID_CuDan');
    }

}
