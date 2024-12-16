<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHoadonTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hoadon', function (Blueprint $table) {
            $table->id('ID_HoaDon'); // ID hóa đơn
            $table->string('Ten_hoa_don'); // Tên hóa đơn
            $table->unsignedBigInteger('phong_id'); // Khóa ngoại đến bảng phòng
            $table->date('ThoiGian')->default(now());
            $table->decimal('TongCong', 15, 2); // Tổng cộng
            $table->string('TrangThai')->default('Mới'); // Trạng thái hóa đơn (Mới, Đã thanh toán,...)
            $table->timestamps(); // created_at và updated_at

            // Khóa ngoại
            $table->foreign('phong_id')->references('ID_Phong')->on('phong')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('hoadon');
    }
}
