<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Phong extends Model
{
    use HasFactory;

    // Tên bảng trong cơ sở dữ liệu
    protected $table = 'phong';
    protected $primaryKey = 'ID_Phong'; // Tên cột khóa chính
    public $incrementing = true; // Nếu là auto-increment
    protected $keyType = 'int';

    // Các cột có thể gán giá trị (fillable)
    protected $fillable = [
        'Loai_phong_id',
        'So_phong',
        'Trang_thai',
        'So_giuong',
        'So_tu_lanh',
        'So_dieu_hoa',
    ];

    // Định nghĩa mối quan hệ với bảng LoaiPhong
    public function loaiPhong()
    {
        return $this->belongsTo(LoaiPhong::class, 'Loai_phong_id', 'ID_LoaiPhong');
    }

    public function dichVus()
    {
        return $this->belongsToMany(DichVu::class, 'phong_dich_vu', 'phong_id', 'dich_vu_id')
                    ->withPivot('chi_so', 'ngay_ghi_nhan')
                    ->withTimestamps();
    }

    public function hopDongs()
    {
        return $this->hasMany(HopDong::class, 'phong_id', 'ID_Phong');
    }

    public function hoaDons()
    {
        return $this->hasMany(HoaDon::class, 'phong_id', 'ID_Phong');
    }
}
