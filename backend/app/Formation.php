<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Formation extends Model
{
<<<<<<< Updated upstream
    //
=======
    public function cv(){
        return $this->belongsTo('App\Cv');
    }
>>>>>>> Stashed changes
}
