import { NavFooter } from '@/components/layout/nav-footer';
import { NavMain } from '@/components/layout/nav-main';
import { NavUser } from '@/components/layout/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { CalendarCheck, Clock, LayoutGrid, Map, Settings, UserCheck, Users } from 'lucide-react';
import AppLogo from './app-logo';

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    const page = usePage<SharedData>();
    const user = page.props.auth.user;

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },
    ];
    if (user?.role === 'admin') {
        mainNavItems.push(
            {
                title: 'Bookings',
                href: '/bookings',
                icon: CalendarCheck,
            },
            {
                title: 'User Approvals',
                href: '/admin/approvals',
                icon: UserCheck,
            },
            {
                title: 'Manage Guides',
                href: '/admin/guides',
                icon: Users,
            },
            {
                title: 'Manage Users',
                href: '/admin/users',
                icon: Users,
            },
            {
                title: 'Manage Admins',
                href: '/admin/admin-users',
                icon: Users,
            },
            {
                title: 'Marketplace Settings',
                href: '/admin/settings',
                icon: Settings,
            },
        );
    }

    if (user?.role === 'guide') {
        mainNavItems.push(
            {
                title: 'My Listings',
                href: '/guide/listings',
                icon: Map,
            },
            {
                title: 'My Bookings',
                href: '/bookings',
                icon: CalendarCheck,
            },
            {
                title: 'Availability',
                href: '/guide/availability',
                icon: Clock,
            },
        );
    }

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
