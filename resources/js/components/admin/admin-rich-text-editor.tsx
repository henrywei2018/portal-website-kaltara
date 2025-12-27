import { type FormEvent, useEffect, useRef } from 'react';

type AdminRichTextEditorProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    description?: string;
};

const toolbarButtons = [
    { label: 'B', command: 'bold' },
    { label: 'I', command: 'italic' },
    { label: 'U', command: 'underline' },
    { label: '•', command: 'insertUnorderedList' },
    { label: '1.', command: 'insertOrderedList' },
];

export function AdminRichTextEditor({
    label,
    value,
    onChange,
    description,
}: AdminRichTextEditorProps) {
    const editorRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!editorRef.current) {
            return;
        }

        if (editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value;
        }
    }, [value]);

    const handleInput = () => {
        onChange(editorRef.current?.innerHTML ?? '');
    };

    const handleCommand = (command: string) => (event: FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        document.execCommand(command, false);
        editorRef.current?.focus();
        handleInput();
    };

    return (
        <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#567365]">
                {label}
            </label>
            {description ? (
                <p className="mt-2 text-xs text-[#587166] dark:text-[#b0c2b8]">
                    {description}
                </p>
            ) : null}
            <div className="mt-3 rounded-2xl border border-black/10 bg-white/80 p-3 dark:border-white/10 dark:bg-white/5">
                <div className="flex flex-wrap gap-2">
                    {toolbarButtons.map((button) => (
                        <button
                            key={button.command}
                            type="button"
                            onMouseDown={handleCommand(button.command)}
                            className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-[#123726] transition hover:border-black/20 dark:border-white/20 dark:text-white"
                        >
                            {button.label}
                        </button>
                    ))}
                </div>
                <div
                    ref={editorRef}
                    role="textbox"
                    contentEditable
                    onInput={handleInput}
                    suppressContentEditableWarning
                    className="mt-3 min-h-[120px] rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#123726] focus:outline-none focus:ring-2 focus:ring-[#0f6b4f]/30 dark:border-white/10 dark:bg-[#0b2d1d] dark:text-white"
                />
            </div>
        </div>
    );
}
