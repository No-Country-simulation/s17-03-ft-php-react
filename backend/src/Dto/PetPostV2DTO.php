<?php

namespace App\Dto;

use Symfony\Component\Validator\Constraints as Assert;

class PetPostV2DTO
{
  #[Assert\NotNull(groups: ['pet_post:validation'])]
  public $name = null;

  #[Assert\NotBlank(groups: ['pet_post:validation'])]
  #[Assert\Choice(['M', 'F'], groups: ['pet_post:validation'])]
  public $gender = null;

  #[Assert\NotBlank(groups: ['pet_post:validation'])]
  #[Assert\Positive(groups: ['pet_post:validation'])]
  #[Assert\Type(type: 'integer', groups: ['pet_post:validation'])]
  public $age = null;

  #[Assert\NotBlank(groups: ['pet_post:validation'])]
  public $description = null;

  #[Assert\NotBlank(groups: ['pet_post:validation'])]
  #[Assert\Choice([1, 2, 3], groups: ['pet_post:validation'])] // 1 = small, 2 = medium, 3 = large
  public $size = null;

  #[Assert\NotBlank(groups: ['pet_post:validation'])]
  public $breed = null;

  #[Assert\NotBlank(groups: ['pet_post:validation'])]
  public $medicalHistory = null;

  #[Assert\NotNull(groups: ['pet_post:validation'])]
  #[Assert\File(maxSize: '5M', mimeTypes: ['image/jpeg', 'image/png'], groups: ['pet_post:validation'])]
  private $image1;

  #[Assert\File(maxSize: '5M', mimeTypes: ['image/jpeg', 'image/png'], groups: ['pet_post:validation'])]
  private $image2;

  #[Assert\File(maxSize: '5M', mimeTypes: ['image/jpeg', 'image/png'], groups: ['pet_post:validation'])]
  private $image3;

  #[Assert\File(maxSize: '5M', mimeTypes: ['image/jpeg', 'image/png'], groups: ['pet_post:validation'])]
  private $image4;

  #[Assert\File(maxSize: '5M', mimeTypes: ['image/jpeg', 'image/png'], groups: ['pet_post:validation'])]
  private $image5;

  public function getName()
  {
    return $this->name;
  }

  public function setName($name)
  {
    $this->name = $name;

    return $this;
  }

  public function getGender()
  {
    return $this->gender;
  }

  public function setGender($gender)
  {
    $this->gender = $gender;

    return $this;
  }

  public function getAge()
  {
    return $this->age;
  }

  public function setAge($age)
  {
    $this->age = $age;

    return $this;
  }

  public function getDescription()
  {
    return $this->description;
  }

  public function setDescription($description)
  {
    $this->description = $description;

    return $this;
  }

  public function getSize()
  {
    return $this->size;
  }

  public function setSize($size)
  {
    $this->size = $size;

    return $this;
  }

  public function getImage1()
  {
    return $this->image1;
  }

  public function setImage1($image1)
  {
    $this->image1 = $image1;

    return $this;
  }

  public function getImage2()
  {
    return $this->image2;
  }

  public function setImage2($image2)
  {
    $this->image2 = $image2;

    return $this;
  }

  public function getImage3()
  {
    return $this->image3;
  }

  public function setImage3($image3)
  {
    $this->image3 = $image3;

    return $this;
  }

  public function getImage4()
  {
    return $this->image4;
  }

  public function setImage4($image4)
  {
    $this->image4 = $image4;

    return $this;
  }

  public function getImage5()
  {
    return $this->image5;
  }

  public function setImage5($image5)
  {
    $this->image5 = $image5;

    return $this;
  }

  public function getImages()
  {
    return [$this->image1, $this->image2, $this->image3, $this->image4, $this->image5];
  }

  public function getBreed()
  {
    return $this->breed;
  }

  public function setBreed($breed)
  {
    $this->breed = $breed;

    return $this;
  }

  public function getMedicalHistory()
  {
    return $this->medicalHistory;
  }

  public function setMedicalHistory($medicalHistory)
  {
    $this->medicalHistory = $medicalHistory;

    return $this;
  }
}
