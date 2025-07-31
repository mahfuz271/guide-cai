import { AppContent } from '@/components/layout/app-content';
import { AppHeader } from '@/components/layout/app-header';
import { AppShell } from '@/components/layout/app-shell';
import { SharedData, type BreadcrumbItem } from '@/types';
import { toast } from '@/lib/toast';
import { usePage } from '@inertiajs/react';
import { useEffect, type PropsWithChildren } from 'react';

export default function AppHeaderLayout({
    children,
    breadcrumbs,
    maxWidth = false,
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[]; maxWidth?: boolean }>) {
    const { flash } = usePage<SharedData>().props;

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    return (
        <AppShell>
            <AppHeader breadcrumbs={breadcrumbs} />
            <AppContent maxWidth={maxWidth}>{children}</AppContent>
        </AppShell>
    );
}
