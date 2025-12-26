import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    const { name, quote } = usePage<SharedData>().props;

    return (
        <div className="relative grid min-h-svh lg:grid-cols-[1.1fr_1fr]">
            <div className="relative hidden flex-col justify-between bg-[#0f6b4f] p-12 text-white lg:flex">
                <div className="absolute inset-0 bg-[radial-gradient(800px_circle_at_top,#28a37b,transparent_60%)] opacity-80" />
                <div className="relative z-10 flex items-center gap-3 text-lg font-semibold">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-sm font-semibold">
                        <AppLogoIcon className="size-8 fill-current text-white" />
                    </div>
                    <div className="leading-tight">
                        <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                            Portal Informasi
                        </p>
                        <p className="font-['Unbounded'] text-2xl">{name}</p>
                    </div>
                </div>
                {quote && (
                    <div className="relative z-10 max-w-sm space-y-3 text-sm text-white/80">
                        <p className="text-lg text-white">
                            &ldquo;{quote.message}&rdquo;
                        </p>
                        <p className="text-sm text-white/70">{quote.author}</p>
                    </div>
                )}
            </div>
            <div className="relative flex items-center justify-center bg-[#f6f8f7] px-6 py-12 dark:bg-[#0b1410]">
                <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_top,#e6f1ec,transparent_60%)] opacity-70 dark:opacity-30" />
                <div className="relative w-full max-w-md rounded-3xl border border-black/5 bg-white/90 p-8 shadow-[0_24px_50px_rgba(15,107,79,0.14)] backdrop-blur dark:border-white/10 dark:bg-white/5">
                    <Link
                        href={home()}
                        className="mb-6 flex items-center gap-3 font-semibold text-[#123726] dark:text-white lg:hidden"
                    >
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0f6b4f] text-sm font-semibold text-white shadow-[0_12px_24px_rgba(15,107,79,0.3)]">
                            KU
                        </div>
                        <div className="leading-tight">
                            <p className="text-xs uppercase tracking-[0.2em] text-[#567365]">
                                Portal Informasi
                            </p>
                            <p className="font-['Unbounded'] text-lg">Kaltara</p>
                        </div>
                    </Link>
                    <div className="space-y-2 text-left">
                        <h1 className="text-2xl font-semibold text-[#0b2d1d] dark:text-white">
                            {title}
                        </h1>
                        <p className="text-sm text-[#587166] dark:text-[#b0c2b8]">
                            {description}
                        </p>
                    </div>
                    <div className="mt-8">{children}</div>
                </div>
            </div>
        </div>
    );
}
