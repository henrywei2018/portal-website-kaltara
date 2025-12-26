<?php

namespace App\Http\Controllers\Admin;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class UserManagementController extends Controller
{
    public function index(): Response
    {
        $users = User::query()
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString()
            ->through(fn (User $user): array => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role?->value ?? UserRole::Viewer->value,
                'is_active' => $user->is_active,
                'meta' => sprintf(
                    '%s · %s',
                    ($user->role ?? UserRole::Viewer)->label(),
                    $user->is_active ? 'Aktif' : 'Nonaktif',
                ),
            ]);

        return Inertia::render('admin/users/index', [
            'users' => $users,
            'roles' => UserRole::options(),
            'listStyle' => 'compact',
            'actionMode' => 'dropdown',
            'modalMode' => 'slide-over',
            'filterMode' => 'drawer',
        ]);
    }

    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $user->update($request->validated());

        return back(303);
    }
}
