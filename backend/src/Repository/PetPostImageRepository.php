<?php

namespace App\Repository;

use App\Entity\PetPostImage;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<PetPostImage>
 */
class PetPostImageRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PetPostImage::class);
    }

    public function remove(PetPostImage $petPostImage): void
    {
        $this->getEntityManager()->remove($petPostImage);
        $this->getEntityManager()->flush();
    }
}
