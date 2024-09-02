<?php

namespace App\Dto;

use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

class PetPostDTO {
  #[Assert\NotBlank(groups: ['pet_post:validation'])]
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
}