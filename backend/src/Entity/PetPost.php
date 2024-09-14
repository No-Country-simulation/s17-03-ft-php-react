<?php

namespace App\Entity;

use App\Repository\PetPostRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: PetPostRepository::class)]
class PetPost
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['pet_post:read', 'pet_post:write'])]
    private ?int $id = null;
    
    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['pet_post:read', 'pet_post:write'])]
    private ?string $name = null;
    
    #[ORM\Column(length: 1)]
    #[Groups(['pet_post:read', 'pet_post:write'])]
    private ?string $gender = null;
    
    #[ORM\Column(nullable: true)]
    #[Groups(['pet_post:read', 'pet_post:write'])]
    private ?int $age = null;
    
    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['pet_post:read', 'pet_post:write'])]
    private ?string $description = null;
    
    #[ORM\Column]
    #[Groups(['pet_post:read', 'pet_post:write'])]
    private ?int $size = null;
    
    #[ORM\Column]
    #[Groups(['pet_post:read', 'pet_post:write'])]
    private ?\DateTimeImmutable $createdAt = null;
    
    #[ORM\Column]
    #[Groups(['pet_post:read', 'pet_post:write'])]
    private ?\DateTimeImmutable $updatedAt = null;
    
    /**
     * @var Collection<int, PetPostImage>
     */
    #[ORM\OneToMany(targetEntity: PetPostImage::class, mappedBy: 'petPost', cascade: ['persist'])]
    #[Groups(['pet_post:read', 'pet_post:write'])]
    private Collection $images;
    
    #[ORM\ManyToOne(inversedBy: 'petPosts')]
    #[Groups(['pet_post:read', 'pet_post:write'])]
    private ?User $author = null;

    #[ORM\Column(length: 255)]
    #[Groups(['pet_post:read', 'pet_post:write'])]
    private ?string $breed = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['pet_post:read', 'pet_post:write'])]
    private ?string $medicalHistory = null;

    public function __construct() {
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = new \DateTimeImmutable();
        $this->images = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getGender(): ?string
    {
        return $this->gender;
    }

    public function setGender(string $gender): static
    {
        $this->gender = $gender;

        return $this;
    }

    public function getAge(): ?int
    {
        return $this->age;
    }

    public function setAge(?int $age): static
    {
        $this->age = $age;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getSize(): ?int
    {
        return $this->size;
    }

    public function setSize(int $size): static
    {
        $this->size = $size;

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

    /**
     * @return Collection<int, PetPostImage>
     */
    public function getImages(): Collection
    {
        return $this->images;
    }

    public function addImage(PetPostImage $image): static
    {
        if (!$this->images->contains($image)) {
            $this->images->add($image);
            $image->setPetPost($this);
        }

        return $this;
    }

    public function removeImage(PetPostImage $image): static
    {
        if ($this->images->removeElement($image)) {
            // set the owning side to null (unless already changed)
            if ($image->getPetPost() === $this) {
                $image->setPetPost(null);
            }
        }

        return $this;
    }

    public function getAuthor(): ?User
    {
        return $this->author;
    }

    public function setAuthor(?User $author): static
    {
        $this->author = $author;

        return $this;
    }

    public function getBreed(): ?string
    {
        return $this->breed;
    }

    public function setBreed(string $breed): static
    {
        $this->breed = $breed;

        return $this;
    }

    public function getMedicalHistory(): ?string
    {
        return $this->medicalHistory;
    }

    public function setMedicalHistory(string $medicalHistory): static
    {
        $this->medicalHistory = $medicalHistory;

        return $this;
    }
}
