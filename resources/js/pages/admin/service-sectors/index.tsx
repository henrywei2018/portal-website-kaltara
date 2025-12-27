import { AdminActionMenu } from '@/components/admin/admin-action-menu';
import { AdminList, AdminListItem } from '@/components/admin/admin-list';
import { AdminSlideOver } from '@/components/admin/admin-slide-over';
import AdminSidebarLayout from '@/layouts/admin/admin-sidebar-layout';
import { Form, Head, useForm } from '@inertiajs/react';
import { type FormEvent, useEffect, useState } from 'react';

type ServiceSector = {
    id: number;
    name: string;
    slug: string;
    description: string;
    color: string | null;
    sort_order: number;
    is_active: boolean;
    icon_url: string | null;
    meta: string;
};

type ServiceSectorForm = {
    name: string;
    description: string;
    color: string;
    sort_order: number;
    is_active: boolean;
    icon: File | null;
};

export default function AdminServiceSectorsIndex({
    sectors,
}: {
    sectors: ServiceSector[];
}) {
    const [activeSector, setActiveSector] = useState<ServiceSector | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const form = useForm<ServiceSectorForm>({
        name: '',
        description: '',
        color: '',
        sort_order: 0,
        is_active: true,
        icon: null,
    });

    useEffect(() => {
        if (activeSector) {
            form.setData({
                name: activeSector.name,
                description: activeSector.description,
                color: activeSector.color ?? '',
                sort_order: activeSector.sort_order,
                is_active: activeSector.is_active,
                icon: null,
            });
            return;
        }

        if (isCreateOpen) {
            form.setData({
                name: '',
                description: '',
                color: '',
                sort_order: sectors.length + 1,
                is_active: true,
                icon: null,
            });
        }
    }, [activeSector, isCreateOpen, sectors.length]);

    const closeModal = () => {
        setIsCreateOpen(false);
        setActiveSector(null);
        form.reset();
    };

    const submit = (event: FormEvent) => {
        event.preventDefault();

        if (activeSector) {
            form.patch(`/admin/service-sectors/${activeSector.id}`, {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
            return;
        }

        form.post('/admin/service-sectors', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    return (
        <AdminSidebarLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/admin' },
                { title: 'Sektor Layanan', href: '/admin/service-sectors' },
            ]}
        >
            <Head title="Sektor Layanan" />

            <header className="rounded-3xl border border-black/5 bg-white/90 p-8 shadow-[0_18px_40px_rgba(15,107,79,0.12)] dark:border-white/10 dark:bg-white/5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                    Admin CMS
                </p>
                <h1 className="mt-3 font-['Unbounded'] text-3xl text-[#0b2d1d] dark:text-white">
                    Sektor Layanan
                </h1>
                <p className="mt-3 max-w-2xl text-sm text-[#587166] dark:text-[#b0c2b8]">
                    Kelola daftar sektor layanan untuk katalog publik.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={() => setIsCreateOpen(true)}
                        className="rounded-full bg-[#0f6b4f] px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(15,107,79,0.2)] transition hover:brightness-95"
                    >
                        Tambah Sektor
                    </button>
                </div>
            </header>

            <section className="mt-8">
                <AdminList
                    title="Daftar Sektor"
                    description="List ringkas sektor layanan yang tampil di katalog publik."
                    count={sectors.length}
                >
                    {sectors.map((sector) => (
                        <AdminListItem
                            key={sector.id}
                            title={sector.name}
                            subtitle={sector.slug}
                            meta={sector.meta}
                            actions={
                                <AdminActionMenu
                                    items={[
                                        {
                                            label: 'Edit',
                                            onSelect: () => setActiveSector(sector),
                                        },
                                        {
                                            label: 'Hapus',
                                            tone: 'danger',
                                            onSelect: () => {
                                                const formElement = document.getElementById(
                                                    `delete-sector-${sector.id}`
                                                ) as HTMLFormElement | null;

                                                formElement?.requestSubmit();
                                            },
                                        },
                                    ]}
                                />
                            }
                        >
                            <span className="text-xs text-[#567365] dark:text-[#b0c2b8]">
                                {sector.description}
                            </span>
                            <Form
                                id={`delete-sector-${sector.id}`}
                                method="delete"
                                action={`/admin/service-sectors/${sector.id}`}
                                className="hidden"
                            />
                        </AdminListItem>
                    ))}
                </AdminList>
            </section>

            <AdminSlideOver
                open={isCreateOpen || Boolean(activeSector)}
                onOpenChange={(open) => {
                    if (!open) {
                        closeModal();
                    }
                }}
                title={activeSector ? 'Edit Sektor' : 'Tambah Sektor'}
                description={
                    activeSector
                        ? 'Perbarui informasi sektor layanan.'
                        : 'Tambahkan sektor layanan baru.'
                }
            >
                <form onSubmit={submit} className="grid gap-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                Nama Sektor
                            </label>
                            <input
                                name="name"
                                value={form.data.name}
                                onChange={(event) => form.setData('name', event.target.value)}
                                className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                Warna Label
                            </label>
                            <input
                                name="color"
                                value={form.data.color}
                                onChange={(event) => form.setData('color', event.target.value)}
                                placeholder="#0f6b4f"
                                className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                            />
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
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                Urutan
                            </label>
                            <input
                                type="number"
                                name="sort_order"
                                min={0}
                                value={form.data.sort_order}
                                onChange={(event) =>
                                    form.setData('sort_order', Number(event.target.value))
                                }
                                className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                Status
                            </label>
                            <select
                                name="is_active"
                                value={form.data.is_active ? '1' : '0'}
                                onChange={(event) =>
                                    form.setData('is_active', event.target.value === '1')
                                }
                                className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                            >
                                <option value="1">Aktif</option>
                                <option value="0">Nonaktif</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                            Logo/Ikon
                        </label>
                        <input
                            type="file"
                            name="icon"
                            accept="image/png,image/jpeg,image/svg+xml"
                            onChange={(event) =>
                                form.setData('icon', event.target.files?.[0] ?? null)
                            }
                            className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#123726] file:mr-4 file:rounded-full file:border-0 file:bg-[#0f6b4f] file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white dark:border-white/10 dark:bg-white/5 dark:text-white"
                        />
                    </div>
                    {activeSector?.icon_url ? (
                        <div className="overflow-hidden rounded-2xl border border-black/5 bg-white/80 dark:border-white/10 dark:bg-white/5">
                            <div className="flex items-center justify-between border-b border-black/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#567365] dark:border-white/10 dark:text-[#b0c2b8]">
                                <span>Preview Ikon</span>
                                <a
                                    href={activeSector.icon_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-full border border-black/10 px-3 py-1 text-[0.65rem] font-semibold text-[#123726] transition hover:border-black/20 dark:border-white/20 dark:text-white"
                                >
                                    Buka Tab Baru
                                </a>
                            </div>
                            <div className="flex justify-center bg-white px-4 py-4 dark:bg-[#0b2d1d]">
                                <img
                                    src={activeSector.icon_url}
                                    alt={`Icon ${activeSector.name}`}
                                    className="max-h-24 w-auto"
                                />
                            </div>
                        </div>
                    ) : null}
                    <div className="flex flex-wrap gap-3">
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="rounded-full bg-[#0f6b4f] px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(15,107,79,0.2)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {activeSector ? 'Simpan Perubahan' : 'Simpan Sektor'}
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
