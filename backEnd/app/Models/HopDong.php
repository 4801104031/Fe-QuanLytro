<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HopDong extends Model
{
    use HasFactory;

    // Tên bảng trong cơ sở dữ liệu
    protected $table = 'hop_dong';

    // Khóa chính của bảng
    protected $primaryKey = 'ID_HopDong'; // Định nghĩa cột chính là 'ID_HopDong'

    // Tự động tăng ID
    public $incrementing = true;

    // Loại dữ liệu của khóa chính
    protected $keyType = 'int';

    // Các trường có thể được fill vào bằng cách sử dụng Mass Assignment
    protected $fillable = [
        'phong_id',
        'cu_dan_id',
        'Loai_hop_dong',
        'Ngay_bat_dau',
        'Ngay_ket_thuc',
        'Hieu_luc',
    ];

    // Định nghĩa mối quan hệ với bảng Phòng
    public function phong()
    {
        return $this->belongsTo(Phong::class, 'phong_id', 'ID_Phong');
    }

    // Định nghĩa mối quan hệ với bảng Cư Dân
    public function cuDan()
    {
        return $this->belongsTo(CuDan::class, 'cu_dan_id');
    }
}
