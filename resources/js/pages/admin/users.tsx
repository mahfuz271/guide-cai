import Heading from '@/components/layout/heading';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/ui/pagination';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { confirmDialog } from '@/lib/toast';
import { BreadcrumbItem, PaginationLink, User } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ShieldCheck, ShieldX, Trash } from 'lucide-react';
import React from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

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
        if (confirmed) {
            router.get(url);
            return;
        }
        return false;
    };
    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="px-4 py-6">
                <Heading title={title} description={''} />

                <table className="mt-4 w-full text-sm">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-black/90">
                            <th className="p-2 text-left">Name</th>
                            <th className="p-2 text-left">Email</th>
                            <th className="p-2 text-left">Created At</th>
                            <th className="p-2 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.data.map((user) => (
                            <tr key={user.id} className="border-t">
                                <td className="p-2">{user.name}</td>
                                <td className="p-2">{user.email}</td>
                                <td className="p-2">{user.created_at}</td>
                                <td className="flex gap-2 text-right">
                                    {user.role == 'guide' && (
                                        <a target="_blank" className="flex-1" href={`/guide/${user.id}`}>
                                            <Button variant="ghost" size="sm" className="w-full cursor-pointer">
                                                View
                                            </Button>
                                        </a>
                                    )}
                                    {user.status === 'pending' && (
                                        <a className="flex-1" onClick={() => onConfirm(`/admin/users/${user.id}/status?status=active`)}>
                                            <Button variant="default" size="sm" className="w-full cursor-pointer">
                                                <ShieldCheck size={16} className="mr-1" />
                                                Approve
                                            </Button>
                                        </a>
                                    )}

                                    {(user.status === 'active' || user.status === 'pending') && (
                                        <a className="flex-1" onClick={() => onConfirm(`/admin/users/${user.id}/status?status=blocked`)}>
                                            <Button variant="ghost" size="sm" className="w-full cursor-pointer">
                                                <ShieldX size={16} className="mr-1" />
                                                Block
                                            </Button>
                                        </a>
                                    )}

                                    {user.status === 'blocked' && (
                                        <a className="flex-1" onClick={() => onConfirm(`/admin/users/${user.id}/status?status=active`)}>
                                            <Button variant="default" size="sm" className="w-full cursor-pointer">
                                                <ShieldCheck size={16} className="mr-1" />
                                                Activate
                                            </Button>
                                        </a>
                                    )}

                                    <a className="flex-1" onClick={() => onConfirm(`/admin/users/${user.id}/delete`)}>
                                        <Button variant="ghost" size="sm" className="w-full cursor-pointer text-red-400">
                                            <Trash size={16} className="mr-1" />
                                            Delete
                                        </Button>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="my-4">
                    <Pagination links={users?.links} />
                </div>
            </div>
        </AppSidebarLayout>
    );
};

export default Users;
