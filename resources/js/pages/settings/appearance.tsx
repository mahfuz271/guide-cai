import { Head, usePage } from '@inertiajs/react';

import HeadingSmall from '@/components/layout/heading-small';
import AppearanceTabs from '@/components/settings/appearance-tabs';
import { SharedData, type BreadcrumbItem } from '@/types';

import AppHeaderLayout from '@/layouts/app/app-header-layout';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Appearance settings',
        href: '/settings/appearance',
    },
];

export default function Appearance() {
    const { auth } = usePage<SharedData>().props;
    const isUser = auth.user.role === 'user';

    const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
        return isUser ? (
            <AppHeaderLayout breadcrumbs={breadcrumbs} maxWidth>
                {children}
            </AppHeaderLayout>
        ) : (
            <AppSidebarLayout>{children}</AppSidebarLayout>
        );
    };

    return (
        <LayoutWrapper>
            <Head title="Appearance settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </LayoutWrapper>
    );
}
