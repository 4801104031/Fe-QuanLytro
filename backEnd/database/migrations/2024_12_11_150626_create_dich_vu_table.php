<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDichVuTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dich_vu', function (Blueprint $table) {
            $table->id('ID_DichVu');                // Khóa chính
            $table->string('Ten_dich_vu', 100);     // Tên dịch vụ
            $table->decimal('Gia', 15, 2);          // Giá (VNĐ)
            $table->string('Don_vi', 50);           // Đơn vị tính
            $table->string('Loai_dich_vu', 50);     // Loại dịch vụ (Mặc định/Tùy chọn)
            $table->timestamps();                  // created_at và updated_at
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dich_vu');
    }
}
