<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExperiencesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('experience', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('cv_id');
<<<<<<< Updated upstream
            $table->foreign('cv_id')->references('id')->on('cv');
=======
            $table->foreign('cv_id')->references('id')->on('cv')->onDelete('cascade');
>>>>>>> Stashed changes
            $table->string('job_title');
            $table->string('company');
            $table->string('description');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('experience');
    }
}
