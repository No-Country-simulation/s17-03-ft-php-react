<?php

namespace App\Controller;

use App\Dto\PetPostDTO;
use App\Entity\PetPost;
use App\Exception\ValidationErrorsException;
use App\Service\PetPostService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapQueryParameter;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Attribute\Route;

class PetPostController extends AbstractController
{
	public function __construct(
		private PetPostService $petPostService
	) {}

	#[Route('/api/pet-post', name: 'create_pet_post', methods: ['POST'])]
	public function petPostSave(
		#[MapRequestPayload] PetPostDTO $petPostDTO,
	): JsonResponse {
		try {
			$petPost = $this->petPostService->create($petPostDTO, $this->getUser());
			return $this->json($petPost, Response::HTTP_CREATED, [], ['groups' => 'pet_post:write']);
		} catch (ValidationErrorsException $e) {
			return $this->json([
				'message' => $e->getMessage(),
				'details' => $e->getDetails()
			]);
		} catch (\Exception $e) {
			return $this->json([
				'message' => $e->getMessage()
			], Response::HTTP_INTERNAL_SERVER_ERROR);
		}
	}

	#[Route('/api/pet-post/{id}', name: 'show_pet_post', methods: ['GET'])]
	public function petPostShow(
		int $id
	): JsonResponse {
		try {
			$post = $this->petPostService->getById($id);
			return $this->json($post, Response::HTTP_OK, [], ['groups' => ['pet_post:read']]);
		} catch (NotFoundHttpException $e) {
			return $this->json([
				'message' => $e->getMessage()
			], Response::HTTP_NOT_FOUND);
		} catch (\Exception $e) {
			return $this->json([
				'message' => $e->getMessage()
			], Response::HTTP_INTERNAL_SERVER_ERROR);
		}
	}

	#[Route('/api/pet-post/', name: 'show_all_pet_post', methods: ['GET'])]
	public function petPostShowAll(
		#[MapQueryParameter] int $page = 0
	): JsonResponse
	{
		try {
			$response = $this->petPostService->getAll($page);
			return $this->json($response, Response::HTTP_OK);
		} catch (\Exception $e) {
			return $this->json([
				'message' => $e->getMessage()
			], Response::HTTP_INTERNAL_SERVER_ERROR);
		}
	}

	#[Route('/api/pet-post/{id}', name: 'update_pet_post', methods: ['PUT'])]
	public function petPostUpdate(
		int $id,
		#[MapRequestPayload] PetPostDTO $petPostDTO
	): JsonResponse {
		try {
			$post = $this->petPostService->edit($petPostDTO, $id);
			return $this->json($post, Response::HTTP_OK, [], ['groups' => 'pet_post:write']);
		} catch (ValidationErrorsException $e) {
			return $this->json([
				'message' => $e->getMessage(),
				'details' => $e->getDetails()
			]);
		} catch (NotFoundHttpException $e) {
			return $this->json([
				'message' => $e->getMessage()
			], Response::HTTP_NOT_FOUND);
		} catch (\Exception $e) {
			return $this->json([
				'message' => $e->getMessage()
			], Response::HTTP_INTERNAL_SERVER_ERROR);
		}
	}

	#[Route('/api/pet-post/{id}', name: 'delete_pet_post', methods: ['DELETE'])]
	public function petPostDelete(
		int $id,
		EntityManagerInterface $em
	): JsonResponse {
		try {
			$this->petPostService->delete($id);
			return $this->json([], Response::HTTP_NO_CONTENT);
		} catch (NotFoundHttpException $e) {
			return $this->json([
				'message' => $e->getMessage()
			], Response::HTTP_NOT_FOUND);
		} catch (\Exception $e) {
			return $this->json([
				'message' => $e->getMessage()
			], Response::HTTP_INTERNAL_SERVER_ERROR);
		}
	}
}
