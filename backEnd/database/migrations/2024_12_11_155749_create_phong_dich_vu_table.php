<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePhongDichVuTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('phong_dich_vu', function (Blueprint $table) {
            $table->id(); // ID tự tăng
            $table->unsignedBigInteger('phong_id'); // Khóa ngoại đến bảng phòng
            $table->unsignedBigInteger('dich_vu_id'); // Khóa ngoại đến bảng dịch vụ
            $table->integer('chi_so')->nullable(); // Chỉ số sử dụng dịch vụ (nếu có)
            $table->date('ngay_ghi_nhan')->nullable(); // Ngày ghi nhận chỉ số

            // Định nghĩa khóa ngoại
            $table->foreign('phong_id')->references('ID_Phong')->on('phong')->onDelete('cascade');
            $table->foreign('dich_vu_id')->references('ID_DichVu')->on('dich_vu')->onDelete('cascade');

            $table->timestamps(); // created_at và updated_at
        });
    }

    

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('phong_dich_vu');
    }
}

