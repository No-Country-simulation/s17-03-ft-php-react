<?php

namespace App\Service;

use App\Dto\UserRegisterDTO;
use App\Entity\User;
use App\Exception\EmailInUseException;
use App\Handler\ValidationErrorsHandler;
use App\Repository\UserRepository;
use App\Util\AuthenticationProvider;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class AuthService
{
    public function __construct(
        private UserRepository $userRepository,
        private UserPasswordHasherInterface $passwordHasher,
        private ValidatorInterface $validator,
        private ValidationErrorsHandler $validationErrors
    ) {}

    public function register(UserRegisterDTO $userRegisterDTO): User
    {
        $errors = $this->validator->validate($userRegisterDTO, groups: ['user:register']);
        
        if (count($errors) > 0) {
            $this->validationErrors->handle($errors);
        }

        if ($this->existsUserWithEmail($userRegisterDTO->getEmail())) {
            throw new EmailInUseException($userRegisterDTO->getEmail());
        }

        $user = new User;
        $hashedPassword = $this->passwordHasher->hashPassword(
            $user,
            $userRegisterDTO->getPassword()
        );
        $dateFormat = \DateTimeImmutable::createFromFormat('Y-m-d', $userRegisterDTO->getDateOfBirth());
    
        $user
            ->setEmail($userRegisterDTO->getEmail())
            ->setName($userRegisterDTO->getName())
            ->setPassword($hashedPassword)
            ->setAuthProvider(AuthenticationProvider::APP)
            ->setDateOfBirth($dateFormat);

        $errorUser = $this->validator->validate($user);

        if (count($errorUser) > 0) {
          $this->validationErrors->handle($errorUser);
        }

        $this->userRepository->save($user);

        return $user;
    }

    public function existsUserWithEmail(string $email): bool
    {
        return $this->userRepository->findOneBy(['email' => $email]) !== null;
    }
}