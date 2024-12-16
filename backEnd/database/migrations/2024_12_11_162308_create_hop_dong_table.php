<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHopDongTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hop_dong', function (Blueprint $table) {
            $table->id('ID_HopDong');
            $table->unsignedBigInteger('phong_id'); // ID Phòng
            $table->unsignedBigInteger('cu_dan_id'); // ID Cư Dân
            $table->string('Loai_hop_dong'); // Loại hợp đồng
            $table->date('Ngay_bat_dau'); // Ngày bắt đầu
            $table->date('Ngay_ket_thuc'); // Ngày kết thúc
            $table->boolean('Hieu_luc')->default(true); // Hiệu lực
            $table->timestamps();

            // Khóa ngoại
            $table->foreign('phong_id')->references('ID_Phong')->on('phong')->onDelete('cascade');
            $table->foreign('cu_dan_id')->references('ID_CuDan')->on('cu_dan')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('hop_dong');
    }
}
