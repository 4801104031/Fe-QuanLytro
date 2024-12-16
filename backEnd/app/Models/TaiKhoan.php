<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;

class TaiKhoan extends Model implements AuthenticatableContract, JWTSubject
{
    use HasFactory, Authenticatable;

    // Tên bảng trong cơ sở dữ liệu
    protected $table = 'tai_khoan';

    // Khóa chính
    protected $primaryKey = 'id';

    // Các cột có thể được gán giá trị hàng loạt
    protected $fillable = [
        'LoaiTaiKhoan',
        'Username',
        'Password',
        'CuDan_id',
    ];

    // Định nghĩa mối quan hệ với bảng `cu_dan`
    public function cuDan()
    {
        return $this->belongsTo(CuDan::class, 'CuDan_id', 'ID_CuDan');
    }

    /**
     * Lấy khóa định danh để lưu trữ trong JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey(); // Sử dụng khóa chính làm định danh
    }

    /**
     * Lấy thêm các claim (thông tin) tùy chỉnh để lưu trong JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function getAuthPassword()
    {
        return $this->Password; // Đảm bảo cột đúng tên với bảng
    }

    
}
