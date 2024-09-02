<?php

namespace App\Exception;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

class EmailInUseException extends HttpException
{
    public function __construct(string $email)
    {
        $message = sprintf('El email %s ya se encuentra registrado.', $email);
        parent::__construct(Response::HTTP_CONFLICT, $message);
    }
}