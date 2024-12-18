<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth; // Thêm thư viện JWT
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        try {
            // Kiểm tra và lấy thông tin user từ JWT
            $user = JWTAuth::parseToken()->authenticate();

            // Kiểm tra vai trò của user
            if ($user && $user->LoaiTaiKhoan === 'admin') {
                return $next($request); // Cho phép request đi tiếp
            }

            // Trả về lỗi nếu không phải admin
            return response()->json(['message' => 'Forbidden: Bạn không có quyền truy cập.'], 403);
        } catch (\Exception $e) {
            // Xử lý lỗi nếu JWT không hợp lệ hoặc không tồn tại
            return response()->json(['message' => 'Unauthorized: Token không hợp lệ.'], 401);
        }
    }
}
