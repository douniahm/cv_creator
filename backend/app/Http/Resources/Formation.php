<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Formation extends JsonResource
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
            'degree' => $this->degree,
            'school' => $this->school,
            'description' => $this->description,
        ];
    }
}
