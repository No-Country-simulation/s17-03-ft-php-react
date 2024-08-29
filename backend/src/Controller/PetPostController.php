<?php

namespace App\Controller;

use App\Dto\PetPostDTO;
use App\Entity\PetPost;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;

class PetPostController extends AbstractController
{
  #[Route('/api/pet-post', name: 'create_pet_post', methods: ['POST'])]
  public function petPostSave(
    #[MapRequestPayload] PetPostDTO $petPostDTO,
    EntityManagerInterface $em
  ): JsonResponse {
    $post = new PetPost();
    $post->setName($petPostDTO->getName());
    $post->setGender($petPostDTO->getGender());
    $post->setAge($petPostDTO->getAge());
    $post->setDescription($petPostDTO->getDescription());
    $post->setSize($petPostDTO->getSize());

    $em->persist($post);
    $em->flush();

    return $this->json([
      'message' => 'Se ha creado un nuevo registro con éxito!',
    ], 201);
  }

  #[Route('/api/pet-post/{id}', name: 'show_pet_post', methods: ['GET'])]
  public function petPostShow(
    int $id,
    EntityManagerInterface $em
  ): JsonResponse {
    $post = $em->getRepository(PetPost::class)->find($id);

    if (!$post) {
      throw $this->createNotFoundException(
        'No se encontró el Post con el id: ' . $id
      );
    }

    return new JsonResponse([ 
      'id' => $post->getId(),
      'post' => $post->getName(),
      'gender' => $post->getGender(),
      'age' => $post->getAge(),
      'description' => $post->getDescription(),
      'size' => $post->getSize()
    ], 200);
  }

  #[Route('/api/pet-post/', name: 'show_all_pet_post', methods: ['GET'])]
  public function petPostShowAll(EntityManagerInterface $em): JsonResponse
  {
    $posts = $em->getRepository(PetPost::class)->findAll();
    $postsArray = [];
    foreach ($posts as $post) {
      $postsArray[] = [
        'id' => $post->getId(),
        'post' => $post->getName(),
        'gender' => $post->getGender(),
        'age' => $post->getAge(),
        'description' => $post->getDescription(),
        'size' => $post->getSize()
      ];
    }
    return new JsonResponse($postsArray, 200);
  }

  #[Route('/api/pet-post/{id}', name: 'update_pet_post', methods: ['PUT'])]
  public function petPostUpdate(
    int $id,
    #[MapRequestPayload] PetPostDTO $petPostDTO,
    EntityManagerInterface $em
  ): JsonResponse {
    $post = $em->getRepository(PetPost::class)->find($id);
    if (!$post) {
      throw $this->createNotFoundException(
        'No se encontró el Post con el id: ' . $id
      );
    }
    $post->setName($petPostDTO->getName());
    $post->setGender($petPostDTO->getGender());
    $post->setAge($petPostDTO->getAge());
    $post->setDescription($petPostDTO->getDescription());
    $post->setSize($petPostDTO->getSize());
    $em->persist($post);
    $em->flush();
    return $this->json([
      'message' => 'Se ha actualizado el Post con éxito!',
    ], 200);
  }

  #[Route('/api/pet-post/{id}', name: 'delete_pet_post', methods: ['DELETE'])]
  public function petPostDelete(
    int $id,
    EntityManagerInterface $em
  ): JsonResponse {
    $post = $em->getRepository(PetPost::class)->find($id);
    if (!$post) {
      throw $this->createNotFoundException(
        'No se encontró el Post con el id: ' . $id
      );
    }
    $em->remove($post);
    $em->flush();
    return $this->json([
      'message' => 'Se ha eliminado el Post con éxito!',
    ], 200);
  }
}
