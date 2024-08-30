<?php

namespace App\Serializer\Normalizer;

use App\Entity\PetPost;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class PetPostNormalizer implements NormalizerInterface
{
    public function __construct(
        #[Autowire(service: 'serializer.normalizer.object')]
        private NormalizerInterface $normalizer
    ) {
    }

    public function normalize($object, ?string $format = null, array $context = []): array
    {
        $data = $this->normalizer->normalize($object, $format, $context);

        switch ($data['size']) {
            case 1:
                $data['size'] = 'small';
                break;
            case 2:
                $data['size'] = 'medium';
                break;
            case 3:
                $data['size'] = 'large';
                break;
        }

        switch ($data['gender']) {
            case 'M':
                $data['gender'] = 'male';
                break;
            case 'F':
                $data['gender'] = 'female';
                break;
        }

        return $data;
    }

    public function supportsNormalization($data, ?string $format = null, array $context = []): bool
    {
        return $data instanceof PetPost;
    }

    public function getSupportedTypes(?string $format): array
    {
        return [PetPost::class => true];
    }
}
