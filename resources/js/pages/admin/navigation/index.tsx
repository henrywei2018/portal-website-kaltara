import { Form, Head, Link } from '@inertiajs/react';

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
};

export default function NavigationIndex({
    items,
    parents,
}: {
    items: NavigationItem[];
    parents: ParentOption[];
}) {
    return (
        <div className="min-h-screen bg-[#f6f8f7] text-[#10261b] dark:bg-[#0b1410] dark:text-[#e6efe9]">
            <Head title="Manajemen Navigasi" />

            <header className="border-b border-black/5 bg-white/80 py-10 dark:border-white/10 dark:bg-[#0b1410]/80">
                <div className="mx-auto max-w-6xl px-6">
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
                        Tambah Menu Baru
                    </h2>
                    <Form method="post" action="/admin/navigation" className="mt-6 grid gap-4">
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
                                            className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                                            placeholder="Contoh: Layanan"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                            Parent Menu
                                        </label>
                                        <select
                                            name="parent_id"
                                            defaultValue=""
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
                                            className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                                            placeholder="contoh-slug"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                            URL (opsional)
                                        </label>
                                        <input
                                            name="url"
                                            className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                                            placeholder="/layanan atau https://..."
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
                                            defaultValue="0"
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
                                            defaultValue="1"
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
                                            defaultValue={0}
                                            className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-full bg-[#0f6b4f] px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(15,107,79,0.2)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
                                    >
                                        Simpan Menu
                                    </button>
                                </div>
                            </>
                        )}
                    </Form>
                </section>

                <section className="space-y-4">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_12px_24px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5"
                        >
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm font-semibold text-[#123726] dark:text-white">
                                        {item.label}
                                    </p>
                                    <p className="text-xs text-[#587166] dark:text-[#b0c2b8]">
                                        {item.parent_label
                                            ? `Submenu dari ${item.parent_label}`
                                            : 'Menu utama'}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-[#567365] dark:text-[#b0c2b8]">
                                    <span>Urutan: {item.sort_order}</span>
                                    <span>{item.is_visible ? 'Tampil' : 'Tersembunyi'}</span>
                                </div>
                            </div>
                            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[#587166] dark:text-[#b0c2b8]">
                                {item.url && <span>URL: {item.url}</span>}
                                {item.slug && <span>Slug: {item.slug}</span>}
                                {item.is_external && <span>External</span>}
                            </div>
                            <div className="mt-4 flex gap-3">
                                <Form method="patch" action={`/admin/navigation/${item.id}`}>
                                    {({ processing }) => (
                                        <>
                                            <input type="hidden" name="label" value={item.label} />
                                            <input type="hidden" name="parent_id" value={item.parent_id ?? ''} />
                                            <input type="hidden" name="slug" value={item.slug ?? ''} />
                                            <input type="hidden" name="url" value={item.url ?? ''} />
                                            <input type="hidden" name="is_external" value={item.is_external ? 1 : 0} />
                                            <input type="hidden" name="is_visible" value={item.is_visible ? 0 : 1} />
                                            <input type="hidden" name="sort_order" value={item.sort_order} />
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold text-[#123726] transition hover:border-black/20 dark:border-white/20 dark:text-white"
                                            >
                                                {item.is_visible ? 'Sembunyikan' : 'Tampilkan'}
                                            </button>
                                        </>
                                    )}
                                </Form>
                                <Form method="delete" action={`/admin/navigation/${item.id}`}>
                                    {({ processing }) => (
                                        <button
                                            type="submit"
                                            disabled={processing}
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
