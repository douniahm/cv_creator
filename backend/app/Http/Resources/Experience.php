<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Experience extends JsonResource
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
            'job_title' => $this->job_title,
            'company' => $this->company,
            'description' => $this->description,
        ];
    }
}
