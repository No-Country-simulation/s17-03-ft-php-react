<?php

namespace App\Serializer\Denormalizer;

use App\Dto\PetPostDTO;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class PetPostDenormalizer implements DenormalizerInterface
{
    const ALREADY_CALLED = 'already_denormalized';

    public function __construct(
        #[Autowire(service: 'serializer.normalizer.object')]
        private ObjectNormalizer $normalizer
    ) {}

    public function denormalize(mixed $data, string $type, ?string $format = null, array $context = []): PetPostDTO
    {
        switch ($data['size']) {
            case 'small':
                $data['size'] = 1;
                break;
            case 'medium':
                $data['size'] = 2;
                break;
            case 'large':
                $data['size'] = 3;
                break;
        }

        switch ($data['gender']) {
            case 'male':
                $data['gender'] = 'M';
                break;
            case 'female':
                $data['gender'] = 'F';
                break;
        }

        $context[self::ALREADY_CALLED] = true;
        return $this->normalizer->denormalize($data, $type, $format, $context);
    }

    public function supportsDenormalization(mixed $data, string $type, ?string $format = null, array $context = []): bool
    {
        return $type === PetPostDTO::class && !isset($context[self::ALREADY_CALLED]);
    }

    public function getSupportedTypes(?string $format): array
    {
        return [
            '*' => false,
            'object' => null,
            PetPostDTO::class => true
        ];
    }
}
