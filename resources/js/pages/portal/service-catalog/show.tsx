import { Head, Link } from '@inertiajs/react';

type ServiceCatalogDetail = {
    title: string;
    slug: string;
    sector: {
        id: number | null;
        name: string | null;
        color: string | null;
    };
    media_information: string;
    community_benefits: string;
    sidatuk_features: string;
    service_terms: string;
    service_flow: string;
    infographic_url: string | null;
    faqs: Array<{ question: string; answer: string }>;
};

const Section = ({
    title,
    html,
}: {
    title: string;
    html: string;
}) => (
    <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_12px_30px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5">
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
    return (
        <div className="min-h-screen bg-[#f6f8f7] text-[#10261b] dark:bg-[#0b1410] dark:text-[#e6efe9]">
            <Head title={item.title} />

            <header className="border-b border-black/5 bg-white/85 py-12 dark:border-white/10 dark:bg-[#0b1410]/80">
                <div className="mx-auto max-w-5xl px-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                        Detail Layanan
                    </p>
                    <h1 className="mt-3 font-['Unbounded'] text-4xl text-[#0b2d1d] dark:text-white">
                        {item.title}
                    </h1>
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#6c867b] dark:text-[#b7c7bf]">
                        <span>{item.sector.name ?? 'Tanpa sektor'}</span>
                        <span className="rounded-full border border-black/10 px-3 py-1 text-[0.65rem] text-[#123726] dark:border-white/20 dark:text-white">
                            Layanan Aktif
                        </span>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                            href="/layanan"
                            className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-[#123726] transition hover:border-black/20 dark:border-white/20 dark:text-white"
                        >
                            Kembali ke Katalog
                        </Link>
                    </div>
                </div>
            </header>

            <main className="mx-auto grid max-w-5xl gap-6 px-6 py-12">
                {item.infographic_url ? (
                    <section className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_12px_30px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5">
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

                <Section title="Media dan Informasi" html={item.media_information} />
                <Section title="Manfaat bagi masyarakat" html={item.community_benefits} />
                <Section title="Fitur Aplikasi SIDATUK" html={item.sidatuk_features} />
                <Section title="Ketentuan layanan" html={item.service_terms} />
                <Section title="Alur pengguna layanan" html={item.service_flow} />

                <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_12px_30px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5">
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
            </main>
        </div>
    );
}
