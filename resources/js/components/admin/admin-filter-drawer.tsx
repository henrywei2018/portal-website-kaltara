import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { type ReactNode } from 'react';

type AdminFilterDrawerProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    children: ReactNode;
};

export function AdminFilterDrawer({
    open,
    onOpenChange,
    title = 'Filter',
    children,
}: AdminFilterDrawerProps) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="w-full max-w-md p-0 sm:max-w-lg">
                <SheetHeader className="border-b border-black/5 px-6 py-5 dark:border-white/10">
                    <SheetTitle className="text-lg font-semibold text-[#123726] dark:text-white">
                        {title}
                    </SheetTitle>
                </SheetHeader>
                <div className="px-6 py-6">{children}</div>
            </SheetContent>
        </Sheet>
    );
}
