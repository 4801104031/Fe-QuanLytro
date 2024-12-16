<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HopDongSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('hop_dong')->insert([
            [
                'phong_id' => 1,
                'cu_dan_id' => 1,
                'Loai_hop_dong' => 'Công ty',
                'Ngay_bat_dau' => '2024-01-31',
                'Ngay_ket_thuc' => '2024-03-01',
                'Hieu_luc' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'phong_id' => 1,
                'cu_dan_id' => 1,
                'Loai_hop_dong' => 'Cá nhân',
                'Ngay_bat_dau' => '2024-02-01',
                'Ngay_ket_thuc' => '2024-04-01',
                'Hieu_luc' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
