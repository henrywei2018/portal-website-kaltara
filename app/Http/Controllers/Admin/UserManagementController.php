<?php

namespace App\Http\Controllers\Admin;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class UserManagementController extends Controller
{
    public function index(Request $request): Response
    {
        $search = trim((string) $request->query('q', ''));
        $role = UserRole::tryFrom((string) $request->query('role'));
        $status = $request->query('status');

        $selectedStatus = in_array($status, ['active', 'inactive'], true)
            ? $status
            : null;

        $usersQuery = User::query()->orderBy('name');

        if ($search !== '') {
            $needle = Str::lower($search);

            $usersQuery->where(function ($query) use ($needle) {
                $query->whereRaw('lower(name) like ?', ["%{$needle}%"])
                    ->orWhereRaw('lower(email) like ?', ["%{$needle}%"]);
            });
        }

        if ($role) {
            $usersQuery->where('role', $role->value);
        }

        if ($selectedStatus !== null) {
            $usersQuery->where('is_active', $selectedStatus === 'active');
        }

        $users = $usersQuery
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
            'filters' => [
                'search' => $search,
                'role' => $role?->value,
                'status' => $selectedStatus,
            ],
        ]);
    }

    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $user->update($request->validated());

        return back(303);
    }
}
