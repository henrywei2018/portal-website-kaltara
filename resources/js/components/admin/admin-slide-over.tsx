import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { type ReactNode } from 'react';

type AdminSlideOverProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description?: string;
    children: ReactNode;
};

export function AdminSlideOver({
    open,
    onOpenChange,
    title,
    description,
    children,
}: AdminSlideOverProps) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="w-full max-w-xl p-0 sm:max-w-2xl">
                <SheetHeader className="border-b border-black/5 px-6 py-5 dark:border-white/10">
                    <SheetTitle className="text-lg font-semibold text-[#123726] dark:text-white">
                        {title}
                    </SheetTitle>
                    {description ? (
                        <SheetDescription className="text-sm text-[#587166] dark:text-[#b0c2b8]">
                            {description}
                        </SheetDescription>
                    ) : null}
                </SheetHeader>
                <div className="px-6 py-6">{children}</div>
            </SheetContent>
        </Sheet>
    );
}
