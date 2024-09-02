<?php

namespace App\DataFixtures;

use App\Factory\PetPostFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        PetPostFactory::createMany(200);
    }
}
