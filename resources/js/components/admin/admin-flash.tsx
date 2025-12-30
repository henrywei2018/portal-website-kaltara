import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

type FlashMessage = {
    tone: 'success' | 'error';
    message: string;
};

export default function AdminFlash() {
    const { flash } = usePage<SharedData>().props;
    const [current, setCurrent] = useState<FlashMessage | null>(null);

    useEffect(() => {
        if (flash?.success) {
            setCurrent({ tone: 'success', message: flash.success });
            return;
        }

        if (flash?.error) {
            setCurrent({ tone: 'error', message: flash.error });
            return;
        }

        setCurrent(null);
    }, [flash?.success, flash?.error]);

    useEffect(() => {
        if (!current) {
            return;
        }

        const timer = window.setTimeout(() => setCurrent(null), 4000);

        return () => window.clearTimeout(timer);
    }, [current]);

    if (!current) {
        return null;
    }

    const toneStyles =
        current.tone === 'success'
            ? 'border-emerald-200/80 bg-emerald-50 text-emerald-900'
            : 'border-red-200/80 bg-red-50 text-red-900';

    return (
        <div className="pointer-events-none fixed right-6 top-6 z-[80] w-[min(360px,calc(100vw-2rem))]">
            <div
                className={`pointer-events-auto flex items-start justify-between gap-3 rounded-2xl border px-4 py-3 text-sm shadow-[0_18px_40px_rgba(15,107,79,0.12)] ${toneStyles}`}
                role={current.tone === 'error' ? 'alert' : 'status'}
            >
                <span className="leading-relaxed">{current.message}</span>
                <button
                    type="button"
                    onClick={() => setCurrent(null)}
                    className="rounded-full border border-black/10 px-2 py-1 text-xs font-semibold text-inherit transition hover:brightness-95"
                >
                    Tutup
                </button>
            </div>
        </div>
    );
}
