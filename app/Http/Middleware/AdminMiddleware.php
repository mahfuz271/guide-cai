<?php

namespace App\Http\Middleware;

use App\Enums\UserEnum;
use Closure;
use Illuminate\Http\Request;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->user() && $request->user()->role == UserEnum::ADMIN) {
            return $next($request);
        }

        throw new \App\Exceptions\AuthorizationException('Forbidden');
    }
}
