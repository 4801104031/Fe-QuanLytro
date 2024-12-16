<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PhanHoiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('phan_hoi')->insert([
            [
                'NguoiGui' => 'Nguyễn Văn A',
                'Phong_id' => 1,
                'TieuDe' => 'Phản ánh vệ sinh',
                'NoiDung' => 'Phòng chưa được dọn dẹp sạch sẽ.',
                'TrangThai' => 'Chưa xử lý',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'NguoiGui' => 'Trần Thị B',
                'Phong_id' => 1,
                'TieuDe' => 'Đề nghị sửa chữa',
                'NoiDung' => 'Đèn trong phòng bị hỏng.',
                'TrangThai' => 'Đang xử lý',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'NguoiGui' => 'Lê Văn C',
                'Phong_id' => 1,
                'TieuDe' => 'Phản hồi chất lượng',
                'NoiDung' => 'Dịch vụ khá tốt nhưng cần cải thiện wifi.',
                'TrangThai' => 'Đã xử lý',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
