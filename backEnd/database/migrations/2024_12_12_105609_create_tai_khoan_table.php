<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTaiKhoanTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tai_khoan', function (Blueprint $table) {
            $table->id(); // ID tự tăng
            $table->string('LoaiTaiKhoan')->default('resident'); // Loại tài khoản (admin, resident,...)
            $table->string('Username')->unique(); // Tên tài khoản (username), đảm bảo duy nhất
            $table->string('Password'); // Mật khẩu
            $table->unsignedBigInteger('CuDan_id')->nullable(); // Liên kết với bảng cư dân
            $table->timestamps(); // Thời gian tạo và cập nhật

            // Khóa ngoại
            $table->foreign('CuDan_id')->references('ID_CuDan')->on('cu_dan')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tai_khoan');
    }
}
