import Heading from '@/components/layout/heading';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/ui/pagination';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { confirmDialog } from '@/lib/toast';
import { BreadcrumbItem, PaginationLink, User } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ShieldCheck, ShieldX, Trash } from 'lucide-react';
import React from 'react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];

interface PaginatedData<T> {
    data: T[];
    links: PaginationLink[];
}

interface UsersProps {
    users: PaginatedData<User>;
    title: string;
}

const Users: React.FC<UsersProps> = ({ users, title }) => {
    const onConfirm = async (url: string) => {
        const confirmed = await confirmDialog();
        if (confirmed) router.get(url);
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="space-y-6 px-4 py-6">
                <Heading title={title} description="" />

                <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                    <table className="min-w-full divide-y divide-gray-200 text-sm dark:divide-gray-700">
                        <thead className="bg-gray-100 dark:bg-black/90">
                            <tr>
                                <th className="p-2 text-left font-medium">Name</th>
                                <th className="p-2 text-left font-medium">Email</th>
                                <th className="p-2 text-left font-medium">Created At</th>
                                <th className="p-2 text-right font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {users?.data.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <td className="p-2">{user.name}</td>
                                    <td className="p-2">{user.email}</td>
                                    <td className="p-2">{user.created_at}</td>
                                    <td className="flex flex-col justify-end gap-2 p-2 sm:flex-row">
                                        {user.role === 'guide' && (
                                            <a target="_blank" href={`/guide/${user.id}`}>
                                                <Button variant="ghost" size="sm" className="w-full sm:w-auto">
                                                    View
                                                </Button>
                                            </a>
                                        )}
                                        {user.status === 'pending' && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onConfirm(`/admin/users/${user.id}/status?status=active&verified=1`)}
                                                className="flex w-full items-center gap-1 sm:w-auto"
                                            >
                                                <ShieldCheck size={16} /> Approve & Verified
                                            </Button>
                                        )}
                                        {user.status === 'pending' && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onConfirm(`/admin/users/${user.id}/status?status=active`)}
                                                className="flex w-full items-center gap-1 sm:w-auto"
                                            >
                                                <ShieldCheck size={16} /> Approve
                                            </Button>
                                        )}
                                        {user.status === 'blocked' && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onConfirm(`/admin/users/${user.id}/status?status=active`)}
                                                className="flex w-full items-center gap-1 sm:w-auto"
                                            >
                                                <ShieldCheck size={16} /> Activate
                                            </Button>
                                        )}
                                        {(user.status === 'active' || user.status === 'pending') && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onConfirm(`/admin/users/${user.id}/status?status=blocked`)}
                                                className="flex w-full items-center gap-1 sm:w-auto"
                                            >
                                                <ShieldX size={16} /> Block
                                            </Button>
                                        )}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onConfirm(`/admin/users/${user.id}/delete`)}
                                            className="flex w-full items-center gap-1 text-red-400 sm:w-auto"
                                        >
                                            <Trash size={16} /> Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Pagination links={users?.links} />
            </div>
        </AppSidebarLayout>
    );
};

export default Users;
