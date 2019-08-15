<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Formation as FormationResource;
use App\Http\Resources\Competence as CompetenceResource;
use App\Http\Resources\Experience as ExperienceResource;
use App\Http\Resources\Contact as ContactResource;

class Cv extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'formations' => FormationResource::Collection($this->formations),
            'competences' => CompetenceResource::Collection($this->competences),
            'experiences' => ExperienceResource::Collection($this->experiences),
            'contacts' => ContactResource::Collection($this->contacts),
        ];
    }
}
