<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cv extends Model
{
    public function user(){
        return $this->belongsTo('App\User');
    }
    public function formations(){
        return $this->hasMany('App\Formation');
    }

    public function competences(){
        return $this->hasMany('App\Competence');
    }

    public function experiences(){
        return $this->hasMany('App\Experience');
    }

    public function contact(){
        return $this->hasOne('App\Contact');
    }
}
