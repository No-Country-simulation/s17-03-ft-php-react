<?php

namespace App\Controller;

use App\Dto\PetPostV2DTO;
use App\Exception\ValidationErrorsException;
use App\Service\PetPostService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;

class PetPostV2Controller extends AbstractController
{
    public function __construct(
        private PetPostService $petPostService
    ) {}

	#[Route('/api/v2/pet-post', name: 'create_pet_post_v2', methods: ['POST'])]
	public function petPostSaveV2(
		#[MapRequestPayload()] PetPostV2DTO $petPostV2DTO,
	): JsonResponse {
		try {
			$petPost = $this->petPostService->createV2($petPostV2DTO, $this->getUser());
			return $this->json($petPost, Response::HTTP_CREATED, [], ['groups' => 'pet_post:write']);
		} catch (ValidationErrorsException $e) {
			return $this->json([
				'message' => $e->getMessage(),
				'details' => $e->getDetails()
			], Response::HTTP_BAD_REQUEST);
		} catch (\Exception $e) {
			return $this->json([
				'message' => $e->getMessage()
			], Response::HTTP_INTERNAL_SERVER_ERROR);
		}
	}

}
