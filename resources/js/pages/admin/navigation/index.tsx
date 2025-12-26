import { AdminActionMenu } from '@/components/admin/admin-action-menu';
import { AdminList, AdminListItem } from '@/components/admin/admin-list';
import { AdminPagination } from '@/components/admin/admin-pagination';
import { AdminSlideOver } from '@/components/admin/admin-slide-over';
import AdminSidebarLayout from '@/layouts/admin/admin-sidebar-layout';
import { Form, Head } from '@inertiajs/react';
import { useState } from 'react';

type ParentOption = {
    id: number;
    label: string;
};

type NavigationItem = {
    id: number;
    parent_id: number | null;
    parent_label: string | null;
    label: string;
    slug: string | null;
    url: string | null;
    is_external: boolean;
    is_visible: boolean;
    sort_order: number;
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

type PaginatedNavigation = {
    data: NavigationItem[];
    links: PaginationLink[];
    current_page: PaginationMeta['current_page'];
    last_page: PaginationMeta['last_page'];
    per_page: PaginationMeta['per_page'];
    total: PaginationMeta['total'];
    from: PaginationMeta['from'];
    to: PaginationMeta['to'];
};

export default function NavigationIndex({
    items,
    parents,
    listMode,
    filters,
}: {
    items: PaginatedNavigation;
    parents: ParentOption[];
    listMode: 'cards' | 'table';
    filters: {
        search: string;
        visibility: string | null;
    };
}) {
    const [activeItem, setActiveItem] = useState<NavigationItem | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    return (
        <AdminSidebarLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/admin' },
                { title: 'Navigasi', href: '/admin/navigation' },
            ]}
        >
            <Head title="Manajemen Navigasi" />

            <header className="rounded-3xl border border-black/5 bg-white/90 p-8 shadow-[0_18px_40px_rgba(15,107,79,0.12)] dark:border-white/10 dark:bg-white/5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                    Admin CMS
                </p>
                <h1 className="mt-3 font-['Unbounded'] text-3xl text-[#0b2d1d] dark:text-white">
                    Manajemen Menu Navigasi
                </h1>
                <p className="mt-3 max-w-2xl text-sm text-[#587166] dark:text-[#b0c2b8]">
                    Tambah dan atur urutan menu utama serta submenu untuk portal publik.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={() => setIsCreateOpen(true)}
                        className="rounded-full bg-[#0f6b4f] px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(15,107,79,0.2)] transition hover:brightness-95"
                    >
                        Tambah Menu
                    </button>
                </div>
            </header>

            <section className="mt-8">
                <AdminList
                    title="Daftar Menu"
                    description="List ringkas dengan aksi cepat untuk mengelola navigasi."
                    count={items.total}
                >
                    {items.data.map((item) => (
                        <AdminListItem
                            key={item.id}
                            title={item.label}
                            subtitle={item.parent_label ? `Submenu dari ${item.parent_label}` : 'Menu utama'}
                            meta={item.meta}
                            actions={
                                <AdminActionMenu
                                    items={[
                                        {
                                            label: 'Edit',
                                            onSelect: () => setActiveItem(item),
                                        },
                                        {
                                            label: item.is_visible ? 'Sembunyikan' : 'Tampilkan',
                                            onSelect: () => {
                                                const form = document.getElementById(
                                                    `toggle-visibility-${item.id}`
                                                ) as HTMLFormElement | null;

                                                form?.requestSubmit();
                                            },
                                        },
                                        {
                                            label: 'Hapus',
                                            tone: 'danger',
                                            onSelect: () => {
                                                const form = document.getElementById(
                                                    `delete-navigation-${item.id}`
                                                ) as HTMLFormElement | null;

                                                form?.requestSubmit();
                                            },
                                        },
                                    ]}
                                />
                            }
                        >
                            {item.url && <span>URL: {item.url}</span>}
                            {item.slug && <span className="ml-3">Slug: {item.slug}</span>}
                            {item.is_external && <span className="ml-3">External</span>}
                            <Form
                                id={`toggle-visibility-${item.id}`}
                                method="patch"
                                action={`/admin/navigation/${item.id}`}
                                className="hidden"
                            >
                                <input type="hidden" name="label" value={item.label} />
                                <input type="hidden" name="parent_id" value={item.parent_id ?? ''} />
                                <input type="hidden" name="slug" value={item.slug ?? ''} />
                                <input type="hidden" name="url" value={item.url ?? ''} />
                                <input type="hidden" name="is_external" value={item.is_external ? 1 : 0} />
                                <input type="hidden" name="is_visible" value={item.is_visible ? 0 : 1} />
                                <input type="hidden" name="sort_order" value={item.sort_order} />
                            </Form>
                            <Form
                                id={`delete-navigation-${item.id}`}
                                method="delete"
                                action={`/admin/navigation/${item.id}`}
                                className="hidden"
                            />
                        </AdminListItem>
                    ))}
                </AdminList>
                <AdminPagination pagination={items} />
            </section>

            <AdminSlideOver
                open={isCreateOpen || Boolean(activeItem)}
                onOpenChange={(open) => {
                    if (!open) {
                        setIsCreateOpen(false);
                        setActiveItem(null);
                    }
                }}
                title={activeItem ? 'Edit Menu Navigasi' : 'Tambah Menu Navigasi'}
                description={
                    activeItem
                        ? 'Perbarui label, urutan, serta pengaturan visibilitas menu.'
                        : 'Tambahkan menu utama atau submenu baru.'
                }
            >
                <Form
                    method={activeItem ? 'patch' : 'post'}
                    action={
                        activeItem ? `/admin/navigation/${activeItem.id}` : '/admin/navigation'
                    }
                    className="grid gap-4"
                >
                    {({ processing }) => (
                        <>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                        Label
                                    </label>
                                    <input
                                        name="label"
                                        required
                                        defaultValue={activeItem?.label ?? ''}
                                        className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                        Parent Menu
                                    </label>
                                    <select
                                        name="parent_id"
                                        defaultValue={activeItem?.parent_id ?? ''}
                                        className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                                    >
                                        <option value="">Tanpa Parent</option>
                                        {parents.map((parent) => (
                                            <option key={parent.id} value={parent.id}>
                                                {parent.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                        Slug (opsional)
                                    </label>
                                    <input
                                        name="slug"
                                        defaultValue={activeItem?.slug ?? ''}
                                        className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                        URL (opsional)
                                    </label>
                                    <input
                                        name="url"
                                        defaultValue={activeItem?.url ?? ''}
                                        className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                                    />
                                </div>
                            </div>
                            <div className="grid gap-4 md:grid-cols-3">
                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                        External Link
                                    </label>
                                    <select
                                        name="is_external"
                                        defaultValue={activeItem?.is_external ? 1 : 0}
                                        className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                                    >
                                        <option value="0">Tidak</option>
                                        <option value="1">Ya</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                        Tampilkan
                                    </label>
                                    <select
                                        name="is_visible"
                                        defaultValue={activeItem?.is_visible ? 1 : 0}
                                        className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                                    >
                                        <option value="1">Ya</option>
                                        <option value="0">Tidak</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                        Urutan
                                    </label>
                                    <input
                                        type="number"
                                        name="sort_order"
                                        min={0}
                                        defaultValue={activeItem?.sort_order ?? 0}
                                        className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-full bg-[#0f6b4f] px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(15,107,79,0.2)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {activeItem ? 'Simpan Perubahan' : 'Simpan Menu'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsCreateOpen(false);
                                        setActiveItem(null);
                                    }}
                                    className="rounded-full border border-black/10 px-5 py-2 text-sm font-semibold text-[#123726] transition hover:border-black/20 dark:border-white/20 dark:text-white"
                                >
                                    Batal
                                </button>
                            </div>
                        </>
                    )}
                </Form>
            </AdminSlideOver>
        </AdminSidebarLayout>
    );
}
