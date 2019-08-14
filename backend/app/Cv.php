<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cv extends Model
{
<<<<<<< Updated upstream
    //
=======
    public function formations(){
        return $this->belongsTo('App\Formation');
    }

    public function competences(){
        return $this->belongsTo('App\Competence');
    }

    public function experiences(){
        return $this->belongsTo('App\Experience');
    }

    public function contacts(){
        return $this->belongsTo('App\Contact');
    }
>>>>>>> Stashed changes
}
