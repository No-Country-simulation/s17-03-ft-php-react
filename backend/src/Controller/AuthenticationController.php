<?php

namespace App\Controller;

use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class AuthenticationController extends AbstractController
{
    #[Route('/api/auth/whoami', name: 'whoami', methods: ['GET'])]
    public function whoAmI(): JsonResponse
    {
        return $this->json($this->getUser(), Response::HTTP_OK, [], ['groups' => ['user:login']]);
    }

    #[Route('/api/auth/google', name: 'sign_in_google', methods: ['POST'])]
    public function authGoogle(Request $request, JWTTokenManagerInterface $JWTManager): JsonResponse
    {
        $token = $JWTManager->create($this->getUser());
        $headers = [
            'Set-Cookie' => sprintf('BEARER=%s; HttpOnly', $token)
        ];

        return $this->json([
            'user' => $this->getUser(),
            'token' => $token
        ], Response::HTTP_OK, $headers, ['groups' => ['user:login']]);
    }

    #[Route('/api/auth/logout', name: 'logout', methods: ['POST'])]
    public function logout(): JsonResponse
    {
        $headers = ['Set-Cookie' => 'BEARER=; Max-Age=0; HttpOnly'];
        return $this->json(null, Response::HTTP_NO_CONTENT, $headers);
    }
}
