import { Card, CardContent } from '@/components/ui/card';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { BookOpen, Clock, TrendingUp, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];

export default function Dashboard() {
    const { role, total_bookings, pending_bookings, completed_bookings, cancelled_bookings, total_users, all_guides, pending_guides } = usePage()
        .props as any;

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Always show bookings (guide or admin) */}
                    <Card>
                        <CardContent className="px-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-muted-foreground text-sm font-medium">Total Bookings</p>
                                    <p className="text-2xl font-bold">{total_bookings}</p>
                                </div>
                                <BookOpen className="text-primary h-8 w-8" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="px-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-muted-foreground text-sm font-medium">Pending Bookings</p>
                                    <p className="text-2xl font-bold">{pending_bookings}</p>
                                </div>
                                <Clock className="text-primary h-8 w-8" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="px-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-muted-foreground text-sm font-medium">Completed Bookings</p>
                                    <p className="text-2xl font-bold">{completed_bookings}</p>
                                </div>
                                <TrendingUp className="text-primary h-8 w-8" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="px-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-muted-foreground text-sm font-medium">Cancelled Bookings</p>
                                    <p className="text-2xl font-bold">{cancelled_bookings}</p>
                                </div>
                                <Clock className="h-8 w-8 text-red-500" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Only for admin */}
                    {role === 'admin' && (
                        <>
                            <Card>
                                <CardContent className="px-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-muted-foreground text-sm font-medium">Total Users</p>
                                            <p className="text-2xl font-bold">{total_users}</p>
                                        </div>
                                        <Users className="text-primary h-8 w-8" />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="px-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-muted-foreground text-sm font-medium">All Guides</p>
                                            <p className="text-2xl font-bold">{all_guides}</p>
                                        </div>
                                        <TrendingUp className="text-primary h-8 w-8" />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="px-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-muted-foreground text-sm font-medium">Pending Guides</p>
                                            <p className="text-2xl font-bold">{pending_guides}</p>
                                        </div>
                                        <Clock className="h-8 w-8 text-orange-600" />
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    )}
                </div>
            </div>
        </AppSidebarLayout>
    );
}
