import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

export default function AuthCardLayout({
    children,
    title,
    description,
}: PropsWithChildren<{
    name?: string;
    title?: string;
    description?: string;
}>) {
    return (
        <div className="relative flex min-h-svh items-center justify-center bg-[#f6f8f7] px-6 py-12 dark:bg-[#0b1410]">
            <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_top,#e6f1ec,transparent_60%)] opacity-80 dark:opacity-30" />
            <div className="relative w-full max-w-md">
                <div className="rounded-3xl border border-black/5 bg-white/90 p-8 text-center shadow-[0_24px_50px_rgba(15,107,79,0.14)] backdrop-blur dark:border-white/10 dark:bg-white/5">
                    <Link
                        href={home()}
                        className="mx-auto mb-4 flex w-fit items-center gap-3 font-semibold text-[#123726] dark:text-white"
                    >
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0f6b4f] text-sm font-semibold text-white shadow-[0_12px_24px_rgba(15,107,79,0.3)]">
                            KU
                        </div>
                        <div className="leading-tight text-left">
                            <p className="text-xs uppercase tracking-[0.2em] text-[#567365]">
                                Portal Informasi
                            </p>
                            <p className="font-['Unbounded'] text-lg">Kaltara</p>
                        </div>
                    </Link>
                    <h1 className="text-2xl font-semibold text-[#0b2d1d] dark:text-white">
                        {title}
                    </h1>
                    <p className="mt-2 text-sm text-[#587166] dark:text-[#b0c2b8]">
                        {description}
                    </p>
                    <div className="mt-8 text-left">{children}</div>
                </div>
            </div>
        </div>
    );
}
