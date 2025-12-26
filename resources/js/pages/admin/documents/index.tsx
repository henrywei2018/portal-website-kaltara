import AdminSidebarLayout from '@/layouts/admin/admin-sidebar-layout';
import { Form, Head, useForm } from '@inertiajs/react';
import { type FormEvent } from 'react';

type OptionItem = {
    value: string;
    label: string;
};

type DocumentItem = {
    id: number;
    title: string;
    description: string;
    type: string;
    status: string;
    file_name: string;
    file_size: number;
    file_url: string;
    issued_at: string | null;
    published_at: string | null;
};

type DocumentForm = {
    title: string;
    description: string;
    type: string;
    status: string;
    issued_at: string;
    published_at: string;
};

const formatFileSize = (bytes: number) => {
    if (bytes < 1024) {
        return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

function DocumentCard({
    item,
    types,
    statuses,
}: {
    item: DocumentItem;
    types: OptionItem[];
    statuses: OptionItem[];
}) {
    const form = useForm<DocumentForm>({
        title: item.title,
        description: item.description,
        type: item.type,
        status: item.status,
        issued_at: item.issued_at ?? '',
        published_at: item.published_at ?? '',
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();
        form.patch(`/admin/documents/${item.id}`);
    };

    return (
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_12px_24px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p className="text-sm font-semibold text-[#123726] dark:text-white">{item.title}</p>
                    <p className="text-xs text-[#587166] dark:text-[#b0c2b8]">{item.file_name}</p>
                </div>
                <div className="text-xs text-[#567365] dark:text-[#b0c2b8]">
                    {item.published_at ? `Publikasi: ${item.published_at}` : 'Belum dipublikasikan'}
                </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[#587166] dark:text-[#b0c2b8]">
                <span className="rounded-full bg-[#e6f1ec] px-3 py-1 font-semibold text-[#0f6b4f] dark:bg-white/10 dark:text-white">
                    {formatFileSize(item.file_size)}
                </span>
                <a
                    href={item.file_url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-black/10 px-3 py-1 font-semibold text-[#123726] transition hover:border-black/20 dark:border-white/20 dark:text-white"
                >
                    Lihat PDF
                </a>
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
                        Deskripsi
                    </label>
                    <textarea
                        name="description"
                        value={form.data.description}
                        onChange={(event) => form.setData('description', event.target.value)}
                        rows={3}
                        className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                    />
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                    <div>
                        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                            Tipe
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
                            Tanggal Terbit
                        </label>
                        <input
                            type="date"
                            name="issued_at"
                            value={form.data.issued_at}
                            onChange={(event) => form.setData('issued_at', event.target.value)}
                            className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                            Tanggal Publikasi
                        </label>
                        <input
                            type="date"
                            name="published_at"
                            value={form.data.published_at}
                            onChange={(event) => form.setData('published_at', event.target.value)}
                            className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                        />
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
                        onClick={() => form.delete(`/admin/documents/${item.id}`)}
                        className="rounded-full border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 transition hover:border-red-300 disabled:cursor-not-allowed disabled:opacity-70 dark:border-red-400/50 dark:text-red-200"
                    >
                        Hapus
                    </button>
                </div>
            </form>
        </div>
    );
}

export default function AdminDocumentIndex({
    items,
    types,
    statuses,
    listMode,
}: {
    items: DocumentItem[];
    types: OptionItem[];
    statuses: OptionItem[];
    listMode: 'cards' | 'table';
}) {
    return (
        <AdminSidebarLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/admin' },
                { title: 'Dokumen PDF', href: '/admin/documents' },
            ]}
        >
            <Head title="Manajemen Dokumen PDF" />

            <header className="rounded-3xl border border-black/5 bg-white/90 p-8 shadow-[0_18px_40px_rgba(15,107,79,0.12)] dark:border-white/10 dark:bg-white/5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                    Admin CMS
                </p>
                <h1 className="mt-3 font-['Unbounded'] text-3xl text-[#0b2d1d] dark:text-white">
                    Manajemen Dokumen PDF
                </h1>
                <p className="mt-3 max-w-2xl text-sm text-[#587166] dark:text-[#b0c2b8]">
                    Kelola pengumuman, IPKD, dan dokumen arsip secara terpusat.
                </p>
            </header>

            <section className="mt-6 rounded-2xl border border-black/5 bg-white p-6 shadow-[0_12px_24px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5">
                <h2 className="text-lg font-semibold text-[#123726] dark:text-white">
                    Tambah Dokumen Baru
                </h2>
                <Form
                    method="post"
                    action="/admin/documents"
                    encType="multipart/form-data"
                    className="mt-6 grid gap-4"
                >
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
                                        placeholder="Judul dokumen"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                        Tipe Dokumen
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
                            </div>
                            <div>
                                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                    Deskripsi
                                </label>
                                <textarea
                                    name="description"
                                    rows={3}
                                    className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                                    placeholder="Ringkasan dokumen"
                                />
                            </div>
                            <div className="grid gap-4 md:grid-cols-3">
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
                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                        Tanggal Terbit
                                    </label>
                                    <input
                                        type="date"
                                        name="issued_at"
                                        required
                                        className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                        Tanggal Publikasi
                                    </label>
                                    <input
                                        type="date"
                                        name="published_at"
                                        required
                                        className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                    Upload PDF (maks 10 MB)
                                </label>
                                <input
                                    type="file"
                                    name="file"
                                    accept="application/pdf"
                                    required
                                    className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#123726] file:mr-4 file:rounded-full file:border-0 file:bg-[#0f6b4f] file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white dark:border-white/10 dark:bg-white/5 dark:text-white"
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-full bg-[#0f6b4f] px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(15,107,79,0.2)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    Simpan Dokumen
                                </button>
                            </div>
                        </>
                    )}
                </Form>
            </section>

            <section className="mt-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h2 className="text-lg font-semibold text-[#123726] dark:text-white">
                            Daftar Dokumen
                        </h2>
                        <p className="text-xs text-[#587166] dark:text-[#b0c2b8]">
                            {listMode === 'table'
                                ? 'Mode tabel siap menangani banyak dokumen.'
                                : 'Gunakan kartu untuk edit cepat metadata.'}
                        </p>
                    </div>
                    <span className="rounded-full bg-[#e6f1ec] px-3 py-1 text-xs font-semibold text-[#0f6b4f] dark:bg-white/10 dark:text-white">
                        {items.length} Dokumen
                    </span>
                </div>

                {items.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-black/10 bg-white/70 p-6 text-sm text-[#587166] dark:border-white/20 dark:bg-white/5 dark:text-[#b0c2b8]">
                        Belum ada dokumen. Tambahkan dokumen baru menggunakan form di atas.
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {items.map((item) => (
                            <DocumentCard key={item.id} item={item} types={types} statuses={statuses} />
                        ))}
                    </div>
                )}
            </section>
        </AdminSidebarLayout>
    );
}
