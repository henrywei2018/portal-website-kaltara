import AdminSidebarLayout from '@/layouts/admin/admin-sidebar-layout';
import { Form, Head, Link } from '@inertiajs/react';

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
};

export default function AdminUsersIndex({
    users,
    roles,
}: {
    users: UserItem[];
    roles: RoleOption[];
}) {
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
                <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                        href="/admin"
                        className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-[#123726] transition hover:border-black/20 dark:border-white/20 dark:text-white"
                    >
                        Kembali ke Dashboard
                    </Link>
                </div>
            </header>

            <div className="mt-8 space-y-4">
                {users.map((user) => (
                    <Form
                        key={user.id}
                        method="patch"
                        action={`/admin/users/${user.id}`}
                        className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_12px_24px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5"
                    >
                        {({ processing }) => (
                            <div className="grid gap-4 md:grid-cols-[1.4fr_1fr_1fr_auto] md:items-center">
                                <div>
                                    <p className="text-sm font-semibold text-[#123726] dark:text-white">
                                        {user.name}
                                    </p>
                                    <p className="text-xs text-[#587166] dark:text-[#b0c2b8]">
                                        {user.email}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                        Role
                                    </label>
                                    <select
                                        name="role"
                                        defaultValue={user.role}
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
                                    <div className="mt-3 flex items-center gap-2 text-sm">
                                        <input type="hidden" name="is_active" value="0" />
                                        <input
                                            id={`active-${user.id}`}
                                            type="checkbox"
                                            name="is_active"
                                            value="1"
                                            defaultChecked={user.is_active}
                                            className="h-4 w-4 rounded border-black/20 text-[#0f6b4f]"
                                        />
                                        <label
                                            htmlFor={`active-${user.id}`}
                                            className="text-[#123726] dark:text-white"
                                        >
                                            Aktif
                                        </label>
                                    </div>
                                </div>
                                <div className="flex justify-start md:justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-full bg-[#0f6b4f] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(15,107,79,0.2)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
                                    >
                                        Simpan
                                    </button>
                                </div>
                            </div>
                        )}
                    </Form>
                ))}
            </div>
        </AdminSidebarLayout>
    );
}
