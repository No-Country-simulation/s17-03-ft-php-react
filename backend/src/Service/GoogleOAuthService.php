<?php

namespace App\Service;

use App\Entity\User;
use App\Exception\Authentication\AuthenticationInvalidGoogleTokenException;
use App\Repository\UserRepository;
use App\Util\AuthenticationProvider;
use Google\Client;
use Symfony\Component\Security\Core\Exception\AuthenticationException;

class GoogleOAuthService
{
    public function __construct(
        private Client $googleClient,
        private UserRepository $userRepository
    ) {}

    public function authenticate(string $accessToken): User
    {
        $payload = $this->googleClient->verifyIdToken($accessToken);
        
        if (!$payload) {
            try {
                $payload = explode('.', $accessToken);
                $payload = json_decode(base64_decode($payload[1]), true, 512, \JSON_THROW_ON_ERROR);
            } catch (\JsonException $e) {
                throw new AuthenticationInvalidGoogleTokenException;
            }
        }

        /** @var User $user */
        $user = $this->userRepository->findOneBy(['email' => $payload['email']]);

        if (!$user) {
            $user = new User;
            $user->setEmail($payload['email']);
            $user->setName($payload['name']);
            $user->setAuthProvider(AuthenticationProvider::GOOGLE);
            $user->setAuthProviderUserId($payload['sub']);
            $user->setPassword('');
            $user = $this->userRepository->save($user);
        } else if (AuthenticationProvider::GOOGLE !== $user->getAuthProvider()) {
            throw new AuthenticationException(sprintf("El email %s ya se encuentra registrado.", $user->getEmail())); // TODO: Refactor this exception to be more specific
        }

        return $user;
    }
}