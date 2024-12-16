<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HoaDonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('hoadon')->insert([
            [
                'phong_id' => 1,
                'Ten_hoa_don' => 'Hóa đơn tháng 01 - 2024', // Tên hóa đơn
                'TongCong' => 5000000,
                'TrangThai' => 'Mới',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'phong_id' => 2,
                'Ten_hoa_don' => 'Hóa đơn tháng 01 - 2024', // Tên hóa đơn
                'TongCong' => 5000000,
                'TrangThai' => 'Mới',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
