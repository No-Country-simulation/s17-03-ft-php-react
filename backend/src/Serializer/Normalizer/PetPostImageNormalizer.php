<?php

namespace App\Serializer\Normalizer;

use App\Entity\PetPostImage;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class PetPostImageNormalizer implements NormalizerInterface
{
    public function __construct(
        #[Autowire(service: 'serializer.normalizer.object')]
        private NormalizerInterface $normalizer
    ) {
    }

    public function normalize($object, ?string $format = null, array $context = []): array
    {
        $data = $this->normalizer->normalize($object, $format, $context);
        
        if (is_array($data) && null != $object->getImagePath()) {
            $data['url'] = $_ENV['IMAGE_KIT_URL_ENDPOINT'] . $object->getImagePath() . "?updated=" . $object->getUpdatedAt()->getTimestamp();
        }

        return $data;
    }

    public function supportsNormalization($data, ?string $format = null, array $context = []): bool
    {
        return $data instanceof PetPostImage;
    }

    public function getSupportedTypes(?string $format): array
    {
        return [PetPostImage::class => true];
    }
}
