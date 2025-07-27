import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
    return (
        <>
            <div className="flex size-9 items-center justify-center rounded-md">
                <AppLogoIcon className="fill-current text-[var(--primary)] dark:text-white" />
            </div>
            <div className="grid flex-1 text-left text-xl items-center">
                <span className="truncate font-semibold leading-tight text-[var(--primary)] dark:text-white">{appName}</span>
            </div>
        </>
    );
}
