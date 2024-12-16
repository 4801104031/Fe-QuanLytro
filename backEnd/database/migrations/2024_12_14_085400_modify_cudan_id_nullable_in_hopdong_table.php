<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyCudanIdNullableInHopdongTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('hop_dong', function (Blueprint $table) {
            // Thay đổi cột `cu_dan_id` để cho phép NULL
            $table->unsignedBigInteger('cu_dan_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('hop_dong', function (Blueprint $table) {
            // Thay đổi cột `cu_dan_id` trở về không cho phép NULL
            $table->unsignedBigInteger('cu_dan_id')->nullable(false)->change();
        });
    }
}
