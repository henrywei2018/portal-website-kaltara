import { Head, Link } from '@inertiajs/react';

type Highlight = {
    title: string;
    value: string;
};

export default function StatsIndex({
    highlights,
}: {
    highlights: Highlight[];
}) {
    return (
        <div className="min-h-screen bg-[#f6f8f7] text-[#10261b] dark:bg-[#0b1410] dark:text-[#e6efe9]">
            <Head title="Dashboard Statistik" />

            <header className="border-b border-black/5 bg-white/80 py-12 dark:border-white/10 dark:bg-[#0b1410]/80">
                <div className="mx-auto max-w-5xl px-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                        Dashboard Statistik
                    </p>
                    <h1 className="mt-3 font-['Unbounded'] text-4xl text-[#0b2d1d] dark:text-white">
                        Ringkasan data utama Provinsi Kalimantan Utara
                    </h1>
                    <p className="mt-4 max-w-2xl text-sm text-[#587166] dark:text-[#b0c2b8]">
                        Data ditampilkan ringkas untuk membantu publik memahami perkembangan daerah.
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
                    {highlights.map((item) => (
                        <div
                            key={item.title}
                            className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_12px_24px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5"
                        >
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6c867b] dark:text-[#b0c2b8]">
                                {item.title}
                            </p>
                            <p className="mt-3 text-2xl font-semibold text-[#123726] dark:text-white">
                                {item.value}
                            </p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
