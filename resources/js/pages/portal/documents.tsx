import { Head, Link } from '@inertiajs/react';

type DocumentItem = {
    title: string;
    description: string;
    file_name: string;
    file_size: number;
    file_url: string;
    issued_at: string | null;
    published_at: string | null;
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

export default function PortalDocuments({
    title,
    subtitle,
    items,
}: {
    title: string;
    subtitle: string;
    items: DocumentItem[];
}) {
    return (
        <div className="min-h-screen bg-[#f6f8f7] text-[#10261b] dark:bg-[#0b1410] dark:text-[#e6efe9]">
            <Head title={title} />

            <header className="border-b border-black/5 bg-white/85 py-12 dark:border-white/10 dark:bg-[#0b1410]/80">
                <div className="mx-auto max-w-5xl px-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                        Portal Informasi
                    </p>
                    <h1 className="mt-3 font-['Unbounded'] text-4xl text-[#0b2d1d] dark:text-white">
                        {title}
                    </h1>
                    <p className="mt-4 max-w-2xl text-sm text-[#587166] dark:text-[#b0c2b8]">
                        {subtitle}
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
                <div className="grid gap-6 md:grid-cols-2">
                    {items.length > 0 ? (
                        items.map((item) => (
                            <article
                                key={item.title}
                                className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_12px_30px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5"
                            >
                                <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#6c867b] dark:text-[#b7c7bf]">
                                    <span>{item.issued_at ? `Terbit: ${item.issued_at}` : 'Tanpa tanggal'}</span>
                                    <span>{item.published_at ? `Publikasi: ${item.published_at}` : 'Belum rilis'}</span>
                                </div>
                                <h2 className="mt-4 text-xl font-semibold text-[#123726] dark:text-white">
                                    {item.title}
                                </h2>
                                <p className="mt-3 text-sm text-[#587166] dark:text-[#b0c2b8]">
                                    {item.description}
                                </p>
                                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                                    <div className="text-xs text-[#6c867b] dark:text-[#b7c7bf]">
                                        {item.file_name} • {formatFileSize(item.file_size)}
                                    </div>
                                    <a
                                        href={item.file_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="rounded-full bg-[#0f6b4f] px-4 py-2 text-xs font-semibold text-white shadow-[0_10px_24px_rgba(15,107,79,0.2)] transition hover:brightness-95"
                                    >
                                        Unduh PDF
                                    </a>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="rounded-2xl border border-black/5 bg-white/80 p-6 text-sm text-[#587166] shadow-[0_12px_30px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5 dark:text-[#b0c2b8]">
                            Belum ada dokumen yang dipublikasikan.
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
