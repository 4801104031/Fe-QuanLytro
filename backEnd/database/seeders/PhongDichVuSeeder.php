<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PhongDichVuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('phong_dich_vu')->insert([
            [
                'phong_id' => 1,
                'dich_vu_id' => 1, // Điện
                'chi_so' => 120,
                'ngay_ghi_nhan' => '2024-01-01',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'phong_id' => 1,
                'dich_vu_id' => 2, // Vệ sinh riêng
                'chi_so' => null,
                'ngay_ghi_nhan' => '2024-01-01',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'phong_id' => 2,
                'dich_vu_id' => 3, // Rác thải
                'chi_so' => null,
                'ngay_ghi_nhan' => '2024-01-01',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'phong_id' => 2,
                'dich_vu_id' => 4, // Nước
                'chi_so' => 50,
                'ngay_ghi_nhan' => '2024-01-01',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

