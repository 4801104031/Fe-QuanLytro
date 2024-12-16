<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
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
        // Kiểm tra nếu người dùng đăng nhập và có vai trò admin
        if (Auth::check() && Auth::user()->LoaiTaiKhoan === 'admin') {
            return $next($request);
        }

        // Nếu không phải admin, trả về lỗi 403 (Forbidden)
        return response()->json(['message' => 'Forbidden'], 403);
    }
}
