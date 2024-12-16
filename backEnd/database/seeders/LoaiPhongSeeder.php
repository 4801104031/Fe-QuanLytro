<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LoaiPhongSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('loai_phong')->insert([
            [
                'Ten_loai_phong' => 'VIP',
                'Dien_tich' => 40.0,
                'Gia_thue' => 5000000,
                'So_giuong_mac_dinh' => 2,
                'So_tu_lanh_mac_dinh' => 1,
                'So_dieu_hoa_mac_dinh' => 1,
            ],
            [
                'Ten_loai_phong' => 'LUX',
                'Dien_tich' => 25.0,
                'Gia_thue' => 3000000,
                'So_giuong_mac_dinh' => 2,
                'So_tu_lanh_mac_dinh' => 1,
                'So_dieu_hoa_mac_dinh' => 1,
            ],
            [
                'Ten_loai_phong' => 'STA',
                'Dien_tich' => 20.0,
                'Gia_thue' => 2000000,
                'So_giuong_mac_dinh' => 2,
                'So_tu_lanh_mac_dinh' => 0,
                'So_dieu_hoa_mac_dinh' => 1,
            ],
        ]);
    }
}
