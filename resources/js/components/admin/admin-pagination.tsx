import { Link } from '@inertiajs/react';

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PaginationMeta = {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
};

type AdminPaginationProps = {
    pagination: PaginationMeta & {
        links: PaginationLink[];
    };
};

const sanitizeLabel = (label: string) =>
    label
        .replace(/&laquo;|&raquo;/g, '')
        .replace(/&hellip;/g, '...')
        .replace(/<[^>]*>/g, '')
        .trim();

export function AdminPagination({ pagination }: AdminPaginationProps) {
    if (!pagination.links.length || pagination.total <= pagination.per_page) {
        return null;
    }

    return (
        <div className="mt-6 rounded-2xl border border-black/5 bg-white/80 px-4 py-4 shadow-[0_10px_20px_rgba(15,107,79,0.06)] dark:border-white/10 dark:bg-white/5">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#587166] dark:text-[#b0c2b8]">
                <span>
                    Menampilkan {pagination.from ?? 0}-{pagination.to ?? 0} dari {pagination.total}
                </span>
                <span>
                    Halaman {pagination.current_page} dari {pagination.last_page}
                </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
                {pagination.links.map((link) => {
                    const label = sanitizeLabel(link.label);
                    const baseClass =
                        'rounded-full px-3 py-1 text-xs font-semibold transition';

                    if (!link.url) {
                        return (
                            <span
                                key={link.label}
                                className={`${baseClass} border border-black/10 text-[#9aa9a1] dark:border-white/10 dark:text-[#5c6d65]`}
                            >
                                {label}
                            </span>
                        );
                    }

                    return (
                        <Link
                            key={link.label}
                            href={link.url}
                            preserveScroll
                            className={`${baseClass} ${
                                link.active
                                    ? 'bg-[#0f6b4f] text-white shadow-[0_6px_16px_rgba(15,107,79,0.2)]'
                                    : 'border border-black/10 text-[#123726] hover:border-black/20 dark:border-white/20 dark:text-white'
                            }`}
                        >
                            {label}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
