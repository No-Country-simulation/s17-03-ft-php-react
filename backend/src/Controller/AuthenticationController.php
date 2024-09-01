<?php

namespace App\Controller;

use App\Dto\UserRegisterDTO;
use App\Exception\EmailInUseException;
use App\Service\AuthService;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;

class AuthenticationController extends AbstractController
{
    public function __construct(
        private AuthService $authService
    ) { }

    #[Route('/api/auth/whoami', name: 'whoami', methods: ['GET'])]
    public function whoAmI(): JsonResponse
    {
        return $this->json($this->getUser(), Response::HTTP_OK, [], ['groups' => ['user:login']]);
    }

    #[Route('/api/auth/register', name: 'register', methods: ['POST'])]
    public function register(#[MapRequestPayload] UserRegisterDTO $userRegisterDTO): JsonResponse
    {
        try {
            $user = $this->authService->register($userRegisterDTO);
            return $this->json($user, Response::HTTP_CREATED);
        } catch (EmailInUseException $e) {
            return $this->json(['message' => $e->getMessage()], $e->getStatusCode());
        } catch (\Exception $e) {
            return $this->json(['message' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/api/auth/login', name: 'login', methods: ['POST'])]
    public function login(Request $request, JWTTokenManagerInterface $JWTManager): JsonResponse
    {
        $token = $JWTManager->create($this->getUser());
        $headers = [
            'Set-Cookie' => sprintf('BEARER=%s; HttpOnly', $token)
        ];

        return $this->json([
            'user' => $this->getUser()
        ], Response::HTTP_OK, $headers, ['groups' => ['user:login']]);
    }

    #[Route('/api/auth/google', name: 'sign_in_google', methods: ['POST'])]
    public function authGoogle(Request $request, JWTTokenManagerInterface $JWTManager): JsonResponse
    {
        $token = $JWTManager->create($this->getUser());
        $headers = [
            'Set-Cookie' => sprintf('BEARER=%s; HttpOnly', $token)
        ];

        return $this->json([
            'user' => $this->getUser()
        ], Response::HTTP_OK, $headers, ['groups' => ['user:login']]);
    }

    #[Route('/api/auth/logout', name: 'logout', methods: ['POST'])]
    public function logout(): JsonResponse
    {
        $headers = ['Set-Cookie' => 'BEARER=; Max-Age=0; HttpOnly'];
        return $this->json(null, Response::HTTP_NO_CONTENT, $headers);
    }
}
