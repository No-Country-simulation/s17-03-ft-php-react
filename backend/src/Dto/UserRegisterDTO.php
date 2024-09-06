<?php

namespace App\Dto;

use Symfony\Component\Validator\Constraints as Assert;

class UserRegisterDTO
{
    #[Assert\Email(groups: ['user:register'])]
    #[Assert\NotBlank(groups: ['user:register'])]
    public $email;

    #[Assert\NotBlank(groups: ['user:register'])]
    public $name;

    #[Assert\NotBlank(groups: ['user:register'])]
    #[Assert\Length(min: 6, max: 100, groups: ['user:register'])]
    public $password;

    public function getEmail()
    {
        return $this->email;
    }

    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    public function getPassword()
    {
        return $this->password;
    }

    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }
}