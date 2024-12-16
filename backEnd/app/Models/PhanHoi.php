<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PhanHoi extends Model
{
    use HasFactory;

    // Tên bảng trong cơ sở dữ liệu
    protected $table = 'phan_hoi';

    // Khóa chính của bảng
    protected $primaryKey = 'id';

    // Các cột có thể được gán giá trị
    protected $fillable = [
        'NguoiGui',
        'Phong_id',
        'TieuDe',
        'NoiDung',
        'TrangThai',
    ];

    // Mối quan hệ đến bảng `phong`
    public function phong()
    {
        return $this->belongsTo(Phong::class, 'Phong_id', 'ID_Phong');
    }
}
