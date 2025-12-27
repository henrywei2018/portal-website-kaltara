import { AdminActionMenu } from '@/components/admin/admin-action-menu';
import { AdminList, AdminListItem } from '@/components/admin/admin-list';
import { AdminSlideOver } from '@/components/admin/admin-slide-over';
import AdminSidebarLayout from '@/layouts/admin/admin-sidebar-layout';
import { Form, Head, useForm } from '@inertiajs/react';
import { type FormEvent, useEffect, useState } from 'react';

type ServiceSectorOption = {
    id: number;
    name: string;
};

type ServiceCatalogItem = {
    id: number;
    title: string;
    sector_id: number;
    sector_name: string | null;
    slug: string;
    media_information: string;
    community_benefits: string;
    sidatuk_features: string;
    service_terms: string;
    service_flow: string;
    infographic_url: string | null;
    is_active: boolean;
    faqs: Array<{ question: string; answer: string; sort_order: number }>;
    meta: string;
};

type ServiceCatalogFaqForm = {
    question: string;
    answer: string;
    sort_order: number;
};

type ServiceCatalogForm = {
    service_sector_id: number | '';
    title: string;
    media_information: string;
    community_benefits: string;
    sidatuk_features: string;
    service_terms: string;
    service_flow: string;
    is_active: boolean;
    infographic: File | null;
    faqs: ServiceCatalogFaqForm[];
};

export default function AdminServiceCatalogIndex({
    items,
    sectors,
    filters,
}: {
    items: ServiceCatalogItem[];
    sectors: ServiceSectorOption[];
    filters: {
        sector: number | null;
    };
}) {
    const [activeItem, setActiveItem] = useState<ServiceCatalogItem | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const form = useForm<ServiceCatalogForm>({
        service_sector_id: sectors[0]?.id ?? '',
        title: '',
        media_information: '',
        community_benefits: '',
        sidatuk_features: '',
        service_terms: '',
        service_flow: '',
        is_active: true,
        infographic: null,
        faqs: [],
    });

    useEffect(() => {
        if (activeItem) {
            form.setData({
                service_sector_id: activeItem.sector_id,
                title: activeItem.title,
                media_information: activeItem.media_information,
                community_benefits: activeItem.community_benefits,
                sidatuk_features: activeItem.sidatuk_features,
                service_terms: activeItem.service_terms,
                service_flow: activeItem.service_flow,
                is_active: activeItem.is_active,
                infographic: null,
                faqs: activeItem.faqs ?? [],
            });
            return;
        }

        if (isCreateOpen) {
            form.setData({
                service_sector_id: sectors[0]?.id ?? '',
                title: '',
                media_information: '',
                community_benefits: '',
                sidatuk_features: '',
                service_terms: '',
                service_flow: '',
                is_active: true,
                infographic: null,
                faqs: [],
            });
        }
    }, [activeItem, isCreateOpen, sectors]);

    const closeModal = () => {
        setIsCreateOpen(false);
        setActiveItem(null);
        form.reset();
    };

    const submit = (event: FormEvent) => {
        event.preventDefault();

        if (activeItem) {
            form.patch(`/admin/service-catalog/${activeItem.id}`, {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
            return;
        }

        form.post('/admin/service-catalog', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    const updateFaq = (index: number, key: keyof ServiceCatalogFaqForm, value: string | number) => {
        const nextFaqs = form.data.faqs.map((faq, faqIndex) =>
            faqIndex === index ? { ...faq, [key]: value } : faq
        );
        form.setData('faqs', nextFaqs);
    };

    const addFaq = () => {
        form.setData('faqs', [
            ...form.data.faqs,
            { question: '', answer: '', sort_order: form.data.faqs.length + 1 },
        ]);
    };

    const removeFaq = (index: number) => {
        form.setData(
            'faqs',
            form.data.faqs.filter((_, faqIndex) => faqIndex !== index)
        );
    };

    return (
        <AdminSidebarLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/admin' },
                { title: 'Katalog Layanan', href: '/admin/service-catalog' },
            ]}
        >
            <Head title="Katalog Layanan" />

            <header className="rounded-3xl border border-black/5 bg-white/90 p-8 shadow-[0_18px_40px_rgba(15,107,79,0.12)] dark:border-white/10 dark:bg-white/5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                    Admin CMS
                </p>
                <h1 className="mt-3 font-['Unbounded'] text-3xl text-[#0b2d1d] dark:text-white">
                    Katalog Layanan
                </h1>
                <p className="mt-3 max-w-2xl text-sm text-[#587166] dark:text-[#b0c2b8]">
                    Kelola daftar layanan publik berdasarkan sektor.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={() => setIsCreateOpen(true)}
                        className="rounded-full bg-[#0f6b4f] px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(15,107,79,0.2)] transition hover:brightness-95"
                    >
                        Tambah Layanan
                    </button>
                </div>
            </header>

            <section className="mt-8 rounded-2xl border border-black/5 bg-white p-6 shadow-[0_12px_24px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5">
                <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-sm font-semibold text-[#123726] dark:text-white">
                        Pencarian & Filter
                    </h2>
                    <p className="text-xs text-[#587166] dark:text-[#b0c2b8]">
                        Filter layanan berdasarkan sektor.
                    </p>
                </div>
                <form
                    action="/admin/service-catalog"
                    className="mt-4 grid gap-4 md:grid-cols-[1fr_auto]"
                >
                    <div>
                        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                            Sektor
                        </label>
                        <select
                            name="sector"
                            defaultValue={filters.sector ?? ''}
                            className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                        >
                            <option value="">Semua sektor</option>
                            {sectors.map((sector) => (
                                <option key={sector.id} value={sector.id}>
                                    {sector.name}
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
                            href="/admin/service-catalog"
                            className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold text-[#123726] transition hover:border-black/20 dark:border-white/20 dark:text-white"
                        >
                            Reset
                        </a>
                    </div>
                </form>
            </section>

            <section className="mt-8">
                <AdminList
                    title="Daftar Layanan"
                    description="List ringkas layanan publik per sektor."
                    count={items.length}
                >
                    {items.map((item) => (
                        <AdminListItem
                            key={item.id}
                            title={item.title}
                            subtitle={item.sector_name ?? 'Tanpa sektor'}
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
                                                    `delete-catalog-${item.id}`
                                                ) as HTMLFormElement | null;

                                                formElement?.requestSubmit();
                                            },
                                        },
                                    ]}
                                />
                            }
                        >
                            <span className="text-xs text-[#567365] dark:text-[#b0c2b8]">
                                {item.media_information.slice(0, 120)}
                                {item.media_information.length > 120 ? '...' : ''}
                            </span>
                            <Form
                                id={`delete-catalog-${item.id}`}
                                method="delete"
                                action={`/admin/service-catalog/${item.id}`}
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
                title={activeItem ? 'Edit Layanan' : 'Tambah Layanan'}
                description={
                    activeItem
                        ? 'Perbarui detail layanan dan FAQ.'
                        : 'Tambahkan layanan baru ke katalog.'
                }
            >
                <form onSubmit={submit} className="grid gap-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                Sektor
                            </label>
                            <select
                                name="service_sector_id"
                                value={form.data.service_sector_id}
                                onChange={(event) =>
                                    form.setData(
                                        'service_sector_id',
                                        event.target.value ? Number(event.target.value) : ''
                                    )
                                }
                                className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                            >
                                <option value="">Pilih sektor</option>
                                {sectors.map((sector) => (
                                    <option key={sector.id} value={sector.id}>
                                        {sector.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                Judul Layanan
                            </label>
                            <input
                                name="title"
                                value={form.data.title}
                                onChange={(event) => form.setData('title', event.target.value)}
                                className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                            />
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
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
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                Infografis
                            </label>
                            <input
                                type="file"
                                name="infographic"
                                accept="image/png,image/jpeg,image/svg+xml"
                                onChange={(event) =>
                                    form.setData('infographic', event.target.files?.[0] ?? null)
                                }
                                className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#123726] file:mr-4 file:rounded-full file:border-0 file:bg-[#0f6b4f] file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white dark:border-white/10 dark:bg-white/5 dark:text-white"
                            />
                        </div>
                    </div>

                    {activeItem?.infographic_url ? (
                        <div className="overflow-hidden rounded-2xl border border-black/5 bg-white/80 dark:border-white/10 dark:bg-white/5">
                            <div className="flex items-center justify-between border-b border-black/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#567365] dark:border-white/10 dark:text-[#b0c2b8]">
                                <span>Preview Infografis</span>
                                <a
                                    href={activeItem.infographic_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-full border border-black/10 px-3 py-1 text-[0.65rem] font-semibold text-[#123726] transition hover:border-black/20 dark:border-white/20 dark:text-white"
                                >
                                    Buka Tab Baru
                                </a>
                            </div>
                            <div className="flex justify-center bg-white px-4 py-4 dark:bg-[#0b2d1d]">
                                <img
                                    src={activeItem.infographic_url}
                                    alt={`Infografis ${activeItem.title}`}
                                    className="max-h-64 w-auto rounded-xl"
                                />
                            </div>
                        </div>
                    ) : null}

                    <div className="grid gap-4">
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                Media dan Informasi
                            </label>
                            <textarea
                                name="media_information"
                                value={form.data.media_information}
                                onChange={(event) => form.setData('media_information', event.target.value)}
                                rows={3}
                                className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                Manfaat bagi masyarakat
                            </label>
                            <textarea
                                name="community_benefits"
                                value={form.data.community_benefits}
                                onChange={(event) => form.setData('community_benefits', event.target.value)}
                                rows={3}
                                className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                Fitur Aplikasi SIDATUK
                            </label>
                            <textarea
                                name="sidatuk_features"
                                value={form.data.sidatuk_features}
                                onChange={(event) => form.setData('sidatuk_features', event.target.value)}
                                rows={3}
                                className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                Ketentuan layanan
                            </label>
                            <textarea
                                name="service_terms"
                                value={form.data.service_terms}
                                onChange={(event) => form.setData('service_terms', event.target.value)}
                                rows={3}
                                className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                Alur pengguna layanan
                            </label>
                            <textarea
                                name="service_flow"
                                value={form.data.service_flow}
                                onChange={(event) => form.setData('service_flow', event.target.value)}
                                rows={3}
                                className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                            />
                        </div>
                    </div>

                    <div className="rounded-2xl border border-black/5 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                                <p className="text-sm font-semibold text-[#123726] dark:text-white">
                                    Frequently Asked Questions
                                </p>
                                <p className="text-xs text-[#587166] dark:text-[#b0c2b8]">
                                    Tambahkan pertanyaan dan jawaban singkat.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={addFaq}
                                className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-[#123726] transition hover:border-black/20 dark:border-white/20 dark:text-white"
                            >
                                Tambah FAQ
                            </button>
                        </div>
                        <div className="mt-4 grid gap-4">
                            {form.data.faqs.length === 0 ? (
                                <p className="text-xs text-[#587166] dark:text-[#b0c2b8]">
                                    Belum ada FAQ.
                                </p>
                            ) : null}
                            {form.data.faqs.map((faq, index) => (
                                <div
                                    key={`${faq.question}-${index}`}
                                    className="rounded-2xl border border-black/5 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/5"
                                >
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                            FAQ #{index + 1}
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => removeFaq(index)}
                                            className="text-xs font-semibold text-red-600"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                    <div className="mt-3 grid gap-3">
                                        <input
                                            type="text"
                                            placeholder="Pertanyaan"
                                            value={faq.question}
                                            onChange={(event) =>
                                                updateFaq(index, 'question', event.target.value)
                                            }
                                            className="w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                                        />
                                        <textarea
                                            placeholder="Jawaban"
                                            value={faq.answer}
                                            onChange={(event) =>
                                                updateFaq(index, 'answer', event.target.value)
                                            }
                                            rows={2}
                                            className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                                        />
                                        <input
                                            type="number"
                                            min={0}
                                            placeholder="Urutan"
                                            value={faq.sort_order}
                                            onChange={(event) =>
                                                updateFaq(index, 'sort_order', Number(event.target.value))
                                            }
                                            className="w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="rounded-full bg-[#0f6b4f] px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(15,107,79,0.2)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {activeItem ? 'Simpan Perubahan' : 'Simpan Layanan'}
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
