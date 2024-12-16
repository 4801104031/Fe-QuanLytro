<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CuDanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('cu_dan')->insert([
            [
                'Ho' => 'Nguyễn',
                'Ten' => 'Thắng',
                'Ngay_sinh' => '2024-01-02',
                'CMND_CCCD' => '000000000',
                'So_dien_thoai' => '0818358449',
                'phong_id' => 1, // Liên kết tới phòng 1
            ],
        ]);
    }
}
