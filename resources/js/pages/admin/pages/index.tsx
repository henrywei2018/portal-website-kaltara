import { Form, Head, Link } from '@inertiajs/react';

type PageItem = {
    id: number;
    title: string;
    slug: string;
    status: string;
    updated_at: string | null;
};

const statusOptions = [
    { value: 'draft', label: 'Draf' },
    { value: 'published', label: 'Terbit' },
];

export default function AdminPagesIndex({ pages }: { pages: PageItem[] }) {
    return (
        <div className="min-h-screen bg-[#f6f8f7] text-[#10261b] dark:bg-[#0b1410] dark:text-[#e6efe9]">
            <Head title="Manajemen Halaman" />

            <header className="border-b border-black/5 bg-white/80 py-10 dark:border-white/10 dark:bg-[#0b1410]/80">
                <div className="mx-auto max-w-6xl px-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                        Admin CMS
                    </p>
                    <h1 className="mt-3 font-['Unbounded'] text-3xl text-[#0b2d1d] dark:text-white">
                        Manajemen Halaman Dinamis
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm text-[#587166] dark:text-[#b0c2b8]">
                        Kelola judul, slug, dan status publikasi halaman portal.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                            href="/admin"
                            className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-[#123726] transition hover:border-black/20 dark:border-white/20 dark:text-white"
                        >
                            Kembali ke Dashboard
                        </Link>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-6xl space-y-8 px-6 py-12">
                <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_12px_24px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5">
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

                <section className="space-y-4">
                    {pages.map((page) => (
                        <div
                            key={page.id}
                            className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_12px_24px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5"
                        >
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm font-semibold text-[#123726] dark:text-white">
                                        {page.title}
                                    </p>
                                    <p className="text-xs text-[#587166] dark:text-[#b0c2b8]">
                                        /{page.slug}
                                    </p>
                                </div>
                                <div className="text-xs text-[#567365] dark:text-[#b0c2b8]">
                                    {page.updated_at ? `Terakhir diperbarui: ${page.updated_at}` : 'Baru dibuat'}
                                </div>
                            </div>

                            <div className="mt-4 grid gap-4">
                                <Form method="patch" action={`/admin/pages/${page.id}`} className="grid gap-4">
                                    {({ processing }) => (
                                        <>
                                            <div className="grid gap-4 md:grid-cols-3">
                                                <div>
                                                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                                        Judul
                                                    </label>
                                                    <input
                                                        name="title"
                                                        required
                                                        defaultValue={page.title}
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
                                                        defaultValue={page.slug}
                                                        className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                                        Status
                                                    </label>
                                                    <select
                                                        name="status"
                                                        defaultValue={page.status}
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
                                            <div className="flex flex-wrap gap-3">
                                                <button
                                                    type="submit"
                                                    disabled={processing}
                                                    className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold text-[#123726] transition hover:border-black/20 dark:border-white/20 dark:text-white"
                                                >
                                                    Simpan Perubahan
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </Form>
                                <Form method="delete" action={`/admin/pages/${page.id}`}>
                                    {({ processing: deleting }) => (
                                        <button
                                            type="submit"
                                            disabled={deleting}
                                            className="rounded-full border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 transition hover:border-red-300 dark:border-red-400/50 dark:text-red-200"
                                        >
                                            Hapus
                                        </button>
                                    )}
                                </Form>
                            </div>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
}
