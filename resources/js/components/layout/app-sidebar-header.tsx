import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { SharedData, type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { usePage } from '@inertiajs/react';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    return (
        <>
            <header className="border-sidebar-border/50 group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-16 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear md:px-4">
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="-ml-1" />
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
            </header>
            {auth.user && auth.user.status == 'pending' && (
                <div className="mb-2 rounded border border-yellow-400 bg-yellow-50 px-4 py-3 text-center text-yellow-700">
                    Your account is currently under review. We will notify you once it is approved.
                </div>
            )}
        </>
    );
}
