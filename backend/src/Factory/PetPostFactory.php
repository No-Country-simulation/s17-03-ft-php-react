<?php

namespace App\Factory;

use App\Entity\PetPost;
use Zenstruck\Foundry\Persistence\PersistentProxyObjectFactory;

/**
 * @extends PersistentProxyObjectFactory<PetPost>
 */
final class PetPostFactory extends PersistentProxyObjectFactory
{
    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#factories-as-services
     *
     * @todo inject services if required
     */
    public function __construct()
    {
    }

    public static function class(): string
    {
        return PetPost::class;
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     * @todo add your default values here
     */
    protected function defaults(): array|callable
    {
        return [
            'name' => self::faker()->firstName(),
            'description' => self::faker()->text(),
            'gender' => self::faker()->randomElement(['M', 'F']),
            'size' => self::faker()->randomElement([1, 2, 3]),
            'age' => self::faker()->numberBetween(1, 15)
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): static
    {
        return $this
            // ->afterInstantiate(function(PetPost $petPost): void {})
        ;
    }
}
