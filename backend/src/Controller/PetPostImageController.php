<?php

namespace App\Controller;

use App\Exception\ImagesLimitException;
use App\Service\PetPostService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapQueryParameter;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\TooManyRequestsHttpException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Symfony\Component\Routing\Attribute\Route;

class PetPostImageController extends AbstractController
{
    public function __construct(
        private PetPostService $petPostService
    ) {}

    #[Route('/api/pet-post/{id}/image', name: 'upload_pet_post_image', methods: ['POST'])]
    public function upload(Request $request, int $id, #[MapQueryParameter] bool $main = false): JsonResponse
    {
        try {
            $image = $request->files->get('image');
            $petPostImage = $this->petPostService->uploadImage($id, $image, $main);
            return $this->json($petPostImage, 200, [], ['groups' => 'pet_post_image:read']);
        } catch (NotFoundHttpException $e) {
            return $this->json([
				'message' => $e->getMessage()
			], Response::HTTP_NOT_FOUND);
        } catch(UnauthorizedHttpException $e) {
             return $this->json([
                'message' => $e->getMessage()
             ], Response::HTTP_UNAUTHORIZED);
        } catch (ImagesLimitException $e) {
            return $this->json([
                'message' => $e->getMessage()                
            ], Response::HTTP_BAD_REQUEST);
        } catch (\Exception $e) {
            return $this->json([
                'message' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/api/pet-post/{id}/image/{imageId}', name: 'delete_pet_post_image', methods: ['DELETE'])]
    public function delete(int $id, int $imageId): JsonResponse
    {
        try {
            $this->petPostService->deleteImage($id, $imageId);
            return $this->json([], Response::HTTP_NO_CONTENT);
        } catch (NotFoundHttpException $e) {
            return $this->json([
                'message' => $e->getMessage()
            ], Response::HTTP_NOT_FOUND);
        } catch(TooManyRequestsHttpException $e) {
            return $this->json([
                'message' => $e->getMessage()
            ], Response::HTTP_TOO_MANY_REQUESTS);
        } catch (\Exception $e) {
            return $this->json([
                'message' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
