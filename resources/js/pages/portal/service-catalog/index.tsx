import { Head, Link } from '@inertiajs/react';

type ServiceSector = {
    id: number;
    name: string;
    slug: string;
    color: string | null;
    icon_url: string | null;
    service_count: number;
};

type ServiceCatalogItem = {
    id: number;
    title: string;
    slug: string;
    sector: {
        id: number | null;
        name: string | null;
        color: string | null;
    };
    excerpt: string;
    infographic_url: string | null;
};

export default function ServiceCatalogIndex({
    items,
    sectors,
    filters,
}: {
    items: ServiceCatalogItem[];
    sectors: ServiceSector[];
    filters: {
        query: string;
        sector: number | null;
    };
}) {
    const buildFilterHref = (sectorId: number | null) => {
        const params = new URLSearchParams();

        if (filters.query) {
            params.set('q', filters.query);
        }

        if (sectorId) {
            params.set('sector', String(sectorId));
        }

        const queryString = params.toString();

        return queryString ? `/layanan?${queryString}` : '/layanan';
    };

    return (
        <div className="min-h-screen bg-[#f6f8f7] text-[#10261b] dark:bg-[#0b1410] dark:text-[#e6efe9]">
            <Head title="Katalog Layanan" />

            <header className="border-b border-black/5 bg-white/85 py-12 dark:border-white/10 dark:bg-[#0b1410]/80">
                <div className="mx-auto max-w-6xl px-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                        Portal Layanan Publik
                    </p>
                    <h1 className="mt-3 font-['Unbounded'] text-4xl text-[#0b2d1d] dark:text-white">
                        Katalog Layanan
                    </h1>
                    <p className="mt-4 max-w-2xl text-sm text-[#587166] dark:text-[#b0c2b8]">
                        Temukan informasi layanan publik dan administrasi berdasarkan sektor.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                            href="/"
                            className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-[#123726] transition hover:border-black/20 dark:border-white/20 dark:text-white"
                        >
                            Kembali ke Beranda
                        </Link>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-6 py-12">
                <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-[0_12px_30px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                                Pencarian Layanan
                            </p>
                            <p className="mt-2 text-sm text-[#587166] dark:text-[#b0c2b8]">
                                Cari layanan berdasarkan kata kunci dan sektor.
                            </p>
                        </div>
                        <form action="/layanan" className="flex flex-wrap gap-3">
                            <input
                                name="q"
                                defaultValue={filters.query}
                                placeholder="Cari layanan..."
                                className="w-64 rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#123726] dark:border-white/10 dark:bg-white/5 dark:text-white"
                            />
                            {filters.sector ? (
                                <input type="hidden" name="sector" value={filters.sector} />
                            ) : null}
                            <button
                                type="submit"
                                className="rounded-full bg-[#0f6b4f] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(15,107,79,0.2)] transition hover:brightness-95"
                            >
                                Cari
                            </button>
                        </form>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                            href={buildFilterHref(null)}
                            className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                                filters.sector
                                    ? 'border-black/10 text-[#123726] hover:border-black/20 dark:border-white/10 dark:text-white'
                                    : 'border-[#0f6b4f] bg-[#0f6b4f] text-white shadow-[0_8px_20px_rgba(15,107,79,0.2)]'
                            }`}
                        >
                            Semua Sektor
                        </Link>
                        {sectors.map((sector) => {
                            const isActive = filters.sector === sector.id;

                            return (
                                <Link
                                    key={sector.id}
                                    href={buildFilterHref(sector.id)}
                                    className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                                        isActive
                                            ? 'border-[#0f6b4f] bg-[#0f6b4f] text-white shadow-[0_8px_20px_rgba(15,107,79,0.2)]'
                                            : 'border-black/10 text-[#123726] hover:border-black/20 dark:border-white/10 dark:text-white'
                                    }`}
                                >
                                    {sector.name} ({sector.service_count})
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-2">
                    {items.length > 0 ? (
                        items.map((item) => (
                            <article
                                key={item.id}
                                className="group rounded-2xl border border-black/5 bg-white p-6 shadow-[0_12px_30px_rgba(15,107,79,0.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(15,107,79,0.12)] dark:border-white/10 dark:bg-white/5"
                            >
                                <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#6c867b] dark:text-[#b7c7bf]">
                                    <span>{item.sector.name ?? 'Tanpa sektor'}</span>
                                    <span className="rounded-full border border-black/10 px-3 py-1 text-[0.65rem] text-[#123726] dark:border-white/20 dark:text-white">
                                        Layanan Aktif
                                    </span>
                                </div>
                                <h2 className="mt-4 text-xl font-semibold text-[#123726] dark:text-white">
                                    {item.title}
                                </h2>
                                <p className="mt-3 text-sm text-[#587166] dark:text-[#b0c2b8]">
                                    {item.excerpt || 'Deskripsi layanan segera tersedia.'}
                                </p>
                                {item.infographic_url ? (
                                    <div className="mt-4 overflow-hidden rounded-2xl border border-black/5 dark:border-white/10">
                                        <img
                                            src={item.infographic_url}
                                            alt={`Infografis ${item.title}`}
                                            className="h-40 w-full object-cover transition duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                ) : null}
                                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                                    <span className="text-xs text-[#6c867b] dark:text-[#b7c7bf]">
                                        Klik untuk detail layanan
                                    </span>
                                    <Link
                                        href={`/layanan/${item.slug}`}
                                        className="rounded-full bg-[#0f6b4f] px-4 py-2 text-xs font-semibold text-white shadow-[0_10px_24px_rgba(15,107,79,0.2)] transition hover:brightness-95"
                                    >
                                        Lihat Detail
                                    </Link>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="rounded-2xl border border-black/5 bg-white/80 p-6 text-sm text-[#587166] shadow-[0_12px_30px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5 dark:text-[#b0c2b8]">
                            Tidak ada layanan yang cocok dengan filter saat ini.
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
