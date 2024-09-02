<?php

namespace App\Exception;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

class ValidationErrorsException extends HttpException
{
    private array $details = [];
    
    public function __construct(array $errors)
    {
        $this->details = $errors;
        parent::__construct(Response::HTTP_BAD_REQUEST, 'Las validaciones fallaron, por favor verifique la información');
    }

    public function getDetails(): array
    {
        return $this->details;
    }
}
