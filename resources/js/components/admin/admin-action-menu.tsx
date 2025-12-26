import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { type ReactNode } from 'react';

type ActionItem = {
    label: string;
    onSelect: () => void;
    tone?: 'default' | 'danger';
};

type AdminActionMenuProps = {
    items: ActionItem[];
    label?: string;
    trigger?: ReactNode;
};

export function AdminActionMenu({ items, label = 'Aksi', trigger }: AdminActionMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {trigger ?? (
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 text-[0.65rem] font-semibold text-[#123726] transition hover:border-black/20 dark:border-white/20 dark:text-white"
                    >
                        <MoreHorizontal className="size-4" />
                        {label}
                    </button>
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {items.map((item) => (
                    <DropdownMenuItem
                        key={item.label}
                        onClick={item.onSelect}
                        className={item.tone === 'danger' ? 'text-red-600' : undefined}
                    >
                        {item.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
