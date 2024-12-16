<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DichVuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('dich_vu')->insert([
            [
                'Ten_dich_vu' => 'Điện',
                'Gia' => 3500,
                'Don_vi' => 'kilowatt-hour (kWh)',
                'Loai_dich_vu' => 'Mặc định',
            ],
            [
                'Ten_dich_vu' => 'Vệ sinh riêng',
                'Gia' => 100000,
                'Don_vi' => 'phòng/tháng',
                'Loai_dich_vu' => 'Tùy chọn',
            ],
            [
                'Ten_dich_vu' => 'Rác thải',
                'Gia' => 20000,
                'Don_vi' => 'người/tháng',
                'Loai_dich_vu' => 'Mặc định',
            ],
            [
                'Ten_dich_vu' => 'Nước',
                'Gia' => 20000,
                'Don_vi' => 'mét khối',
                'Loai_dich_vu' => 'Mặc định',
            ],
        ]);
    }
}
