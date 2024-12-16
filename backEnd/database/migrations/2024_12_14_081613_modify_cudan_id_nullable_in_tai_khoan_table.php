<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyCudanIdNullableInTaiKhoanTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tai_khoan', function (Blueprint $table) {
            $table->unsignedBigInteger('CuDan_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tai_khoan', function (Blueprint $table) {
            $table->unsignedBigInteger('CuDan_id')->nullable(false)->change();
        });
    }
}
