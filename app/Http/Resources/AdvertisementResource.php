<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AdvertisementResource extends JsonResource
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
            'body' => $this->body,
            'img' => $this->img,
            'priority' => $this->priority,
            'title' => $this->title,
            'user_id' => $this->user_id,
            'rubrics' => $this->rubrics->pluck('id'),
            'bids' => $this->bids
        ];
    }
}
