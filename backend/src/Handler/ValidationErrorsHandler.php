<?php

namespace App\Handler;

use App\Exception\ValidationErrorsException;
use Symfony\Component\Validator\ConstraintViolationListInterface;

class ValidationErrorsHandler
{
    public function handle(ConstraintViolationListInterface $errors): void
    {
        $errorsArray = [];
        foreach ($errors as $error) {
            $errorsArray[$error->getPropertyPath()] = $error->getMessage();
        }

        throw new ValidationErrorsException($errorsArray);
    }
}
