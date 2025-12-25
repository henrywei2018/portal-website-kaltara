<?php

namespace App\Providers;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::define('access-admin', function (User $user): bool {
            return $user->is_active && in_array($user->role, UserRole::cases(), true);
        });

        Gate::define('manage-users', function (User $user): bool {
            return $user->is_active && $user->role === UserRole::SuperAdmin;
        });

        Gate::define('manage-navigation', function (User $user): bool {
            return $user->is_active && in_array($user->role, [UserRole::SuperAdmin, UserRole::Editor], true);
        });
    }
}
