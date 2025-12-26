import { type ReactNode } from 'react';

type AdminListProps = {
    title: string;
    description?: string;
    count?: number;
    children: ReactNode;
};

type AdminListItemProps = {
    title: string;
    subtitle?: string;
    meta?: string;
    actions?: ReactNode;
    children?: ReactNode;
};

export function AdminList({ title, description, count, children }: AdminListProps) {
    return (
        <section className="rounded-2xl border border-black/5 bg-white p-4 shadow-[0_12px_24px_rgba(15,107,79,0.08)] dark:border-white/10 dark:bg-white/5">
            <div className="flex flex-wrap items-center justify-between gap-3 px-2 py-4">
                <div>
                    <h2 className="text-lg font-semibold text-[#123726] dark:text-white">{title}</h2>
                    {description ? (
                        <p className="text-xs text-[#587166] dark:text-[#b0c2b8]">{description}</p>
                    ) : null}
                </div>
                {typeof count === 'number' ? (
                    <span className="rounded-full bg-[#e6f1ec] px-3 py-1 text-xs font-semibold text-[#0f6b4f] dark:bg-white/10 dark:text-white">
                        {count} Item
                    </span>
                ) : null}
            </div>
            <div className="divide-y divide-black/5 dark:divide-white/10">{children}</div>
        </section>
    );
}

export function AdminListItem({
    title,
    subtitle,
    meta,
    actions,
    children,
}: AdminListItemProps) {
    return (
        <div className="flex flex-wrap items-start justify-between gap-4 px-2 py-4">
            <div className="min-w-[200px] flex-1">
                <p className="text-sm font-semibold text-[#123726] dark:text-white">{title}</p>
                {subtitle ? (
                    <p className="text-xs text-[#587166] dark:text-[#b0c2b8]">{subtitle}</p>
                ) : null}
                {children ? <div className="mt-3 text-xs text-[#567365] dark:text-[#b0c2b8]">{children}</div> : null}
            </div>
            <div className="flex items-center gap-3">
                {meta ? (
                    <span className="rounded-full border border-black/10 px-3 py-1 text-[0.65rem] font-semibold text-[#123726] dark:border-white/20 dark:text-white">
                        {meta}
                    </span>
                ) : null}
                {actions}
            </div>
        </div>
    );
}
