<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TaiKhoanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tai_khoan')->insert([
            [
                'LoaiTaiKhoan' => 'admin',
                'Username' => 'admin',
                'Password' => bcrypt('admin'), // Mã hóa mật khẩu
                'CuDan_id' => null, // Tài khoản admin không liên kết cư dân
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'LoaiTaiKhoan' => 'resident',
                'Username' => 'user',
                'Password' => bcrypt('user'), // Mã hóa mật khẩu
                'CuDan_id' => null, // Liên kết đến cư dân với ID 1
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
