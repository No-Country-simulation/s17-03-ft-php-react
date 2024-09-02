<?php

namespace App\Exception;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

class ImagesLimitException extends HttpException
{
    const ERROR_MESSAGE = 'El post ya posee 5 imágenes, intenta eliminar otra para poder subir una nueva.';

    public function __construct()
    {
        parent::__construct(Response::HTTP_BAD_REQUEST, self::ERROR_MESSAGE);
    }
}