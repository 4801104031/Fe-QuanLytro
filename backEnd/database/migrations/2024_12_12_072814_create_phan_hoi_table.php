<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePhanHoiTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('phan_hoi', function (Blueprint $table) {
            $table->id(); // ID tự tăng
            $table->string('NguoiGui'); // Tên người gửi phản hồi
            $table->unsignedBigInteger('Phong_id')->nullable(); // ID Phòng, có thể null nếu không xác định
            $table->string('TieuDe'); // Tiêu đề phản hồi
            $table->text('NoiDung'); // Nội dung phản hồi
            $table->string('TrangThai')->default('Chưa xử lý'); // Trạng thái phản hồi
            $table->timestamps(); // created_at và updated_at

            // Định nghĩa khóa ngoại
            $table->foreign('Phong_id')->references('ID_Phong')->on('phong')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('phan_hoi');
    }
}
