import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/settings/appearance-tabs';
import HeadingSmall from '@/components/layout/heading-small';
import { type BreadcrumbItem } from '@/types';

import AppHeaderLayout from '@/layouts/app/app-header-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Appearance settings',
        href: '/settings/appearance',
    },
];

export default function Appearance() {
    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs} maxWidth={true}>
            <Head title="Appearance settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </AppHeaderLayout>
    );
}
