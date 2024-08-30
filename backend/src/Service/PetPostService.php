<?php

namespace App\Service;

use App\Dto\petPostDto;
use App\Entity\PetPost;
use App\Repository\PetPostRepository;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class PetPostService {
    public function __construct(
        private PetPostRepository $petPostRepository
    ) {}

    public function create(petPostDto $petPostDto): PetPost
    {
        // TODO: Validate DTO
        $post = new PetPost();
		$post->setName($petPostDto->getName());
		$post->setGender($petPostDto->getGender());
		$post->setAge($petPostDto->getAge());
		$post->setDescription($petPostDto->getDescription());
		$post->setSize($petPostDto->getSize());

        return $this->petPostRepository->save($post);
    }

    public function edit(petPostDto $petPostDto, int $id): PetPost
    {
        // TODO: Validate DTO
		$petPost = $this->petPostRepository->find($id);

		if (!$petPost) {
			throw new NotFoundHttpException('No se encontró el Post con el id: ' . $id);
		}

		$petPost->setName($petPostDto->getName());
		$petPost->setGender($petPostDto->getGender());
		$petPost->setAge($petPostDto->getAge());
		$petPost->setDescription($petPostDto->getDescription());
		$petPost->setSize($petPostDto->getSize());

        return $this->petPostRepository->save($petPost);
    }

    public function getById($id): PetPost
    {
		$post = $this->petPostRepository->find($id);

		if (!$post) {
			throw new NotFoundHttpException('No se encontró el Post con el id: ' . $id);
		}

        return $post;
    }

    public function getAll(int $page): array
    {
        if ($page > 0) {
            $page--;
        }
        
        $limit = 30;
        $offset = $page * $limit;
        $total = $this->petPostRepository->count();
        
        return [
            'data' => $this->petPostRepository->findBy([], [], $limit, $offset),
            'total' => $total
        ];
    }

    public function delete(int $id): void
    {
        $post = $this->petPostRepository->find($id);
        if (!$post) {
            throw new NotFoundHttpException('No se encontró el Post con el id: ' . $id);
        }
        $this->petPostRepository->remove($post);
    }
}