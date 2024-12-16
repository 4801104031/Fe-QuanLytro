<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoaiPhong extends Model
{
    use HasFactory;

    // Tên bảng trong cơ sở dữ liệu
    protected $table = 'loai_phong';
    protected $primaryKey = 'ID_LoaiPhong'; // Khóa chính là ID_LoaiPhong
    public $incrementing = true; // Nếu là auto-increment
    protected $keyType = 'int';

    // Các cột có thể gán giá trị (fillable)
    protected $fillable = [
        'Ten_loai_phong',
        'Dien_tich',
        'Gia_thue',
        'So_giuong_mac_dinh',
        'So_tu_lanh_mac_dinh',
        'So_dieu_hoa_mac_dinh',
    ];

    // Định nghĩa mối quan hệ với bảng Phong
    public function phongs()
    {
        return $this->hasMany(Phong::class, 'Loai_phong_id', 'ID_LoaiPhong');
    }
}
