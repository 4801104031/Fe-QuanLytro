<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCuDanTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cu_dan', function (Blueprint $table) {
            $table->id('ID_CuDan'); // ID tự tăng
            $table->string('Ho', 50); // Họ
            $table->string('Ten', 50); // Tên
            $table->date('Ngay_sinh'); // Ngày sinh
            $table->string('CMND_CCCD', 12)->unique(); // CMND/CCCD (duy nhất)
            $table->string('So_dien_thoai', 15); // Số điện thoại
            $table->unsignedBigInteger('phong_id'); // ID phòng (khóa ngoại)

            // Khóa ngoại liên kết với bảng phòng
            $table->foreign('phong_id')->references('ID_Phong')->on('phong')->onDelete('cascade');

            $table->timestamps(); // Thời gian tạo và cập nhật
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cu_dan');
    }
}
