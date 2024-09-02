<?php

namespace App\Entity;

use App\Repository\PetPostImageRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: PetPostImageRepository::class)]
class PetPostImage
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['pet_post_image:read', 'pet_post:read', 'pet_post:write'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $imagePath = null;

    #[ORM\Column(length: 255)]
    private ?string $imageKitFileId = null;    
    
    #[ORM\Column]
    #[Groups(['pet_post_image:read', 'pet_post:read', 'pet_post:write'])]
    private ?bool $main = null;

    #[ORM\Column]
    #[Groups(['pet_post_image:read', 'pet_post:read', 'pet_post:write'])]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column]
    #[Groups(['pet_post_image:read', 'pet_post:read', 'pet_post:write'])]
    private ?\DateTimeImmutable $updatedAt = null;

    #[ORM\ManyToOne(inversedBy: 'images')]
    #[ORM\JoinColumn(nullable: false)]
    private ?PetPost $petPost = null;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getImagePath(): ?string
    {
        return $this->imagePath;
    }

    public function setImagePath(string $imagePath): static
    {
        $this->imagePath = $imagePath;

        return $this;
    }

    public function getImageKitFileId(): ?string
    {
        return $this->imageKitFileId;
    }

    public function setImageKitFileId(string $imageKitFileId): static
    {
        $this->imageKitFileId = $imageKitFileId;

        return $this;
    }

    public function getMain(): ?bool
    {
        return $this->main;
    }

    public function setMain(bool $main): static
    {
        $this->main = $main;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeImmutable $updatedAt): static
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getPetPost(): ?PetPost
    {
        return $this->petPost;
    }

    public function setPetPost(?PetPost $petPost): static
    {
        $this->petPost = $petPost;

        return $this;
    }
}
