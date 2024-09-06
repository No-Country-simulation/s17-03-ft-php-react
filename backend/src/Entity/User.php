<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_EMAIL', fields: ['email'])]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;
    
    #[ORM\Column(length: 180)]
    #[Groups(['user:login'])]
    private ?string $email = null;
    
    /**
     * @var list<string> The user roles
     */
    #[ORM\Column]
    #[Groups(['user:login'])]
    private array $roles = [];
    
    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;
    
    #[ORM\Column(length: 255)]
    #[Groups(['user:login', 'pet_post:read', 'pet_post:write'])]
    private ?string $name = null;

    #[ORM\Column(nullable: true)]
    private ?int $authProvider = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $authProviderUserId = null;

    /**
     * @var Collection<int, PetPost>
     */
    #[ORM\OneToMany(targetEntity: PetPost::class, mappedBy: 'author')]
    private Collection $petPosts;

    #[ORM\Column(type: Types::DATE_IMMUTABLE)]
    private ?\DateTimeImmutable $dateOfBirth = null;

    public function __construct()
    {
        $this->petPosts = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     *
     * @return list<string>
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @param list<string> $roles
     */
    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
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

    public function getAuthProvider(): ?int
    {
        return $this->authProvider;
    }

    public function setAuthProvider(?int $authProvider): static
    {
        $this->authProvider = $authProvider;

        return $this;
    }

    public function getAuthProviderUserId(): ?string
    {
        return $this->authProviderUserId;
    }

    public function setAuthProviderUserId(?string $authProviderUserId): static
    {
        $this->authProviderUserId = $authProviderUserId;

        return $this;
    }

    /**
     * @return Collection<int, PetPost>
     */
    public function getPetPosts(): Collection
    {
        return $this->petPosts;
    }

    public function addPetPost(PetPost $petPost): static
    {
        if (!$this->petPosts->contains($petPost)) {
            $this->petPosts->add($petPost);
            $petPost->setAuthor($this);
        }

        return $this;
    }

    public function removePetPost(PetPost $petPost): static
    {
        if ($this->petPosts->removeElement($petPost)) {
            // set the owning side to null (unless already changed)
            if ($petPost->getAuthor() === $this) {
                $petPost->setAuthor(null);
            }
        }

        return $this;
    }

    public function getDateOfBirth(): ?\DateTimeImmutable
    {
        return $this->dateOfBirth;
    }

    public function setDateOfBirth(\DateTimeImmutable $dateOfBirth): static
    {
        $this->dateOfBirth = $dateOfBirth;

        return $this;
    }
}
