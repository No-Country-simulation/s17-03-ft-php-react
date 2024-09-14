<?php

namespace App\Service;

use App\Dto\petPostDto;
use App\Dto\PetPostImageDTO;
use App\Dto\PetPostV2DTO;
use App\Entity\PetPost;
use App\Entity\PetPostImage;
use App\Entity\User;
use App\Exception\ImagesLimitException;
use App\Handler\ValidationErrorsHandler;
use App\Repository\PetPostImageRepository;
use App\Repository\PetPostRepository;
use ImageKit\ImageKit;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\TooManyRequestsHttpException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\ConstraintViolation;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class PetPostService {
    public function __construct(
        private PetPostRepository $petPostRepository,
        private PetPostImageRepository $petPostImageRepository,
        private ImageKit $imageKit,
        private LoggerInterface $logger,
        private Security $security,
        private ValidatorInterface $validator,
        private ValidationErrorsHandler $validationErrors
    ) {}

    public function create(petPostDto $petPostDto, UserInterface $user): PetPost
    {
        $errors = $this->validator->validate($petPostDto, groups: ['pet_post:validation']);
        
        if (count($errors) > 0) {
            $this->validationErrors->handle($errors);
        }

        $post = new PetPost();
		$post->setName($petPostDto->getName());
		$post->setGender($petPostDto->getGender());
		$post->setAge($petPostDto->getAge());
		$post->setDescription($petPostDto->getDescription());
		$post->setSize($petPostDto->getSize());
        $post->setAuthor($user);

        return $this->petPostRepository->save($post);
    }    
    
    public function createV2(PetPostV2DTO $petPostV2Dto, UserInterface $user): PetPost
    {
        $errors = $this->validator->validate($petPostV2Dto, groups: ['pet_post:validation']);
        
        if (count($errors) > 0) {
            $this->validationErrors->handle($errors);
        }

        $post = new PetPost();
		$post->setName($petPostV2Dto->getName());
		$post->setGender($petPostV2Dto->getGender());
		$post->setAge($petPostV2Dto->getAge());
		$post->setDescription($petPostV2Dto->getDescription());
		$post->setSize($petPostV2Dto->getSize());
        $post->setBreed($petPostV2Dto->getBreed());
        $post->setMedicalHistory($petPostV2Dto->getMedicalHistory());
        $post->setAuthor($user);

        $petPost = $this->petPostRepository->save($post);

        /** @var UploadedFile[] $images */
        $images = $petPostV2Dto->getImages();

        foreach ($images as $i => $image) {
            $isFirst = $i === 0; 
            if ($image !== null) {
                $petPostImage = $this->uploadImageV2($petPost, $image, $isFirst);
                $petPost->addImage($petPostImage);
            }
        }
        
        return $this->petPostRepository->save($petPost);;
    }

    public function edit(petPostDto $petPostDto, int $id): PetPost
    {
        $errors = $this->validator->validate($petPostDto, groups: ['pet_post:validation']);
        
        if (count($errors) > 0) {
            $this->validationErrors->handle($errors);
        }
        
		$petPost = $this->petPostRepository->find($id);

		if (!$petPost) {
			throw new NotFoundHttpException('No se encontró el Post con el id: ' . $id);
		}

        /** @var User $currentUser */
        $currentUser = $this->security->getUser();
        if ($currentUser->getId() !== $petPost->getAuthor()->getId()) {
            throw new UnauthorizedHttpException('', 'Este usuario no puede editar este Post ya que no es su autor');
        }

		$petPost->setName($petPostDto->getName());
		$petPost->setGender($petPostDto->getGender());
		$petPost->setAge($petPostDto->getAge());
		$petPost->setDescription($petPostDto->getDescription());
		$petPost->setSize($petPostDto->getSize());
        $petPost->setUpdatedAt(new \DateTimeImmutable());

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
        $petPost = $this->petPostRepository->find($id);
        if (!$petPost) {
            throw new NotFoundHttpException('No se encontró el Post con el id: ' . $id);
        }

        /** @var User $currentUser */
        $currentUser = $this->security->getUser();
        if ($currentUser->getId() !== $petPost->getAuthor()->getId()) {
            throw new UnauthorizedHttpException('', 'Este usuario no puede editar este Post ya que no es su autor');
        }

        $this->petPostRepository->remove($petPost);
    }

    public function uploadImage(int $id, PetPostImageDTO $petPostImageDto, bool $main): PetPostImage
    {
        $errors = $this->validator->validate($petPostImageDto, groups: ['pet_post_image:upload']);
        
        if (count($errors) > 0) {
            $this->validationErrors->handle($errors);
        }

        /** @var PetPost $petPost */
        $petPost = $this->petPostRepository->find($id);

        if (!$petPost) {
            throw new NotFoundHttpException('No se encontró el Post con el id: ' . $id);
        }

        /** @var User $currentUser */
        $currentUser = $this->security->getUser();
        if ($currentUser->getId() !== $petPost->getAuthor()->getId()) {
            throw new UnauthorizedHttpException('', 'Este usuario no puede subir imagenes a este Post ya que no es su autor');
        }

        if ($petPost->getImages()->count() >= 5) {
            throw new ImagesLimitException;
        }
        
        $image = $petPostImageDto->getImage();
        $filename = 'pet-post' . '_' . $id . uniqid() . '.' . $image->guessExtension();

        $response = $this->imageKit->uploadFile([
            'file' => base64_encode($image->getContent()),
            'fileName' => $filename,
            'folder' => 's17-03-ft-php-react'
        ]);

        $petPostImage = new PetPostImage();
        $petPostImage->setImagePath($response->result->filePath)
            ->setImageKitFileId($response->result->fileId);

        if ($petPost->getImages()->isEmpty()) {
            $petPostImage->setMain(true);
        } else if ($main) {
            $petPostImage->setMain(true);
            $petPost->getImages()->map(fn(PetPostImage $image) => $image->setMain(false));
        } else {
            $petPostImage->setMain(false);
        }

        $petPost->addImage($petPostImage);

        $this->petPostRepository->save($petPost);
        
        return $petPostImage;
    }

    public function deleteImage(int $id, int $imageId): void
    {
        /** @var PetPost $petPost */
        $petPost = $this->petPostRepository->find($id);
        
        if (!$petPost) {
            throw new NotFoundHttpException('No se encontró el Post con el id: ' . $id);
        }
        
        /** @var User $currentUser */
        $currentUser = $this->security->getUser();
        if ($currentUser->getId() !== $petPost->getAuthor()->getId()) {
            throw new UnauthorizedHttpException('', 'Este usuario no puede eliminar imagenes de este Post ya que no es su autor');
        }

        /** @var PetPostImage $petPostImage */
        $petPostImage = $this->petPostImageRepository->findOneBy(['petPost' => $petPost, 'id' => $imageId]);
        
        if (!$petPostImage) {
            throw new NotFoundHttpException('No se encontró la imagen con el id: ' . $imageId . ' en este pet post.');
        }
        
        $response = $this->imageKit->deleteFile($petPostImage->getImageKitFileId());

        if ($response->responseMetadata['statusCode'] == Response::HTTP_TOO_MANY_REQUESTS) {
            throw new TooManyRequestsHttpException("Demasiadas solicitudes, espere un momento y vuelva a intentarlo.");
        }

        $this->petPostImageRepository->remove($petPostImage);
    }

    public function uploadImageV2(PetPost $petPost, UploadedFile $image, bool $main): PetPostImage
    {
        /** @var User $currentUser */
        $currentUser = $this->security->getUser();
        if ($currentUser->getId() !== $petPost->getAuthor()->getId()) {
            throw new UnauthorizedHttpException('', 'Este usuario no puede subir imagenes a este Post ya que no es su autor');
        }

        if ($petPost->getImages()->count() >= 5) {
            throw new ImagesLimitException;
        }

        $filename = 'pet-post' . '_' . $petPost->getId() . uniqid() . '.' . $image->guessExtension();

        $response = $this->imageKit->uploadFile([
            'file' => base64_encode($image->getContent()),
            'fileName' => $filename,
            'folder' => 's17-03-ft-php-react'
        ]);

        $petPostImage = new PetPostImage();
        $petPostImage->setImagePath($response->result->filePath)
            ->setImageKitFileId($response->result->fileId);

        if ($petPost->getImages()->isEmpty()) {
            $petPostImage->setMain(true);
        } else if ($main) {
            $petPostImage->setMain(true);
            $petPost->getImages()->map(fn(PetPostImage $image) => $image->setMain(false));
        } else {
            $petPostImage->setMain(false);
        }
        
        return $petPostImage;
    }
}