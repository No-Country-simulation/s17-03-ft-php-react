<?php

namespace App\Repository;

use App\Entity\PetPost;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<PetPost>
 */
class PetPostRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PetPost::class);
    }

    public function save(PetPost $petPost): PetPost
    {
        $this->getEntityManager()->persist($petPost);
        $this->getEntityManager()->flush();
        
        return $petPost;
    }

    public function remove(PetPost $petPost): void
    {
        $this->getEntityManager()->remove($petPost);
        $this->getEntityManager()->flush();
    }
}
