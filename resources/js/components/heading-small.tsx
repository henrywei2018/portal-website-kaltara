export default function HeadingSmall({
    title,
    description,
}: {
    title: string;
    description?: string;
}) {
    return (
        <header>
            <h3 className="mb-1 text-base font-semibold text-[#123726] dark:text-white">
                {title}
            </h3>
            {description && (
                <p className="text-sm text-[#587166] dark:text-[#b0c2b8]">
                    {description}
                </p>
            )}
        </header>
    );
}
