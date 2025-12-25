import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

type NavigationItem = {
    label: string;
    href: string;
};

type Hero = {
    title: string;
    subtitle: string;
};

type Pillar = {
    title: string;
    detail: string;
};

type NewsHighlight = {
    title: string;
    category: string;
    excerpt: string;
};

type StatsHighlight = {
    title: string;
    value: string;
};

export default function Welcome({
    canRegister = true,
    navigation,
    hero,
    pillars,
    newsHighlights,
    statsHighlights,
}: {
    canRegister?: boolean;
    navigation: NavigationItem[];
    hero: Hero;
    pillars: Pillar[];
    newsHighlights: NewsHighlight[];
    statsHighlights: StatsHighlight[];
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <div
            className="min-h-screen bg-[#f6f8f7] text-[#10261b] dark:bg-[#0b1410] dark:text-[#e6efe9]"
            style={{
                '--brand': '#0f6b4f',
                '--accent': '#f4b43e',
                '--ink': '#0b2d1d',
            }}
        >
            <Head title="Portal Informasi Kaltara">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700&family=unbounded:500,600"
                    rel="stylesheet"
                />
            </Head>

            <header className="sticky top-0 z-40 border-b border-black/5 bg-white/80 backdrop-blur-lg dark:border-white/10 dark:bg-[#0b1410]/80">
                <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand)] text-white shadow-[0_10px_30px_rgba(15,107,79,0.35)]">
                            <span className="font-['Unbounded'] text-sm tracking-wide">
                                KU
                            </span>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-[#4c6b5d] dark:text-[#9fb3a8]">
                                Pemerintah Provinsi
                            </p>
                            <p className="font-['Unbounded'] text-lg">
                                Kalimantan Utara
                            </p>
                        </div>
                    </div>
                    <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
                        {navigation.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="text-[#355245] transition hover:text-[var(--brand)] dark:text-[#b6c7be] dark:hover:text-white"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                    <div className="flex items-center gap-3">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-[#123726] transition hover:border-black/20 dark:border-white/20 dark:text-white"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="text-sm font-semibold text-[#123726] transition hover:text-[var(--brand)] dark:text-[#d7e6dd]"
                                >
                                    Masuk
                                </Link>
                                {canRegister && (
                                    <Link
                                        href={register()}
                                        className="rounded-full bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(15,107,79,0.25)] transition hover:brightness-95"
                                    >
                                        Daftar
                                    </Link>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </header>

            <main>
                <section
                    id="beranda"
                    className="relative overflow-hidden border-b border-black/5 bg-[radial-gradient(circle_at_top_left,#e5efe9,transparent_55%),radial-gradient(circle_at_top_right,#fdf3df,transparent_45%)] dark:border-white/10 dark:bg-[radial-gradient(circle_at_top_left,#123021,transparent_55%),radial-gradient(circle_at_top_right,#403016,transparent_45%)]"
                >
                    <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-[1.2fr_0.8fr] md:items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#456a59] dark:border-white/20 dark:bg-white/5 dark:text-[#c7d6ce]">
                                Informasi Publik Terpadu
                            </div>
                            <div className="space-y-4">
                                <h1 className="font-['Unbounded'] text-4xl leading-tight text-[var(--ink)] md:text-5xl dark:text-white">
                                    {hero.title}
                                </h1>
                                <p className="text-base leading-relaxed text-[#355245] md:text-lg dark:text-[#c7d6ce]">
                                    {hero.subtitle}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="#berita"
                                    className="rounded-full bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(15,107,79,0.25)] transition hover:brightness-95"
                                >
                                    Lihat Berita Utama
                                </Link>
                                <Link
                                    href="#data"
                                    className="rounded-full border border-black/15 bg-white/80 px-6 py-3 text-sm font-semibold text-[#123726] transition hover:border-black/30 dark:border-white/30 dark:bg-white/10 dark:text-white"
                                >
                                    Jelajahi Data Statistik
                                </Link>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-3">
                                {pillars.map((item) => (
                                    <div
                                        key={item.title}
                                        className="rounded-2xl border border-black/5 bg-white/80 p-4 shadow-[0_12px_24px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5"
                                    >
                                        <p className="text-sm font-semibold text-[#123726] dark:text-white">
                                            {item.title}
                                        </p>
                                        <p className="mt-2 text-xs text-[#5a7267] dark:text-[#b0c2b8]">
                                            {item.detail}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="rounded-3xl border border-black/10 bg-white/90 p-6 shadow-[0_20px_40px_rgba(15,107,79,0.18)] dark:border-white/10 dark:bg-white/5">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365] dark:text-[#b0c2b8]">
                                    Statistik Kaltara
                                </p>
                                <div className="mt-6 space-y-4">
                                    {[
                                        { label: 'Kabupaten/Kota', value: '5' },
                                        { label: 'Luas Wilayah (km²)', value: '75.467' },
                                        { label: 'Penduduk (estimasi)', value: '760 ribu+' },
                                    ].map((stat) => (
                                        <div
                                            key={stat.label}
                                            className="flex items-center justify-between border-b border-black/5 pb-3 last:border-b-0 dark:border-white/10"
                                        >
                                            <span className="text-sm text-[#486356] dark:text-[#b7c7bf]">
                                                {stat.label}
                                            </span>
                                            <span className="text-lg font-semibold text-[#0f2e1f] dark:text-white">
                                                {stat.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="rounded-3xl border border-black/5 bg-[#0f6b4f] p-6 text-white shadow-[0_20px_40px_rgba(15,107,79,0.25)]">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                                    Akses Cepat
                                </p>
                                <p className="mt-4 text-lg font-semibold">
                                    Tautan layanan dan informasi penting provinsi.
                                </p>
                                <div className="mt-6 grid gap-3 text-sm">
                                    {[
                                        'Profil Pemprov',
                                        'Agenda Kegiatan',
                                        'Direktori OPD',
                                    ].map((item) => (
                                        <Link
                                            key={item}
                                            href="#"
                                            className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white/90 transition hover:bg-white/20"
                                        >
                                            <span>{item}</span>
                                            <span aria-hidden="true">→</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="berita" className="mx-auto max-w-6xl px-6 py-16">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#638176]">
                                Berita Resmi
                            </p>
                            <h2 className="mt-3 font-['Unbounded'] text-3xl text-[var(--ink)] dark:text-white">
                                Informasi terkini untuk masyarakat Kaltara
                            </h2>
                        </div>
                        <Link
                            href="#"
                            className="rounded-full border border-black/15 px-5 py-2 text-sm font-semibold text-[#123726] transition hover:border-black/30 dark:border-white/20 dark:text-white"
                        >
                            Lihat semua berita
                        </Link>
                    </div>
                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        {newsHighlights.map((item) => (
                            <article
                                key={item.title}
                                className="flex flex-col gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-[0_12px_30px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5"
                            >
                                <div className="h-32 rounded-xl bg-[linear-gradient(135deg,#0f6b4f,#7bc7a1)]" />
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6c867b] dark:text-[#b7c7bf]">
                                    {item.category}
                                </p>
                                <h3 className="text-lg font-semibold text-[#123726] dark:text-white">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-[#587166] dark:text-[#b0c2b8]">
                                    {item.excerpt}
                                </p>
                                <Link
                                    href="#"
                                    className="mt-auto text-sm font-semibold text-[var(--brand)]"
                                >
                                    Baca selengkapnya
                                </Link>
                            </article>
                        ))}
                    </div>
                </section>

                <section
                    id="data"
                    className="border-y border-black/5 bg-white/60 py-16 dark:border-white/10 dark:bg-white/5"
                >
                    <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[0.9fr_1.1fr]">
                        <div className="space-y-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#638176]">
                                Dashboard Statistik
                            </p>
                            <h2 className="font-['Unbounded'] text-3xl text-[var(--ink)] dark:text-white">
                                Ringkasan data utama provinsi
                            </h2>
                            <p className="text-sm text-[#556f63] dark:text-[#b0c2b8]">
                                Data ditampilkan secara ringkas untuk membantu masyarakat memahami perkembangan daerah.
                            </p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {statsHighlights.map((item) => (
                                <div
                                    key={item.title}
                                    className="rounded-2xl border border-black/5 bg-white p-4 shadow-[0_12px_24px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5"
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
                    </div>
                </section>

                <section id="transparansi" className="mx-auto max-w-6xl px-6 py-16">
                    <div className="rounded-3xl border border-black/10 bg-[linear-gradient(135deg,#0f6b4f,#1c8b69)] p-10 text-white shadow-[0_24px_40px_rgba(15,107,79,0.25)]">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                            Transparansi Publik
                        </p>
                        <h2 className="mt-4 font-['Unbounded'] text-3xl">
                            Laporan keuangan dan kinerja dapat diakses publik
                        </h2>
                        <p className="mt-4 max-w-2xl text-sm text-white/80">
                            Kami menyediakan dokumen resmi untuk memastikan akuntabilitas, memudahkan monitoring, dan membangun kepercayaan publik.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                href="#"
                                className="rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                            >
                                Laporan Keuangan
                            </Link>
                            <Link
                                href="#"
                                className="rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                            >
                                LKJIP
                            </Link>
                        </div>
                    </div>
                </section>

                <section id="profil" className="mx-auto max-w-6xl px-6 py-16">
                    <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#638176]">
                                Profil Pemerintah
                            </p>
                            <h2 className="mt-4 font-['Unbounded'] text-3xl text-[var(--ink)] dark:text-white">
                                Mengenal struktur dan layanan utama
                            </h2>
                            <p className="mt-4 text-sm text-[#587166] dark:text-[#b0c2b8]">
                                Informasi ringkas tentang organisasi, OPD, serta kanal pelayanan masyarakat.
                            </p>
                        </div>
                        <div className="space-y-4">
                            {[
                                'Struktur Organisasi',
                                'Direktori OPD',
                                'Kontak Layanan',
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center justify-between rounded-2xl border border-black/5 bg-white p-4 text-sm font-semibold text-[#123726] shadow-[0_10px_20px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5 dark:text-white"
                                >
                                    <span>{item}</span>
                                    <span aria-hidden="true">↗</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="kontak" className="border-t border-black/5 bg-white/60 py-16 dark:border-white/10 dark:bg-white/5">
                    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#638176]">
                                Kontak & Aspirasi
                            </p>
                            <h2 className="mt-3 font-['Unbounded'] text-3xl text-[var(--ink)] dark:text-white">
                                Hubungi Pemerintah Provinsi Kalimantan Utara
                            </h2>
                        </div>
                        <div className="rounded-3xl border border-black/10 bg-white p-6 text-sm text-[#456357] shadow-[0_12px_28px_rgba(15,107,79,0.1)] dark:border-white/10 dark:bg-white/5 dark:text-[#b7c7bf]">
                            <p>Jl. Kolonel Soetadji, Tanjung Selor</p>
                            <p className="mt-2">info@kaltara.go.id</p>
                            <p className="mt-2">+62 555 123 456</p>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="border-t border-black/5 px-6 py-8 text-center text-xs text-[#638176] dark:border-white/10 dark:text-[#9fb3a8]">
                Portal Informasi Provinsi Kalimantan Utara © 2025
            </footer>
        </div>
    );
}
