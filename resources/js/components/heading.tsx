export default function Heading({
    title,
    description,
}: {
    title: string;
    description?: string;
}) {
    return (
        <div className="mb-8 space-y-2">
            <h2 className="font-['Unbounded'] text-2xl text-[#0b2d1d] dark:text-white">
                {title}
            </h2>
            {description && (
                <p className="text-sm text-[#587166] dark:text-[#b0c2b8]">
                    {description}
                </p>
            )}
        </div>
    );
}
