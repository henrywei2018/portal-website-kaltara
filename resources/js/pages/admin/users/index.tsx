import { AdminActionMenu } from '@/components/admin/admin-action-menu';
import { AdminList, AdminListItem } from '@/components/admin/admin-list';
import { AdminPagination } from '@/components/admin/admin-pagination';
import { AdminSlideOver } from '@/components/admin/admin-slide-over';
import AdminSidebarLayout from '@/layouts/admin/admin-sidebar-layout';
import { Form, Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';

type RoleOption = {
    value: string;
    label: string;
};

type UserItem = {
    id: number;
    name: string;
    email: string;
    role: string;
    is_active: boolean;
    meta: string;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PaginationMeta = {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
};

type PaginatedUsers = {
    data: UserItem[];
    links: PaginationLink[];
    current_page: PaginationMeta['current_page'];
    last_page: PaginationMeta['last_page'];
    per_page: PaginationMeta['per_page'];
    total: PaginationMeta['total'];
    from: PaginationMeta['from'];
    to: PaginationMeta['to'];
};

export default function AdminUsersIndex({
    users,
    roles,
    listMode: _listMode,
    filters,
}: {
    users: PaginatedUsers;
    roles: RoleOption[];
    listMode: 'cards' | 'table';
    filters: {
        search: string;
        role: string | null;
        status: string | null;
    };
}) {
    const [activeUser, setActiveUser] = useState<UserItem | null>(null);
    const roleLabels = useMemo(
        () => new Map(roles.map((role) => [role.value, role.label])),
        [roles]
    );
    const statusOptions = [
        { value: '', label: 'Semua status' },
        { value: 'active', label: 'Aktif' },
        { value: 'inactive', label: 'Nonaktif' },
    ];

    return (
        <AdminSidebarLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/admin' },
                { title: 'Pengguna', href: '/admin/users' },
            ]}
        >
            <Head title="Manajemen Pengguna" />

            <header className="rounded-3xl border border-black/5 bg-white/90 p-8 shadow-[0_18px_40px_rgba(15,107,79,0.12)] dark:border-white/10 dark:bg-white/5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                    Admin CMS
                </p>
                <h1 className="mt-3 font-['Unbounded'] text-3xl text-[#0b2d1d] dark:text-white">
                    Manajemen Pengguna & Role
                </h1>
                <p className="mt-3 max-w-2xl text-sm text-[#587166] dark:text-[#b0c2b8]">
                    Atur role dan status aktif setiap akun admin dari satu tempat.
                </p>
                <div className="mt-6 flex flex-wrap gap-3" />
            </header>

            <section className="mt-8 rounded-2xl border border-black/5 bg-white p-6 shadow-[0_12px_24px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5">
                <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-sm font-semibold text-[#123726] dark:text-white">
                        Pencarian & Filter
                    </h2>
                    <p className="text-xs text-[#587166] dark:text-[#b0c2b8]">
                        Cari user admin berdasarkan nama, email, atau role.
                    </p>
                </div>
                <form
                    action="/admin/users"
                    className="mt-4 grid gap-4 md:grid-cols-[1.2fr_1fr_1fr_auto]"
                >
                    <div>
                        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                            Pencarian
                        </label>
                        <input
                            name="q"
                            placeholder="Cari nama atau email..."
                            defaultValue={filters.search}
                            className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                            Role
                        </label>
                        <select
                            name="role"
                            defaultValue={filters.role ?? ''}
                            className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                        >
                            <option value="">Semua role</option>
                            {roles.map((role) => (
                                <option key={role.value} value={role.value}>
                                    {role.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                            Status
                        </label>
                        <select
                            name="status"
                            defaultValue={filters.status ?? ''}
                            className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                        >
                            {statusOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-wrap items-end gap-3">
                        <button
                            type="submit"
                            className="rounded-full bg-[#0f6b4f] px-5 py-2 text-xs font-semibold text-white shadow-[0_10px_24px_rgba(15,107,79,0.2)] transition hover:brightness-95"
                        >
                            Terapkan
                        </button>
                        <a
                            href="/admin/users"
                            className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold text-[#123726] transition hover:border-black/20 dark:border-white/20 dark:text-white"
                        >
                            Reset
                        </a>
                    </div>
                </form>
            </section>

            <section className="mt-8">
                <AdminList
                    title="Daftar Pengguna"
                    description="Daftar akun admin beserta role dan status aktif."
                    count={users.total}
                >
                    {users.data.map((user) => (
                        <AdminListItem
                            key={user.id}
                            title={user.name}
                            subtitle={user.email}
                            meta={user.meta}
                            actions={
                                <AdminActionMenu
                                    items={[
                                        {
                                            label: 'Edit',
                                            onSelect: () => setActiveUser(user),
                                        },
                                    ]}
                                />
                            }
                        >
                            <span>Role: {roleLabels.get(user.role) ?? user.role}</span>
                            <span className="ml-3">
                                Status: {user.is_active ? 'Aktif' : 'Nonaktif'}
                            </span>
                        </AdminListItem>
                    ))}
                </AdminList>
                <AdminPagination pagination={users} />
            </section>

            <AdminSlideOver
                open={Boolean(activeUser)}
                onOpenChange={(open) => {
                    if (!open) {
                        setActiveUser(null);
                    }
                }}
                title="Perbarui Role & Status"
                description="Atur role dan status aktif pengguna admin."
            >
                {activeUser ? (
                    <Form
                        key={activeUser.id}
                        method="patch"
                        action={`/admin/users/${activeUser.id}`}
                        className="grid gap-4"
                    >
                        {({ processing }) => (
                            <>
                                <div className="rounded-2xl border border-black/5 bg-[#f6faf8] px-4 py-3 text-xs text-[#567365] dark:border-white/10 dark:bg-white/5 dark:text-[#b0c2b8]">
                                    Mengubah akun{' '}
                                    <span className="font-semibold text-[#123726] dark:text-white">
                                        {activeUser.name}
                                    </span>{' '}
                                    ({activeUser.email})
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                            Role
                                        </label>
                                        <select
                                            name="role"
                                            defaultValue={activeUser.role}
                                            className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                                        >
                                            {roles.map((role) => (
                                                <option key={role.value} value={role.value}>
                                                    {role.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                            Status
                                        </label>
                                        <select
                                            name="is_active"
                                            defaultValue={activeUser.is_active ? 1 : 0}
                                            className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                                        >
                                            <option value="1">Aktif</option>
                                            <option value="0">Nonaktif</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-full bg-[#0f6b4f] px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(15,107,79,0.2)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
                                    >
                                        Simpan Perubahan
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setActiveUser(null)}
                                        className="rounded-full border border-black/10 px-5 py-2 text-sm font-semibold text-[#123726] transition hover:border-black/20 dark:border-white/20 dark:text-white"
                                    >
                                        Batal
                                    </button>
                                </div>
                            </>
                        )}
                    </Form>
                ) : null}
            </AdminSlideOver>
        </AdminSidebarLayout>
    );
}
