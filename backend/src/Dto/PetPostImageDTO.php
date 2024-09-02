<?php

namespace App\Dto;

use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Validator\Constraints as Assert;

class PetPostImageDTO
{
    #[Assert\NotNull(groups: ['pet_post_image:upload'])]
    #[Assert\File(maxSize: '5M', mimeTypes: ['image/jpeg', 'image/png'], groups: ['pet_post_image:upload'])]
    private $image;

    public function getImage(): ?UploadedFile
    {
        return $this->image;
    }

    public function setImage($image): static
    {
        $this->image = $image;

        return $this;
    }
}
