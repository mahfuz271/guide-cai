import { AppContent } from '@/components/layout/app-content';
import { AppHeader } from '@/components/layout/app-header';
import { AppShell } from '@/components/layout/app-shell';
import { type BreadcrumbItem } from '@/types';
import type { PropsWithChildren } from 'react';

export default function AppHeaderLayout({
    children,
    breadcrumbs,
    maxWidth = false,
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[]; maxWidth?: boolean }>) {
    return (
        <AppShell>
            <AppHeader breadcrumbs={breadcrumbs} />
            <AppContent maxWidth={maxWidth}>{children}</AppContent>
        </AppShell>
    );
}
