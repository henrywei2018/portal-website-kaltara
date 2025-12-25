import { Form, Head, Link } from '@inertiajs/react';

type NewsItem = {
    title: string;
    slug: string;
    category: string;
    excerpt: string;
    published_at: string;
};

export default function NewsIndex({
    newsItems,
    searchQuery,
}: {
    newsItems: NewsItem[];
    searchQuery: string;
}) {
    return (
        <div className="min-h-screen bg-[#f6f8f7] text-[#10261b] dark:bg-[#0b1410] dark:text-[#e6efe9]">
            <Head title="Berita Resmi" />

            <header className="border-b border-black/5 bg-white/80 py-12 dark:border-white/10 dark:bg-[#0b1410]/80">
                <div className="mx-auto max-w-5xl px-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                        Berita Resmi
                    </p>
                    <h1 className="mt-3 font-['Unbounded'] text-4xl text-[#0b2d1d] dark:text-white">
                        Informasi terkini Pemerintah Provinsi Kalimantan Utara
                    </h1>
                    <p className="mt-4 max-w-2xl text-sm text-[#587166] dark:text-[#b0c2b8]">
                        Kumpulan berita, pengumuman, dan agenda resmi untuk masyarakat serta mitra.
                    </p>
                    <div className="mt-6 flex gap-3">
                        <Link
                            href="/"
                            className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-[#123726] transition hover:border-black/20 dark:border-white/20 dark:text-white"
                        >
                            Kembali ke Beranda
                        </Link>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-5xl px-6 py-12">
                <Form method="get" action="/berita" className="mb-8">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center">
                        <input
                            type="search"
                            name="q"
                            defaultValue={searchQuery}
                            placeholder="Cari berita atau kategori..."
                            className="w-full rounded-full border border-black/10 bg-white px-5 py-3 text-sm text-[#123726] shadow-[0_10px_20px_rgba(15,107,79,0.08)] focus:border-[#0f6b4f] focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                        />
                        <button
                            type="submit"
                            className="rounded-full bg-[#0f6b4f] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(15,107,79,0.2)] transition hover:brightness-95"
                        >
                            Cari
                        </button>
                    </div>
                </Form>

                <div className="grid gap-6 md:grid-cols-2">
                    {newsItems.length > 0 ? (
                        newsItems.map((item) => (
                            <article
                                key={item.title}
                                className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_12px_30px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5"
                            >
                                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-[#6c867b] dark:text-[#b7c7bf]">
                                    <span>{item.category}</span>
                                    <span>{item.published_at}</span>
                                </div>
                                <h2 className="mt-4 text-xl font-semibold text-[#123726] dark:text-white">
                                    {item.title}
                                </h2>
                                <p className="mt-3 text-sm text-[#587166] dark:text-[#b0c2b8]">
                                    {item.excerpt}
                                </p>
                                <Link
                                    href={`/berita/${item.slug}`}
                                    className="mt-4 inline-flex text-sm font-semibold text-[#0f6b4f]"
                                >
                                    Baca selengkapnya
                                </Link>
                            </article>
                        ))
                    ) : (
                        <div className="rounded-2xl border border-black/5 bg-white/80 p-6 text-sm text-[#587166] shadow-[0_12px_30px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5 dark:text-[#b0c2b8]">
                            Tidak ada berita yang sesuai dengan pencarian Anda.
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
