import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-9 items-center justify-center rounded-xl bg-[#0f6b4f] text-white shadow-[0_10px_24px_rgba(15,107,79,0.25)]">
                <AppLogoIcon className="size-5 fill-current text-white" />
            </div>
            <div className="ml-2 grid flex-1 text-left">
                <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[#567365]">
                    Portal Informasi
                </span>
                <span className="truncate font-['Unbounded'] text-sm text-[#0b2d1d] dark:text-white">
                    Kaltara
                </span>
            </div>
        </>
    );
}
