<?php

namespace App\Security;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use Symfony\Component\Security\Http\Authentication\AuthenticationFailureHandlerInterface;

class JsonLoginFailureHandler implements AuthenticationFailureHandlerInterface
{
    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): Response
    {
        if ($exception instanceof BadCredentialsException) {
            return new JsonResponse(['message' => 'Credenciales incorrectas.'], Response::HTTP_UNAUTHORIZED);
        }
        return new JsonResponse(['message' => $exception->getMessageKey()], Response::HTTP_UNAUTHORIZED);
    }
}
