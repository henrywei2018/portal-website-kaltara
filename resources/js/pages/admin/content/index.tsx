import { AdminActionMenu } from '@/components/admin/admin-action-menu';
import { AdminList, AdminListItem } from '@/components/admin/admin-list';
import { AdminSlideOver } from '@/components/admin/admin-slide-over';
import AdminSidebarLayout from '@/layouts/admin/admin-sidebar-layout';
import { Form, Head, useForm } from '@inertiajs/react';
import { type FormEvent, useEffect, useState } from 'react';

type OptionItem = {
    value: string;
    label: string;
};

type ContentItem = {
    id: number;
    title: string;
    slug: string;
    type: string;
    status: string;
    excerpt: string | null;
    body: string | null;
    published_at: string | null;
    meta: string;
};

type ContentForm = {
    title: string;
    slug: string;
    type: string;
    status: string;
    excerpt: string;
    body: string;
};

const emptyForm: ContentForm = {
    title: '',
    slug: '',
    type: 'news',
    status: 'draft',
    excerpt: '',
    body: '',
};

export default function AdminContentIndex({
    items,
    types,
    statuses,
    listMode: _listMode,
    filters,
}: {
    items: ContentItem[];
    types: OptionItem[];
    statuses: OptionItem[];
    listMode: 'cards' | 'table';
    filters: {
        search: string;
        type: string | null;
        status: string | null;
    };
}) {
    const [activeItem, setActiveItem] = useState<ContentItem | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const form = useForm<ContentForm>(emptyForm);

    useEffect(() => {
        if (activeItem) {
            form.setData({
                title: activeItem.title,
                slug: activeItem.slug,
                type: activeItem.type,
                status: activeItem.status,
                excerpt: activeItem.excerpt ?? '',
                body: activeItem.body ?? '',
            });
            return;
        }

        if (isCreateOpen) {
            form.setData({ ...emptyForm, type: types[0]?.value ?? 'news', status: statuses[0]?.value ?? 'draft' });
        }
    }, [activeItem, isCreateOpen, types, statuses]);

    const closeModal = () => {
        setIsCreateOpen(false);
        setActiveItem(null);
        form.reset();
    };

    const submit = (event: FormEvent) => {
        event.preventDefault();

        if (activeItem) {
            form.patch(`/admin/content/${activeItem.id}`);
            return;
        }

        form.post('/admin/content');
    };

    return (
        <AdminSidebarLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/admin' },
                { title: 'Konten', href: '/admin/content' },
            ]}
        >
            <Head title="Manajemen Konten" />

            <header className="rounded-3xl border border-black/5 bg-white/90 p-8 shadow-[0_18px_40px_rgba(15,107,79,0.12)] dark:border-white/10 dark:bg-white/5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                    Admin CMS
                </p>
                <h1 className="mt-3 font-['Unbounded'] text-3xl text-[#0b2d1d] dark:text-white">
                    Manajemen Konten Publik
                </h1>
                <p className="mt-3 max-w-2xl text-sm text-[#587166] dark:text-[#b0c2b8]">
                    Kelola berita, artikel, dan pengumuman dari satu dashboard.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={() => setIsCreateOpen(true)}
                        className="rounded-full bg-[#0f6b4f] px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(15,107,79,0.2)] transition hover:brightness-95"
                    >
                        Tambah Konten
                    </button>
                </div>
            </header>

            <section className="mt-6 rounded-2xl border border-black/5 bg-white p-6 shadow-[0_12px_24px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5">
                <h2 className="text-lg font-semibold text-[#123726] dark:text-white">
                    Pencarian & Filter
                </h2>
                <form
                    method="get"
                    action="/admin/content"
                    className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_0.8fr_0.8fr_auto]"
                >
                    <div>
                        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                            Kata Kunci
                        </label>
                        <input
                            name="q"
                            defaultValue={filters.search}
                            placeholder="Cari judul atau slug..."
                            className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                            Kategori
                        </label>
                        <select
                            name="type"
                            defaultValue={filters.type ?? ''}
                            className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                        >
                            <option value="">Semua kategori</option>
                            {types.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
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
                            <option value="">Semua status</option>
                            {statuses.map((option) => (
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
                            href="/admin/content"
                            className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold text-[#123726] transition hover:border-black/20 dark:border-white/20 dark:text-white"
                        >
                            Reset
                        </a>
                    </div>
                </form>
            </section>

            <section className="mt-8">
                <AdminList
                    title="Daftar Konten"
                    description="List ringkas untuk memantau status publikasi konten."
                    count={items.length}
                >
                    {items.map((item) => (
                        <AdminListItem
                            key={item.id}
                            title={item.title}
                            subtitle={`/${item.slug}`}
                            meta={item.meta}
                            actions={
                                <AdminActionMenu
                                    items={[
                                        {
                                            label: 'Edit',
                                            onSelect: () => setActiveItem(item),
                                        },
                                        {
                                            label: 'Hapus',
                                            tone: 'danger',
                                            onSelect: () => {
                                                const formElement = document.getElementById(
                                                    `delete-content-${item.id}`
                                                ) as HTMLFormElement | null;

                                                formElement?.requestSubmit();
                                            },
                                        },
                                    ]}
                                />
                            }
                        >
                            <span>{item.excerpt ?? 'Ringkasan belum diisi.'}</span>
                            <Form
                                id={`delete-content-${item.id}`}
                                action={`/admin/content/${item.id}`}
                                className="hidden"
                                method="delete"
                            />
                        </AdminListItem>
                    ))}
                </AdminList>
            </section>

            <AdminSlideOver
                open={isCreateOpen || Boolean(activeItem)}
                onOpenChange={(open) => {
                    if (!open) {
                        closeModal();
                    }
                }}
                title={activeItem ? 'Edit Konten' : 'Tambah Konten'}
                description={
                    activeItem
                        ? 'Perbarui judul, status, kategori, dan konten utama.'
                        : 'Buat konten baru untuk publikasi.'
                }
            >
                <form onSubmit={submit} className="grid gap-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                Judul
                            </label>
                            <input
                                name="title"
                                required
                                value={form.data.title}
                                onChange={(event) => form.setData('title', event.target.value)}
                                className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                Slug
                            </label>
                            <input
                                name="slug"
                                required
                                value={form.data.slug}
                                onChange={(event) => form.setData('slug', event.target.value)}
                                className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                            />
                        </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                Kategori
                            </label>
                            <select
                                name="type"
                                value={form.data.type}
                                onChange={(event) => form.setData('type', event.target.value)}
                                className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                            >
                                {types.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
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
                                value={form.data.status}
                                onChange={(event) => form.setData('status', event.target.value)}
                                className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                            >
                                {statuses.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                            Ringkasan
                        </label>
                        <textarea
                            name="excerpt"
                            value={form.data.excerpt}
                            onChange={(event) => form.setData('excerpt', event.target.value)}
                            rows={3}
                            className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                            Konten Markdown
                        </label>
                        <textarea
                            name="body"
                            value={form.data.body}
                            onChange={(event) => form.setData('body', event.target.value)}
                            rows={8}
                            className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                            placeholder="Tulis konten Markdown di sini..."
                        />
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="rounded-full bg-[#0f6b4f] px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(15,107,79,0.2)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {activeItem ? 'Simpan Perubahan' : 'Simpan Konten'}
                        </button>
                        <button
                            type="button"
                            onClick={closeModal}
                            className="rounded-full border border-black/10 px-5 py-2 text-sm font-semibold text-[#123726] transition hover:border-black/20 dark:border-white/20 dark:text-white"
                        >
                            Batal
                        </button>
                    </div>
                </form>
            </AdminSlideOver>

        </AdminSidebarLayout>
    );
}
