import { Head, Link } from '@inertiajs/react';

type ServiceCatalogDetail = {
    title: string;
    slug: string;
    provider_name: string | null;
    summary: string | null;
    service_status: 'online' | 'offline' | 'limited';
    service_cta_label: string | null;
    service_cta_url: string | null;
    hotline_phone: string | null;
    service_website_url: string | null;
    service_address: string | null;
    service_phone: string | null;
    service_email: string | null;
    last_updated_at: string | null;
    operational_hours: Array<{
        day: string;
        opens_at: string;
        closes_at: string;
        is_closed: boolean;
    }>;
    social_links: Array<{ platform: string; url: string }>;
    sector: {
        id: number | null;
        name: string | null;
        color: string | null;
    };
    service_logo_url: string | null;
    media_information: string;
    community_benefits: string;
    sidatuk_features: string;
    service_terms: string;
    service_flow: string;
    infographic_url: string | null;
    faqs: Array<{ question: string; answer: string }>;
};

const navItems = [
    { id: 'media-dan-informasi', label: 'Media dan Informasi' },
    { id: 'manfaat-layanan', label: 'Manfaat bagi masyarakat' },
    { id: 'fitur-layanan', label: 'Fitur Aplikasi SIDATUK' },
    { id: 'syarat-layanan', label: 'Ketentuan layanan' },
    { id: 'alur-layanan', label: 'Alur pengguna layanan' },
    { id: 'infografis-layanan', label: 'Infografis' },
    { id: 'faq', label: 'Frequently Asked Questions' },
];

const statusMeta = {
    online: {
        label: 'Layanan tersedia online',
        badge: 'bg-emerald-100 text-emerald-800',
        dot: 'bg-emerald-500',
    },
    limited: {
        label: 'Layanan terbatas',
        badge: 'bg-amber-100 text-amber-800',
        dot: 'bg-amber-500',
    },
    offline: {
        label: 'Layanan sedang offline',
        badge: 'bg-red-100 text-red-800',
        dot: 'bg-red-500',
    },
};

const formatDate = (value: string | null) => {
    if (!value) {
        return 'Belum diperbarui';
    }

    return new Date(value).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
};

const Section = ({
    id,
    title,
    html,
}: {
    id: string;
    title: string;
    html: string;
}) => (
    <section
        id={id}
        className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_12px_30px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5"
    >
        <h2 className="text-lg font-semibold text-[#123726] dark:text-white">{title}</h2>
        {html ? (
            <div
                className="prose prose-sm mt-3 max-w-none text-[#587166] dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        ) : (
            <p className="mt-3 text-sm text-[#587166] dark:text-[#b0c2b8]">
                Belum ada informasi untuk bagian ini.
            </p>
        )}
    </section>
);

export default function ServiceCatalogShow({ item }: { item: ServiceCatalogDetail }) {
    const status = statusMeta[item.service_status] ?? statusMeta.online;

    return (
        <div className="min-h-screen bg-[#f2f6f3] text-[#10261b] dark:bg-[#0b1410] dark:text-[#e6efe9]">
            <Head title={item.title} />

            <header className="relative overflow-hidden bg-gradient-to-br from-[#0b2d1d] via-[#0f4a34] to-[#0b2d1d]">
                <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-72 w-72 translate-x-1/3 rounded-full bg-[#1fb767]/20 blur-3xl" />
                <div className="relative mx-auto grid max-w-6xl gap-8 px-6 py-14 text-white lg:grid-cols-[140px_1fr] lg:items-center">
                    <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl bg-white/15 ring-1 ring-white/20 lg:h-28 lg:w-28">
                        {item.service_logo_url ? (
                            <img
                                src={item.service_logo_url}
                                alt={`Logo ${item.title}`}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <span className="text-2xl font-semibold">
                                {item.title.slice(0, 1)}
                            </span>
                        )}
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/70">
                            Katalog Layanan Publik
                        </p>
                        <h1 className="mt-3 font-['Unbounded'] text-3xl leading-tight text-white md:text-4xl">
                            {item.title}
                        </h1>
                        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                            <span>{item.sector.name ?? 'Tanpa sektor'}</span>
                            {item.provider_name ? <span>• {item.provider_name}</span> : null}
                        </div>
                        <p className="mt-4 max-w-2xl text-sm text-white/80">
                            {item.summary ?? 'Belum ada ringkasan layanan untuk ditampilkan.'}
                        </p>
                        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-2 ${status.badge}`}>
                                <span className={`h-2 w-2 rounded-full ${status.dot}`} />
                                {status.label}
                            </span>
                            <span>Terakhir diupdate {formatDate(item.last_updated_at)}</span>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                                href="/layanan"
                                className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/60"
                            >
                                Kembali ke Katalog
                            </Link>
                            {item.service_cta_url ? (
                                <a
                                    href={item.service_cta_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#0b2d1d] shadow-[0_12px_24px_rgba(0,0,0,0.2)] transition hover:brightness-95"
                                >
                                    {item.service_cta_label ?? 'Akses Layanan'}
                                </a>
                            ) : null}
                        </div>
                    </div>
                </div>
            </header>

            <main className="mx-auto grid max-w-6xl gap-6 px-6 py-10 lg:grid-cols-[240px_1fr]">
                <nav className="sticky top-20 hidden self-start rounded-2xl border border-black/5 bg-white p-5 text-sm shadow-[0_12px_30px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5 lg:block">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                        Konten Layanan
                    </p>
                    <div className="mt-4 grid gap-3 text-sm font-semibold text-[#123726] dark:text-white">
                        {navItems.map((nav) => (
                            <a
                                key={nav.id}
                                href={`#${nav.id}`}
                                className="rounded-xl border border-transparent px-3 py-2 transition hover:border-black/10 hover:bg-[#f0f6f2] dark:hover:border-white/10 dark:hover:bg-white/5"
                            >
                                {nav.label}
                            </a>
                        ))}
                    </div>
                </nav>

                <div className="grid gap-6">
                    <div className="flex gap-3 overflow-x-auto pb-2 lg:hidden">
                        {navItems.map((nav) => (
                            <a
                                key={nav.id}
                                href={`#${nav.id}`}
                                className="whitespace-nowrap rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-[#123726] shadow-sm transition hover:border-black/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
                            >
                                {nav.label}
                            </a>
                        ))}
                    </div>

                    <section className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_12px_24px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                Hotline
                            </p>
                            <p className="mt-3 text-lg font-semibold text-[#123726] dark:text-white">
                                {item.hotline_phone ?? 'Belum tersedia'}
                            </p>
                            {item.hotline_phone ? (
                                <a
                                    href={`tel:${item.hotline_phone}`}
                                    className="mt-3 inline-flex rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-[#123726] transition hover:border-black/20 dark:border-white/20 dark:text-white"
                                >
                                    Hubungi sekarang
                                </a>
                            ) : null}
                        </div>
                        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_12px_24px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                Website Resmi
                            </p>
                            <p className="mt-3 text-sm text-[#587166] dark:text-[#b0c2b8]">
                                {item.service_website_url ?? 'Belum tersedia'}
                            </p>
                            {item.service_website_url ? (
                                <a
                                    href={item.service_website_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-3 inline-flex rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-[#123726] transition hover:border-black/20 dark:border-white/20 dark:text-white"
                                >
                                    Kunjungi situs
                                </a>
                            ) : null}
                        </div>
                        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_12px_24px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                Kontak
                            </p>
                            <p className="mt-3 text-sm text-[#587166] dark:text-[#b0c2b8]">
                                {item.service_phone ?? 'Telepon belum tersedia'}
                            </p>
                            <p className="mt-2 text-sm text-[#587166] dark:text-[#b0c2b8]">
                                {item.service_email ?? 'Email belum tersedia'}
                            </p>
                        </div>
                    </section>

                    <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_12px_30px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                                <h2 className="text-lg font-semibold text-[#123726] dark:text-white">
                                    Lokasi & Jam Operasional
                                </h2>
                                <p className="mt-2 text-sm text-[#587166] dark:text-[#b0c2b8]">
                                    {item.service_address ?? 'Alamat layanan belum tersedia.'}
                                </p>
                            </div>
                            <div className="rounded-2xl border border-black/5 bg-[#f7faf8] p-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#567365] dark:border-white/10 dark:bg-white/5 dark:text-[#b0c2b8]">
                                Jam Layanan
                            </div>
                        </div>
                        <div className="mt-4 grid gap-3">
                            {item.operational_hours.length > 0 ? (
                                item.operational_hours.map((hour, index) => (
                                    <div
                                        key={`${hour.day}-${index}`}
                                        className="flex items-center justify-between rounded-xl border border-black/5 bg-white px-4 py-3 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                                    >
                                        <span className="font-semibold">{hour.day}</span>
                                        <span className="text-xs text-[#587166] dark:text-[#b0c2b8]">
                                            {hour.is_closed
                                                ? 'Tutup'
                                                : `${hour.opens_at} - ${hour.closes_at}`}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-[#587166] dark:text-[#b0c2b8]">
                                    Jam operasional belum tersedia.
                                </p>
                            )}
                        </div>
                    </section>

                    {item.social_links.length > 0 ? (
                        <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_12px_30px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5">
                            <h2 className="text-lg font-semibold text-[#123726] dark:text-white">
                                Sosial Media
                            </h2>
                            <div className="mt-4 flex flex-wrap gap-3">
                                {item.social_links.map((link, index) => (
                                    <a
                                        key={`${link.platform}-${index}`}
                                        href={link.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#123726] transition hover:border-black/20 dark:border-white/20 dark:text-white"
                                    >
                                        {link.platform}
                                    </a>
                                ))}
                            </div>
                        </section>
                    ) : null}

                    {item.infographic_url ? (
                        <section
                            id="infografis-layanan"
                            className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_12px_30px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5"
                        >
                            <div className="border-b border-black/5 px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#567365] dark:border-white/10 dark:text-[#b0c2b8]">
                                Infografis
                            </div>
                            <img
                                src={item.infographic_url}
                                alt={`Infografis ${item.title}`}
                                className="h-auto w-full object-cover"
                            />
                        </section>
                    ) : null}

                    <Section
                        id="media-dan-informasi"
                        title="Media dan Informasi"
                        html={item.media_information}
                    />
                    <Section
                        id="manfaat-layanan"
                        title="Manfaat bagi masyarakat"
                        html={item.community_benefits}
                    />
                    <Section
                        id="fitur-layanan"
                        title="Fitur Aplikasi SIDATUK"
                        html={item.sidatuk_features}
                    />
                    <Section id="syarat-layanan" title="Ketentuan layanan" html={item.service_terms} />
                    <Section
                        id="alur-layanan"
                        title="Alur pengguna layanan"
                        html={item.service_flow}
                    />

                    <section
                        id="faq"
                        className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_12px_30px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5"
                    >
                        <h2 className="text-lg font-semibold text-[#123726] dark:text-white">
                            Frequently Asked Questions
                        </h2>
                        <div className="mt-4 grid gap-4">
                            {item.faqs.length > 0 ? (
                                item.faqs.map((faq, index) => (
                                    <div
                                        key={`${faq.question}-${index}`}
                                        className="rounded-2xl border border-black/5 bg-white/80 px-4 py-3 dark:border-white/10 dark:bg-white/10"
                                    >
                                        <p className="text-sm font-semibold text-[#123726] dark:text-white">
                                            {faq.question}
                                        </p>
                                        <p className="mt-2 text-sm text-[#587166] dark:text-[#b0c2b8]">
                                            {faq.answer}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-[#587166] dark:text-[#b0c2b8]">
                                    Belum ada FAQ untuk layanan ini.
                                </p>
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
