import { Head, Link } from '@inertiajs/react';

type NewsItem = {
    title: string;
    slug: string;
    category: string;
    excerpt: string;
    published_at: string;
    body_html: string;
};

export default function NewsShow({ news }: { news: NewsItem }) {
    return (
        <div className="min-h-screen bg-[#f6f8f7] text-[#10261b] dark:bg-[#0b1410] dark:text-[#e6efe9]">
            <Head title={news.title} />

            <header className="border-b border-black/5 bg-white/80 py-12 dark:border-white/10 dark:bg-[#0b1410]/80">
                <div className="mx-auto max-w-4xl px-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                        {news.category}
                    </p>
                    <h1 className="mt-3 font-['Unbounded'] text-4xl text-[#0b2d1d] dark:text-white">
                        {news.title}
                    </h1>
                    <p className="mt-3 text-sm text-[#587166] dark:text-[#b0c2b8]">
                        {news.published_at}
                    </p>
                    <div className="mt-6">
                        <Link
                            href="/berita"
                            className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-[#123726] transition hover:border-black/20 dark:border-white/20 dark:text-white"
                        >
                            Kembali ke Berita
                        </Link>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-4xl space-y-6 px-6 py-12">
                <p className="text-base leading-relaxed text-[#354f42] dark:text-[#c7d6ce]">
                    {news.excerpt}
                </p>
                <div
                    className="prose max-w-none rounded-2xl border border-black/5 bg-white/70 p-6 text-sm text-[#587166] shadow-[0_12px_30px_rgba(15,107,79,0.08)] dark:prose-invert dark:border-white/10 dark:bg-white/5 dark:text-[#b0c2b8]"
                    dangerouslySetInnerHTML={{ __html: news.body_html }}
                />
            </main>
        </div>
    );
}
