<?php

namespace App\Serializer\Denormalizer;

use App\Dto\PetPostDTO;
use App\Dto\PetPostV2DTO;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class PetPostDenormalizer implements DenormalizerInterface
{
    const ALREADY_CALLED = 'already_denormalized';

    public function __construct(
        #[Autowire(service: 'serializer.normalizer.object')]
        private ObjectNormalizer $normalizer,
        private RequestStack $requestStack
    ) {}

    public function denormalize(mixed $data, string $type, ?string $format = null, array $context = []): PetPostDTO | PetPostV2DTO
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

        if (is_numeric($data['age'])) {
            $data['age'] = (int) $data['age'];
        }

        if ($type === PetPostV2DTO::class) {
            $request = $this->requestStack->getCurrentRequest();
    
            $files = $request->files->getIterator()->getArrayCopy();
            $data = array_merge($data, $files);
        }

        $context[self::ALREADY_CALLED] = true;
        return $this->normalizer->denormalize($data, $type, $format, $context);
    }

    public function supportsDenormalization(mixed $data, string $type, ?string $format = null, array $context = []): bool
    {
        return $type === PetPostDTO::class || $type === PetPostV2DTO::class && !isset($context[self::ALREADY_CALLED]);
    }

    public function getSupportedTypes(?string $format): array
    {
        return [
            '*' => false,
            'object' => null,
            PetPostDTO::class => true,
            PetPostV2DTO::class => true
        ];
    }
}
