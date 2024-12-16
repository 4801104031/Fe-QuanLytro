<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PhongSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('phong')->insert([
            [
                'Loai_phong_id' => 1, // ID loại phòng 'VIP'
                'So_phong' => 1,
                'Trang_thai' => 'Trống',
                'So_giuong' => 2,
                'So_tu_lanh' => 1,
                'So_dieu_hoa' => 1,
            ],
            [
                'Loai_phong_id' => 3, // ID loại phòng 'STA'
                'So_phong' => 22,
                'Trang_thai' => 'Trống',
                'So_giuong' => 2,
                'So_tu_lanh' => 0,
                'So_dieu_hoa' => 1,
            ],
        ]);
    }
}
