<?php

namespace App\Serializer\Denormalizer;

use App\Dto\PetPostDTO;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

class PetPostDenormalizer implements DenormalizerInterface
{
    public function denormalize(mixed $data, string $type, ?string $format = null, array $context = []): array
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
        
        return $data;
    }

    public function supportsDenormalization(mixed $data, string $type, ?string $format = null, array $context = []): bool
    {
        return $type === PetPostDTO::class;
    }

    public function getSupportedTypes(?string $format): array
    {
        return ['*' => true];
    }
}
