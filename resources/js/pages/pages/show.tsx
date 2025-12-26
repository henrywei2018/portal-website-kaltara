import { Head, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

type NavigationItem = {
    label: string;
    href: string;
    is_external: boolean;
    children: NavigationItem[];
};

type ContentBlock = {
    type: string;
    content: string;
};

type PageData = {
    title: string;
    slug: string;
    blocks: ContentBlock[];
};

export default function PublicPage({ page, navigation }: { page: PageData; navigation: NavigationItem[] }) {
    const { auth } = usePage<SharedData>().props;

    const renderNavLink = (item: NavigationItem, className: string) => {
        if (item.is_external) {
            return (
                <a href={item.href} className={className} target="_blank" rel="noreferrer">
                    {item.label}
                </a>
            );
        }

        return (
            <Link href={item.href} className={className}>
                {item.label}
            </Link>
        );
    };

    const renderBlock = (block: ContentBlock, index: number) => {
        switch (block.type) {
            case 'heading':
                return (
                    <h2
                        key={`${block.type}-${index}`}
                        className="text-2xl font-semibold text-[#0b2d1d] dark:text-white"
                    >
                        {block.content}
                    </h2>
                );
            case 'quote':
                return (
                    <blockquote
                        key={`${block.type}-${index}`}
                        className="rounded-2xl border-l-4 border-[#0f6b4f] bg-white p-4 text-sm text-[#2f493f] shadow-[0_10px_20px_rgba(15,107,79,0.08)] dark:border-[#3bd18f] dark:bg-white/5 dark:text-[#d6e3dd]"
                    >
                        {block.content}
                    </blockquote>
                );
            case 'list': {
                const items = block.content
                    .split('\n')
                    .map((item) => item.trim())
                    .filter((item) => item.length > 0);

                return (
                    <ul key={`${block.type}-${index}`} className="list-disc space-y-2 pl-6 text-sm">
                        {items.map((item, itemIndex) => (
                            <li key={`${block.type}-${index}-${itemIndex}`}>{item}</li>
                        ))}
                    </ul>
                );
            }
            case 'paragraph':
            default:
                return (
                    <p key={`${block.type}-${index}`} className="text-sm leading-relaxed text-[#355245] dark:text-[#c4d3cc]">
                        {block.content}
                    </p>
                );
        }
    };

    return (
        <div className="min-h-screen bg-[#f6f8f7] text-[#10261b] dark:bg-[#0b1410] dark:text-[#e6efe9]">
            <Head title={page.title}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700&family=unbounded:500,600"
                    rel="stylesheet"
                />
            </Head>

            <header className="sticky top-0 z-40 border-b border-black/5 bg-white/80 backdrop-blur-lg dark:border-white/10 dark:bg-[#0b1410]/80">
                <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0f6b4f] text-white shadow-[0_10px_30px_rgba(15,107,79,0.35)]">
                            <span className="font-['Unbounded'] text-sm tracking-wide">KU</span>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-[#4c6b5d] dark:text-[#9fb3a8]">
                                Pemerintah Provinsi
                            </p>
                            <p className="font-['Unbounded'] text-lg">Kalimantan Utara</p>
                        </div>
                    </div>
                    <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
                        {navigation.map((item) => (
                            <div key={item.label} className="group relative">
                                {renderNavLink(
                                    item,
                                    'text-[#355245] transition hover:text-[#0f6b4f] dark:text-[#b6c7be] dark:hover:text-white',
                                )}
                                {item.children.length > 0 ? (
                                    <div className="absolute left-0 top-full hidden min-w-[200px] rounded-2xl border border-black/10 bg-white/95 p-3 shadow-[0_12px_30px_rgba(15,107,79,0.1)] group-hover:block dark:border-white/10 dark:bg-[#0b1410]">
                                        <div className="flex flex-col gap-2">
                                            {item.children.map((child) =>
                                                renderNavLink(
                                                    child,
                                                    'rounded-lg px-3 py-2 text-sm text-[#355245] transition hover:bg-[#f3f6f4] hover:text-[#0f6b4f] dark:text-[#b6c7be] dark:hover:bg-white/5 dark:hover:text-white',
                                                ),
                                            )}
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        ))}
                    </nav>
                    <div className="flex items-center gap-3">
                        {auth.user ? (
                            <Link
                                href="/dashboard"
                                className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-[#123726] transition hover:border-black/20 dark:border-white/20 dark:text-white"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-[#123726] transition hover:border-black/20 dark:border-white/20 dark:text-white"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </header>

            <main className="mx-auto w-full max-w-4xl space-y-8 px-6 py-12">
                <section className="rounded-3xl border border-black/5 bg-white p-8 shadow-[0_20px_40px_rgba(15,107,79,0.12)] dark:border-white/10 dark:bg-white/5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">Halaman Publik</p>
                    <h1 className="mt-3 font-['Unbounded'] text-3xl text-[#0b2d1d] dark:text-white">{page.title}</h1>
                    <div className="mt-8 space-y-5">
                        {page.blocks.length > 0 ? (
                            page.blocks.map((block, index) => renderBlock(block, index))
                        ) : (
                            <p className="text-sm text-[#587166] dark:text-[#b0c2b8]">
                                Konten belum tersedia untuk halaman ini.
                            </p>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
