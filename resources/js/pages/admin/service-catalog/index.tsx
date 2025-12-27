import { AdminActionMenu } from '@/components/admin/admin-action-menu';
import { AdminList, AdminListItem } from '@/components/admin/admin-list';
import { AdminRichTextEditor } from '@/components/admin/admin-rich-text-editor';
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
    provider_name: string | null;
    summary: string | null;
    service_status: 'online' | 'offline' | 'limited' | null;
    service_cta_label: string | null;
    service_cta_url: string | null;
    hotline_phone: string | null;
    service_website_url: string | null;
    service_address: string | null;
    service_phone: string | null;
    service_email: string | null;
    operational_hours: OperationalHour[];
    social_links: SocialLink[];
    media_information: string;
    community_benefits: string;
    sidatuk_features: string;
    service_terms: string;
    service_flow: string;
    infographic_url: string | null;
    service_logo_url: string | null;
    is_active: boolean;
    faqs: Array<{ question: string; answer: string; sort_order: number }>;
    meta: string;
};

type OperationalHour = {
    day: string;
    opens_at: string;
    closes_at: string;
    is_closed: boolean;
};

type SocialLink = {
    platform: string;
    url: string;
};

type ServiceCatalogFaqForm = {
    question: string;
    answer: string;
    sort_order: number;
};

type ServiceCatalogForm = {
    service_sector_id: number | '';
    title: string;
    provider_name: string;
    summary: string;
    service_status: 'online' | 'offline' | 'limited';
    service_cta_label: string;
    service_cta_url: string;
    hotline_phone: string;
    service_website_url: string;
    service_address: string;
    service_phone: string;
    service_email: string;
    operational_hours: OperationalHour[];
    social_links: SocialLink[];
    media_information: string;
    community_benefits: string;
    sidatuk_features: string;
    service_terms: string;
    service_flow: string;
    is_active: boolean;
    infographic: File | null;
    service_logo: File | null;
    faqs: ServiceCatalogFaqForm[];
};

const defaultOperationalHours: OperationalHour[] = [
    { day: 'Senin', opens_at: '08:00', closes_at: '16:00', is_closed: false },
    { day: 'Selasa', opens_at: '08:00', closes_at: '16:00', is_closed: false },
    { day: 'Rabu', opens_at: '08:00', closes_at: '16:00', is_closed: false },
    { day: 'Kamis', opens_at: '08:00', closes_at: '16:00', is_closed: false },
    { day: 'Jumat', opens_at: '08:00', closes_at: '16:00', is_closed: false },
    { day: 'Sabtu', opens_at: '', closes_at: '', is_closed: true },
    { day: 'Minggu', opens_at: '', closes_at: '', is_closed: true },
];

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
        provider_name: '',
        summary: '',
        service_status: 'online',
        service_cta_label: 'Akses Layanan',
        service_cta_url: '',
        hotline_phone: '',
        service_website_url: '',
        service_address: '',
        service_phone: '',
        service_email: '',
        operational_hours: defaultOperationalHours,
        social_links: [],
        media_information: '',
        community_benefits: '',
        sidatuk_features: '',
        service_terms: '',
        service_flow: '',
        is_active: true,
        infographic: null,
        service_logo: null,
        faqs: [],
    });

    useEffect(() => {
        if (activeItem) {
            form.setData({
                service_sector_id: activeItem.sector_id,
                title: activeItem.title,
                provider_name: activeItem.provider_name ?? '',
                summary: activeItem.summary ?? '',
                service_status: activeItem.service_status ?? 'online',
                service_cta_label: activeItem.service_cta_label ?? 'Akses Layanan',
                service_cta_url: activeItem.service_cta_url ?? '',
                hotline_phone: activeItem.hotline_phone ?? '',
                service_website_url: activeItem.service_website_url ?? '',
                service_address: activeItem.service_address ?? '',
                service_phone: activeItem.service_phone ?? '',
                service_email: activeItem.service_email ?? '',
                operational_hours: activeItem.operational_hours?.length
                    ? activeItem.operational_hours
                    : defaultOperationalHours,
                social_links: activeItem.social_links ?? [],
                media_information: activeItem.media_information,
                community_benefits: activeItem.community_benefits,
                sidatuk_features: activeItem.sidatuk_features,
                service_terms: activeItem.service_terms,
                service_flow: activeItem.service_flow,
                is_active: activeItem.is_active,
                infographic: null,
                service_logo: null,
                faqs: activeItem.faqs ?? [],
            });
            return;
        }

        if (isCreateOpen) {
            form.setData({
                service_sector_id: sectors[0]?.id ?? '',
                title: '',
                provider_name: '',
                summary: '',
                service_status: 'online',
                service_cta_label: 'Akses Layanan',
                service_cta_url: '',
                hotline_phone: '',
                service_website_url: '',
                service_address: '',
                service_phone: '',
                service_email: '',
                operational_hours: defaultOperationalHours,
                social_links: [],
                media_information: '',
                community_benefits: '',
                sidatuk_features: '',
                service_terms: '',
                service_flow: '',
                is_active: true,
                infographic: null,
                service_logo: null,
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

    const updateOperationalHour = (
        index: number,
        key: keyof OperationalHour,
        value: string | boolean
    ) => {
        const nextHours = form.data.operational_hours.map((hour, hourIndex) =>
            hourIndex === index ? { ...hour, [key]: value } : hour
        );
        form.setData('operational_hours', nextHours);
    };

    const addSocialLink = () => {
        form.setData('social_links', [
            ...form.data.social_links,
            { platform: '', url: '' },
        ]);
    };

    const updateSocialLink = (index: number, key: keyof SocialLink, value: string) => {
        const nextLinks = form.data.social_links.map((link, linkIndex) =>
            linkIndex === index ? { ...link, [key]: value } : link
        );
        form.setData('social_links', nextLinks);
    };

    const removeSocialLink = (index: number) => {
        form.setData(
            'social_links',
            form.data.social_links.filter((_, linkIndex) => linkIndex !== index)
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
                                Instansi Penanggung Jawab
                            </label>
                            <input
                                name="provider_name"
                                value={form.data.provider_name}
                                onChange={(event) =>
                                    form.setData('provider_name', event.target.value)
                                }
                                className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                Ringkasan Layanan
                            </label>
                            <textarea
                                name="summary"
                                value={form.data.summary}
                                onChange={(event) => form.setData('summary', event.target.value)}
                                rows={2}
                                className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                            />
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                Status Layanan
                            </label>
                            <select
                                name="service_status"
                                value={form.data.service_status}
                                onChange={(event) =>
                                    form.setData(
                                        'service_status',
                                        event.target.value as ServiceCatalogForm['service_status']
                                    )
                                }
                                className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                            >
                                <option value="online">Online</option>
                                <option value="limited">Terbatas</option>
                                <option value="offline">Offline</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                Status Publikasi
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
                                Logo Layanan
                            </label>
                            <input
                                type="file"
                                name="service_logo"
                                accept="image/png,image/jpeg,image/svg+xml"
                                onChange={(event) =>
                                    form.setData('service_logo', event.target.files?.[0] ?? null)
                                }
                                className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#123726] file:mr-4 file:rounded-full file:border-0 file:bg-[#0f6b4f] file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white dark:border-white/10 dark:bg-white/5 dark:text-white"
                            />
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
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

                    {activeItem?.service_logo_url ? (
                        <div className="overflow-hidden rounded-2xl border border-black/5 bg-white/80 dark:border-white/10 dark:bg-white/5">
                            <div className="flex items-center justify-between border-b border-black/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#567365] dark:border-white/10 dark:text-[#b0c2b8]">
                                <span>Preview Logo Layanan</span>
                                <a
                                    href={activeItem.service_logo_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-full border border-black/10 px-3 py-1 text-[0.65rem] font-semibold text-[#123726] transition hover:border-black/20 dark:border-white/20 dark:text-white"
                                >
                                    Buka Tab Baru
                                </a>
                            </div>
                            <div className="flex justify-center bg-white px-4 py-4 dark:bg-[#0b2d1d]">
                                <img
                                    src={activeItem.service_logo_url}
                                    alt={`Logo ${activeItem.title}`}
                                    className="max-h-24 w-auto rounded-xl"
                                />
                            </div>
                        </div>
                    ) : null}

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

                    <div className="grid gap-4 md:grid-cols-3">
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                Label Tombol Akses
                            </label>
                            <input
                                name="service_cta_label"
                                value={form.data.service_cta_label}
                                onChange={(event) =>
                                    form.setData('service_cta_label', event.target.value)
                                }
                                className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                URL Tombol Akses
                            </label>
                            <input
                                name="service_cta_url"
                                value={form.data.service_cta_url}
                                onChange={(event) =>
                                    form.setData('service_cta_url', event.target.value)
                                }
                                className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                Hotline
                            </label>
                            <input
                                name="hotline_phone"
                                value={form.data.hotline_phone}
                                onChange={(event) =>
                                    form.setData('hotline_phone', event.target.value)
                                }
                                className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                            />
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                Website Resmi
                            </label>
                            <input
                                name="service_website_url"
                                value={form.data.service_website_url}
                                onChange={(event) =>
                                    form.setData('service_website_url', event.target.value)
                                }
                                className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                Telepon Layanan
                            </label>
                            <input
                                name="service_phone"
                                value={form.data.service_phone}
                                onChange={(event) =>
                                    form.setData('service_phone', event.target.value)
                                }
                                className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                            />
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                Email Layanan
                            </label>
                            <input
                                name="service_email"
                                value={form.data.service_email}
                                onChange={(event) =>
                                    form.setData('service_email', event.target.value)
                                }
                                className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                Alamat Layanan
                            </label>
                            <textarea
                                name="service_address"
                                value={form.data.service_address}
                                onChange={(event) =>
                                    form.setData('service_address', event.target.value)
                                }
                                rows={2}
                                className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                            />
                        </div>
                    </div>

                    <div className="rounded-2xl border border-black/5 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
                        <div>
                            <p className="text-sm font-semibold text-[#123726] dark:text-white">
                                Jam Operasional
                            </p>
                            <p className="text-xs text-[#587166] dark:text-[#b0c2b8]">
                                Atur jam buka per hari untuk layanan publik.
                            </p>
                        </div>
                        <div className="mt-4 grid gap-3">
                            {form.data.operational_hours.map((hour, index) => (
                                <div
                                    key={`${hour.day}-${index}`}
                                    className="grid gap-3 rounded-2xl border border-black/5 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/5 md:grid-cols-[140px_repeat(2,minmax(0,1fr))_120px]"
                                >
                                    <div>
                                        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                            Hari
                                        </label>
                                        <input
                                            value={hour.day}
                                            onChange={(event) =>
                                                updateOperationalHour(index, 'day', event.target.value)
                                            }
                                            className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-xs text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                            Buka
                                        </label>
                                        <input
                                            type="time"
                                            value={hour.opens_at}
                                            disabled={hour.is_closed}
                                            onChange={(event) =>
                                                updateOperationalHour(index, 'opens_at', event.target.value)
                                            }
                                            className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-xs text-[#123726] disabled:bg-black/5 dark:border-white/10 dark:bg-white/5 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                            Tutup
                                        </label>
                                        <input
                                            type="time"
                                            value={hour.closes_at}
                                            disabled={hour.is_closed}
                                            onChange={(event) =>
                                                updateOperationalHour(index, 'closes_at', event.target.value)
                                            }
                                            className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-2 text-xs text-[#123726] disabled:bg-black/5 dark:border-white/10 dark:bg-white/5 dark:text-white"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2 pt-6 text-xs font-semibold text-[#123726] dark:text-white">
                                        <input
                                            id={`is-closed-${index}`}
                                            type="checkbox"
                                            checked={hour.is_closed}
                                            onChange={(event) =>
                                                updateOperationalHour(
                                                    index,
                                                    'is_closed',
                                                    event.target.checked
                                                )
                                            }
                                            className="h-4 w-4 rounded border border-black/20"
                                        />
                                        <label htmlFor={`is-closed-${index}`}>Libur</label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-2xl border border-black/5 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                                <p className="text-sm font-semibold text-[#123726] dark:text-white">
                                    Sosial Media
                                </p>
                                <p className="text-xs text-[#587166] dark:text-[#b0c2b8]">
                                    Tambahkan tautan sosial media terkait layanan.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={addSocialLink}
                                className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-[#123726] transition hover:border-black/20 dark:border-white/20 dark:text-white"
                            >
                                Tambah Sosial
                            </button>
                        </div>
                        <div className="mt-4 grid gap-3">
                            {form.data.social_links.length === 0 ? (
                                <p className="text-xs text-[#587166] dark:text-[#b0c2b8]">
                                    Belum ada sosial media.
                                </p>
                            ) : null}
                            {form.data.social_links.map((link, index) => (
                                <div
                                    key={`${link.platform}-${index}`}
                                    className="grid gap-3 rounded-2xl border border-black/5 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/5 md:grid-cols-[160px_1fr_auto]"
                                >
                                    <input
                                        placeholder="Platform"
                                        value={link.platform}
                                        onChange={(event) =>
                                            updateSocialLink(index, 'platform', event.target.value)
                                        }
                                        className="w-full rounded-full border border-black/10 bg-white px-4 py-2 text-xs text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                                    />
                                    <input
                                        placeholder="URL"
                                        value={link.url}
                                        onChange={(event) =>
                                            updateSocialLink(index, 'url', event.target.value)
                                        }
                                        className="w-full rounded-full border border-black/10 bg-white px-4 py-2 text-xs text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeSocialLink(index)}
                                        className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-red-600 transition hover:border-black/20"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-4">
                        <AdminRichTextEditor
                            label="Media dan Informasi"
                            description="Tuliskan informasi singkat dengan format rich text."
                            value={form.data.media_information}
                            onChange={(value) => form.setData('media_information', value)}
                        />
                        <AdminRichTextEditor
                            label="Manfaat bagi masyarakat"
                            description="Sorot manfaat utama layanan."
                            value={form.data.community_benefits}
                            onChange={(value) => form.setData('community_benefits', value)}
                        />
                        <AdminRichTextEditor
                            label="Fitur Aplikasi SIDATUK"
                            description="Cantumkan fitur yang relevan untuk layanan ini."
                            value={form.data.sidatuk_features}
                            onChange={(value) => form.setData('sidatuk_features', value)}
                        />
                        <AdminRichTextEditor
                            label="Ketentuan layanan"
                            description="Jelaskan syarat dan ketentuan layanan."
                            value={form.data.service_terms}
                            onChange={(value) => form.setData('service_terms', value)}
                        />
                        <AdminRichTextEditor
                            label="Alur pengguna layanan"
                            description="Tuliskan langkah-langkah utama."
                            value={form.data.service_flow}
                            onChange={(value) => form.setData('service_flow', value)}
                        />
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
