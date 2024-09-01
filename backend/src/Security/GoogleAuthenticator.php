<?php

namespace App\Security;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\GoogleOAuthService;
use AuthenticationInvalidGoogleTokenException;
use Google\Client;
use InvalidArgumentException;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;

class GoogleAuthenticator extends AbstractAuthenticator
{
    const TARGET_ROUTE = 'sign_in_google';

    public function __construct(
        private Client $googleClient,
        private GoogleOAuthService $googleOAuthService,
        private Security $security
    ) { }

    public function supports(Request $request): ?bool
    {
        return $request->get('_route') === self::TARGET_ROUTE;
    }

    public function authenticate(Request $request): Passport
    {
        $idToken = $request->getPayload()->get('token');

        if (!$idToken) {
            throw new AuthenticationException("No se envió el token."); // TODO: Refactor this to an more specific exception
        }

        /**
         * Throws InvalidArgumentException when google services can't validate the token
         */
        try {
            $user = $this->googleOAuthService->authenticate($idToken);
            $userIdentifier = $user->getUserIdentifier();
            return new SelfValidatingPassport(new UserBadge($userIdentifier));
        } catch (InvalidArgumentException $e) {
            throw new AuthenticationException;
        } catch (AuthenticationException $e) {
            throw new AuthenticationException($e->getMessage(), $e->getCode(), $e);
        } catch (\Exception $e) {
            throw new AuthenticationException("Error al autenticar el usuario", Response::HTTP_UNAUTHORIZED, $e);
        }
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        return null;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        return new JsonResponse(['message' => $exception->getMessageKey()], Response::HTTP_UNAUTHORIZED);
    }
}
