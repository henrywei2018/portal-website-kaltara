import AdminSidebarLayout from '@/layouts/admin/admin-sidebar-layout';
import { Form, Head, Link, useForm } from '@inertiajs/react';
import { type FormEvent, useState } from 'react';

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
};

type ContentForm = {
    title: string;
    slug: string;
    type: string;
    status: string;
    excerpt: string;
    body: string;
};

function ContentCard({
    item,
    types,
    statuses,
}: {
    item: ContentItem;
    types: OptionItem[];
    statuses: OptionItem[];
}) {
    const form = useForm<ContentForm>({
        title: item.title,
        slug: item.slug,
        type: item.type,
        status: item.status,
        excerpt: item.excerpt ?? '',
        body: item.body ?? '',
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();
        form.patch(`/admin/content/${item.id}`);
    };

    return (
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_12px_24px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p className="text-sm font-semibold text-[#123726] dark:text-white">{item.title}</p>
                    <p className="text-xs text-[#587166] dark:text-[#b0c2b8]">/{item.slug}</p>
                </div>
                <div className="text-xs text-[#567365] dark:text-[#b0c2b8]">
                    {item.published_at ? `Terbit: ${item.published_at}` : 'Belum diterbitkan'}
                </div>
            </div>

            <form onSubmit={submit} className="mt-4 grid gap-4">
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
                <div className="grid gap-4 md:grid-cols-3">
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
                        rows={6}
                        className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                        placeholder="Tulis konten Markdown di sini..."
                    />
                </div>
                <div className="flex flex-wrap gap-3">
                    <button
                        type="submit"
                        disabled={form.processing}
                        className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold text-[#123726] transition hover:border-black/20 disabled:cursor-not-allowed disabled:opacity-70 dark:border-white/20 dark:text-white"
                    >
                        Simpan Perubahan
                    </button>
                    <button
                        type="button"
                        disabled={form.processing}
                        onClick={() => form.delete(`/admin/content/${item.id}`)}
                        className="rounded-full border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 transition hover:border-red-300 disabled:cursor-not-allowed disabled:opacity-70 dark:border-red-400/50 dark:text-red-200"
                    >
                        Hapus
                    </button>
                </div>
            </form>
        </div>
    );
}

export default function AdminContentIndex({
    items,
    types,
    statuses,
    listMode,
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
    const [activeItemId, setActiveItemId] = useState<number | null>(items[0]?.id ?? null);
    const activeItem = items.find((item) => item.id === activeItemId) ?? null;

    const typeLabel = (value: string) => types.find((type) => type.value === value)?.label ?? value;
    const statusLabel = (value: string) =>
        statuses.find((status) => status.value === value)?.label ?? value;

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
                    <Link
                        href="/admin"
                        className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-[#123726] transition hover:border-black/20 dark:border-white/20 dark:text-white"
                    >
                        Kembali ke Dashboard
                    </Link>
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
                        <Link
                            href="/admin/content"
                            className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold text-[#123726] transition hover:border-black/20 dark:border-white/20 dark:text-white"
                        >
                            Reset
                        </Link>
                    </div>
                </form>
            </section>

            <section className="mt-8 rounded-2xl border border-black/5 bg-white p-6 shadow-[0_12px_24px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5">
                <h2 className="text-lg font-semibold text-[#123726] dark:text-white">
                    Tambah Konten Baru
                </h2>
                <Form method="post" action="/admin/content" className="mt-6 grid gap-4">
                    {({ processing }) => (
                        <>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                        Judul
                                    </label>
                                    <input
                                        name="title"
                                        required
                                        className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                                        placeholder="Judul konten"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                        Slug
                                    </label>
                                    <input
                                        name="slug"
                                        required
                                        className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                                        placeholder="judul-konten"
                                    />
                                </div>
                            </div>
                            <div className="grid gap-4 md:grid-cols-3">
                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                        Kategori
                                    </label>
                                    <select
                                        name="type"
                                        defaultValue={types[0]?.value}
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
                                        defaultValue={statuses[0]?.value}
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
                                    rows={3}
                                    className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                                    placeholder="Ringkasan singkat konten"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                    Konten Markdown
                                </label>
                                <textarea
                                    name="body"
                                    rows={6}
                                    className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                                    placeholder="Tulis konten Markdown di sini..."
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-full bg-[#0f6b4f] px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(15,107,79,0.2)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    Simpan Konten
                                </button>
                            </div>
                        </>
                    )}
                </Form>
            </section>

            {listMode === 'table' ? (
                <section className="mt-8 grid gap-6">
                    <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-[0_12px_24px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5">
                        <div className="flex flex-wrap items-center justify-between gap-3 px-2 py-4">
                            <div>
                                <h2 className="text-lg font-semibold text-[#123726] dark:text-white">
                                    Daftar Konten
                                </h2>
                                <p className="text-xs text-[#587166] dark:text-[#b0c2b8]">
                                    Mode tabel memudahkan audit banyak konten sekaligus.
                                </p>
                            </div>
                            <span className="rounded-full bg-[#e6f1ec] px-3 py-1 text-xs font-semibold text-[#0f6b4f] dark:bg-white/10 dark:text-white">
                                {items.length} Konten
                            </span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left text-xs text-[#123726] dark:text-white">
                                <thead className="text-[0.65rem] uppercase tracking-[0.2em] text-[#567365] dark:text-[#b0c2b8]">
                                    <tr>
                                        <th className="px-3 py-2">Judul</th>
                                        <th className="px-3 py-2">Kategori</th>
                                        <th className="px-3 py-2">Status</th>
                                        <th className="px-3 py-2">Terbit</th>
                                        <th className="px-3 py-2 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-black/5 dark:divide-white/10">
                                    {items.map((item) => (
                                        <tr
                                            key={item.id}
                                            className={
                                                item.id === activeItemId
                                                    ? 'bg-[#f6f8f7] dark:bg-white/10'
                                                    : 'bg-transparent'
                                            }
                                        >
                                            <td className="px-3 py-3 font-semibold">{item.title}</td>
                                            <td className="px-3 py-3 text-[#587166] dark:text-[#b0c2b8]">
                                                {typeLabel(item.type)}
                                            </td>
                                            <td className="px-3 py-3">
                                                <span className="rounded-full border border-black/10 px-2 py-1 text-[0.65rem] font-semibold text-[#123726] dark:border-white/20 dark:text-white">
                                                    {statusLabel(item.status)}
                                                </span>
                                            </td>
                                            <td className="px-3 py-3 text-[#587166] dark:text-[#b0c2b8]">
                                                {item.published_at ?? '-'}
                                            </td>
                                            <td className="px-3 py-3 text-right">
                                                <button
                                                    type="button"
                                                    onClick={() => setActiveItemId(item.id)}
                                                    className="rounded-full bg-[#0f6b4f] px-3 py-1 text-[0.65rem] font-semibold text-white shadow-[0_8px_20px_rgba(15,107,79,0.18)] transition hover:brightness-95"
                                                >
                                                    Kelola
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {activeItem ? (
                        <ContentCard item={activeItem} types={types} statuses={statuses} />
                    ) : (
                        <div className="rounded-2xl border border-dashed border-black/10 bg-white/70 p-6 text-sm text-[#587166] dark:border-white/20 dark:bg-white/5 dark:text-[#b0c2b8]">
                            Pilih konten dari tabel untuk mengedit detailnya.
                        </div>
                    )}
                </section>
            ) : (
                <section className="mt-8 space-y-4">
                    {items.map((item) => (
                        <ContentCard key={item.id} item={item} types={types} statuses={statuses} />
                    ))}
                </section>
            )}
        </AdminSidebarLayout>
    );
}
