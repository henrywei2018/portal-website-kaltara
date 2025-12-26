import AdminSidebarLayout from '@/layouts/admin/admin-sidebar-layout';
import { Form, Head, Link, useForm } from '@inertiajs/react';
import { type FormEvent } from 'react';

type BlockItem = {
    type: string;
    content: string;
};

type PageItem = {
    id: number;
    title: string;
    slug: string;
    status: string;
    blocks: BlockItem[];
    updated_at: string | null;
};

type PageFormData = {
    title: string;
    slug: string;
    status: string;
    blocks: BlockItem[];
};

const statusOptions = [
    { value: 'draft', label: 'Draf' },
    { value: 'published', label: 'Terbit' },
];

const blockOptions = [
    { value: 'heading', label: 'Heading' },
    { value: 'paragraph', label: 'Paragraf' },
    { value: 'list', label: 'Daftar' },
    { value: 'quote', label: 'Kutipan' },
];

function PageCard({ page }: { page: PageItem }) {
    const form = useForm<PageFormData>({
        title: page.title,
        slug: page.slug,
        status: page.status,
        blocks: page.blocks ?? [],
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();
        form.patch(`/admin/pages/${page.id}`);
    };

    const addBlock = (type: string) => {
        form.setData('blocks', [...form.data.blocks, { type, content: '' }]);
    };

    const updateBlock = (index: number, key: keyof BlockItem, value: string) => {
        const nextBlocks = form.data.blocks.map((block, blockIndex) =>
            blockIndex === index ? { ...block, [key]: value } : block
        );
        form.setData('blocks', nextBlocks);
    };

    const removeBlock = (index: number) => {
        form.setData(
            'blocks',
            form.data.blocks.filter((_, blockIndex) => blockIndex !== index)
        );
    };

    return (
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_12px_24px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p className="text-sm font-semibold text-[#123726] dark:text-white">{page.title}</p>
                    <p className="text-xs text-[#587166] dark:text-[#b0c2b8]">/{page.slug}</p>
                </div>
                <div className="text-xs text-[#567365] dark:text-[#b0c2b8]">
                    {page.updated_at ? `Terakhir diperbarui: ${page.updated_at}` : 'Baru dibuat'}
                </div>
            </div>

            <form onSubmit={submit} className="mt-4 grid gap-4">
                <div className="grid gap-4 md:grid-cols-3">
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
                            {statusOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="rounded-2xl border border-black/5 bg-[#f6f8f7] p-4 dark:border-white/10 dark:bg-white/10">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                            Blok Konten
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {blockOptions.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => addBlock(option.value)}
                                    className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-[#123726] transition hover:border-black/20 dark:border-white/20 dark:text-white"
                                >
                                    + {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 space-y-4">
                        {form.data.blocks.length === 0 && (
                            <p className="text-xs text-[#587166] dark:text-[#b0c2b8]">
                                Belum ada blok. Tambahkan blok sesuai kebutuhan halaman.
                            </p>
                        )}
                        {form.data.blocks.map((block, index) => (
                            <div
                                key={`${block.type}-${index}`}
                                className="rounded-xl border border-black/5 bg-white p-4 dark:border-white/10 dark:bg-white/5"
                            >
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <select
                                        value={block.type}
                                        onChange={(event) =>
                                            updateBlock(index, 'type', event.target.value)
                                        }
                                        className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                                    >
                                        {blockOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        type="button"
                                        onClick={() => removeBlock(index)}
                                        className="text-xs font-semibold text-red-600 dark:text-red-200"
                                    >
                                        Hapus Blok
                                    </button>
                                </div>
                                <textarea
                                    value={block.content}
                                    onChange={(event) =>
                                        updateBlock(index, 'content', event.target.value)
                                    }
                                    rows={4}
                                    className="mt-3 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                                    placeholder="Tulis isi blok di sini..."
                                />
                            </div>
                        ))}
                    </div>
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
                        onClick={() => form.delete(`/admin/pages/${page.id}`)}
                        className="rounded-full border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 transition hover:border-red-300 disabled:cursor-not-allowed disabled:opacity-70 dark:border-red-400/50 dark:text-red-200"
                    >
                        Hapus
                    </button>
                </div>
            </form>
        </div>
    );
}

export default function AdminPagesIndex({ pages }: { pages: PageItem[] }) {
    return (
        <AdminSidebarLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/admin' },
                { title: 'Halaman', href: '/admin/pages' },
            ]}
        >
            <Head title="Manajemen Halaman" />

            <header className="rounded-3xl border border-black/5 bg-white/90 p-8 shadow-[0_18px_40px_rgba(15,107,79,0.12)] dark:border-white/10 dark:bg-white/5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                    Admin CMS
                </p>
                <h1 className="mt-3 font-['Unbounded'] text-3xl text-[#0b2d1d] dark:text-white">
                    Manajemen Halaman Dinamis
                </h1>
                <p className="mt-3 max-w-2xl text-sm text-[#587166] dark:text-[#b0c2b8]">
                    Kelola judul, slug, status, dan konten blok setiap halaman portal.
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

            <section className="mt-8 rounded-2xl border border-black/5 bg-white p-6 shadow-[0_12px_24px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5">
                <h2 className="text-lg font-semibold text-[#123726] dark:text-white">
                    Tambah Halaman Baru
                </h2>
                <Form method="post" action="/admin/pages" className="mt-6 grid gap-4">
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
                                        placeholder="Contoh: Profil Pemerintah"
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
                                        placeholder="profil-pemerintah"
                                    />
                                </div>
                            </div>
                            <div className="grid gap-4 md:grid-cols-3">
                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                        Status
                                    </label>
                                    <select
                                        name="status"
                                        defaultValue="draft"
                                        className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                                    >
                                        {statusOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-full bg-[#0f6b4f] px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(15,107,79,0.2)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    Simpan Halaman
                                </button>
                            </div>
                        </>
                    )}
                </Form>
            </section>

            <section className="mt-8 space-y-4">
                {pages.map((page) => (
                    <PageCard key={page.id} page={page} />
                ))}
            </section>
        </AdminSidebarLayout>
    );
}
