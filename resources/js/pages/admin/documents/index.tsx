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

type DocumentItem = {
    id: number;
    title: string;
    description: string;
    type: string;
    status: string;
    file_name: string;
    file_size: number;
    file_url: string;
    preview_url: string;
    issued_at: string | null;
    published_at: string | null;
    meta: string;
};

type DocumentForm = {
    title: string;
    description: string;
    type: string;
    status: string;
    file: File | null;
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

const emptyForm: DocumentForm = {
    title: '',
    description: '',
    type: 'announcement',
    status: 'draft',
    file: null,
    issued_at: '',
    published_at: '',
};

export default function AdminDocumentIndex({
    items,
    types,
    statuses,
    listMode: _listMode,
}: {
    items: DocumentItem[];
    types: OptionItem[];
    statuses: OptionItem[];
    listMode: 'cards' | 'table';
}) {
    const [activeItem, setActiveItem] = useState<DocumentItem | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const form = useForm<DocumentForm>(emptyForm);

    useEffect(() => {
        if (activeItem) {
            form.setData({
                title: activeItem.title,
                description: activeItem.description,
                type: activeItem.type,
                status: activeItem.status,
                file: null,
                issued_at: activeItem.issued_at ?? '',
                published_at: activeItem.published_at ?? '',
            });
            return;
        }

        if (isCreateOpen) {
            form.setData({
                ...emptyForm,
                type: types[0]?.value ?? 'announcement',
                status: statuses[0]?.value ?? 'draft',
            });
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
            form.patch(`/admin/documents/${activeItem.id}`, {
                forceFormData: true,
            });
            return;
        }

        form.post('/admin/documents', {
            forceFormData: true,
        });
    };

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
                <div className="mt-6 flex flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={() => setIsCreateOpen(true)}
                        className="rounded-full bg-[#0f6b4f] px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(15,107,79,0.2)] transition hover:brightness-95"
                    >
                        Tambah Dokumen
                    </button>
                </div>
            </header>

            <section className="mt-8">
                <AdminList
                    title="Daftar Dokumen"
                    description="List ringkas untuk mengelola dokumen publikasi dan arsip."
                    count={items.length}
                >
                    {items.map((item) => (
                        <AdminListItem
                            key={item.id}
                            title={item.title}
                            subtitle={item.file_name}
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
                                                    `delete-document-${item.id}`
                                                ) as HTMLFormElement | null;

                                                formElement?.requestSubmit();
                                            },
                                        },
                                    ]}
                                />
                            }
                        >
                            <span>
                                {item.description || 'Deskripsi belum diisi.'}
                            </span>
                            <span className="ml-3">
                                {formatFileSize(item.file_size)}
                            </span>
                            <Form
                                id={`delete-document-${item.id}`}
                                method="delete"
                                action={`/admin/documents/${item.id}`}
                                className="hidden"
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
                title={activeItem ? 'Edit Dokumen PDF' : 'Tambah Dokumen PDF'}
                description={
                    activeItem
                        ? 'Perbarui metadata, tanggal, dan file PDF.'
                        : 'Tambahkan dokumen baru untuk publikasi.'
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
                                Tipe Dokumen
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
                    <div>
                        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                            {activeItem ? 'Ganti File PDF (opsional)' : 'Upload PDF (maks 10 MB)'}
                        </label>
                        <input
                            type="file"
                            name="file"
                            accept="application/pdf"
                            onChange={(event) => form.setData('file', event.target.files?.[0] ?? null)}
                            required={!activeItem}
                            className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#123726] file:mr-4 file:rounded-full file:border-0 file:bg-[#0f6b4f] file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white dark:border-white/10 dark:bg-white/5 dark:text-white"
                        />
                    </div>

                    {activeItem ? (
                        <div className="overflow-hidden rounded-2xl border border-black/5 bg-white/80 dark:border-white/10 dark:bg-white/5">
                            <div className="flex items-center justify-between border-b border-black/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#567365] dark:border-white/10 dark:text-[#b0c2b8]">
                                <span>Preview Dokumen</span>
                                <a
                                    href={activeItem.file_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-full border border-black/10 px-3 py-1 text-[0.65rem] font-semibold text-[#123726] transition hover:border-black/20 dark:border-white/20 dark:text-white"
                                >
                                    Buka Tab Baru
                                </a>
                            </div>
                            <iframe
                                title={`Preview ${activeItem.title}`}
                                src={activeItem.preview_url}
                                className="h-64 w-full bg-white dark:bg-[#0b2d1d]"
                            />
                        </div>
                    ) : null}

                    <div className="flex flex-wrap gap-3">
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="rounded-full bg-[#0f6b4f] px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(15,107,79,0.2)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {activeItem ? 'Simpan Perubahan' : 'Simpan Dokumen'}
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
