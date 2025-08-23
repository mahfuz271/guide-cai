import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Pagination from '@/components/ui/pagination';
import ReviewModal from '@/components/user/ReviewModal';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Booking, PaginationLink, SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { Calendar as CalendarIcon, Check, X } from 'lucide-react';
import { useState } from 'react';

interface PaginatedData<T> {
    data: T[];
    links: PaginationLink[];
}

type Props = {
    bookings: PaginatedData<Booking>;
};

const BookingsIndex: React.FC<Props> = ({ bookings }) => {
    const { auth } = usePage<SharedData>().props;
    const userRole = auth.user.role;
    const isUser = userRole === 'user';

    const [reviewOpen, setReviewOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<number | null>(null);

    const openReviewModal = (bookingId: number) => {
        setSelectedBooking(bookingId);
        setReviewOpen(true);
    };

    const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
        return isUser ? <AppHeaderLayout maxWidth>{children}</AppHeaderLayout> : <AppSidebarLayout>{children}</AppSidebarLayout>;
    };

    const getStatusBadge = (status: Booking['status'], isPaid: boolean) => {
        const baseClasses = 'px-2 py-1 text-xs';

        switch (status) {
            case 'confirmed':
                return <Badge className={`${baseClasses} bg-green-100 text-green-800`}>Confirmed</Badge>;
            case 'completed':
                return <Badge className={`${baseClasses} bg-blue-100 text-blue-800`}>Completed</Badge>;
            case 'cancelled':
                return <Badge className={`${baseClasses} bg-red-100 text-red-800`}>Cancelled</Badge>;
            default:
                return <Badge className={`${baseClasses} bg-yellow-100 text-yellow-800`}>Pending</Badge>;
        }
    };

    const title = userRole === 'guide' ? 'My Guided Tours' : userRole === 'user' ? 'My Bookings' : 'Bookings';

    return (
        <LayoutWrapper>
            <Head title={title} />
            <div className="px-4 py-8">
                <Card className="border-primary/10">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CalendarIcon className="text-primary h-5 w-5" />
                            {title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {bookings.data.length === 0 ? (
                                <div className="py-8 text-center">
                                    <p className="text-muted-foreground">
                                        {userRole === 'guide' ? 'You have no upcoming bookings' : 'You have no bookings yet'}
                                    </p>
                                    {userRole === 'user' && (
                                        <Button asChild className="mt-4">
                                            <Link href={route('guides.index')}>Find a Guide</Link>
                                        </Button>
                                    )}
                                </div>
                            ) : (
                                bookings.data.map((booking) => (
                                    <div key={booking.id} className="border-primary/10 rounded-lg border p-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage
                                                            src={userRole === 'guide' ? booking.user.avatar_url : booking.guide.avatar_url}
                                                            alt={userRole === 'guide' ? booking.user.name : booking.guide.name}
                                                        />
                                                        <AvatarFallback>
                                                            {userRole === 'guide'
                                                                ? booking.user.name.charAt(0).toUpperCase()
                                                                : booking.guide.name.charAt(0).toUpperCase()}
                                                        </AvatarFallback>
                                                    </Avatar>

                                                    <Link
                                                        href={userRole === 'guide' ? '' : route('guides.show', booking.guide.id)}
                                                        className="font-medium hover:underline"
                                                    >
                                                        {userRole === 'guide' ? booking.user.name : booking.guide.name}
                                                    </Link>
                                                    {getStatusBadge(booking.status, booking.is_paid)}
                                                    {booking.is_paid ? (
                                                        <Badge className="bg-green-100 px-2 py-1 text-xs text-green-800">Paid</Badge>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </div>
                                                <div className="text-muted-foreground mt-1 text-sm">
                                                    {dayjs(booking.date).format('DD/MM/YYYY')} • {booking.start_time} - {booking.end_time}
                                                </div>
                                                {booking.special_requests && (
                                                    <p className="mt-2 text-sm">
                                                        <span className="font-medium">Requests:</span> {booking.special_requests}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold">${booking.total_amount}</div>
                                                <div className="text-muted-foreground text-sm">
                                                    {booking.hours} {booking.hours === 1 ? 'hour' : 'hours'}
                                                </div>
                                            </div>
                                        </div>

                                        {userRole === 'user' && booking.status === 'completed' && !booking.review && (
                                            <div className="mt-3">
                                                <Button variant="outline" size="sm" onClick={() => openReviewModal(booking.id)}>
                                                    Leave Review
                                                </Button>
                                            </div>
                                        )}

                                        {booking.review && (
                                            <div className="text-muted-foreground mt-2 flex gap-1 border-t pt-2 text-sm">
                                                <p>
                                                    <span className="text-yellow-400">★</span> {booking.review.rating}/5
                                                </p>
                                                {booking.review.comment && <p>{booking.review.comment}</p>}
                                            </div>
                                        )}

                                        {userRole !== 'user' && booking.status !== 'cancelled' && (
                                            <div className="mt-4 flex gap-2">
                                                {booking.status == 'pending' && (
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link
                                                            method="post"
                                                            href={route('bookings.update-status', booking.id)}
                                                            data={{ status: 'confirmed' }}
                                                            preserveScroll
                                                        >
                                                            <Check className="mr-2 h-4 w-4" />
                                                            Mark Confirmed
                                                        </Link>
                                                    </Button>
                                                )}
                                                {booking.status !== 'completed' && booking.status != 'pending' && (
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link
                                                            method="post"
                                                            href={route('bookings.update-status', booking.id)}
                                                            data={{ status: 'completed' }}
                                                            preserveScroll
                                                        >
                                                            <Check className="mr-2 h-4 w-4" />
                                                            Mark Complete
                                                        </Link>
                                                    </Button>
                                                )}
                                                {!['completed', 'cancelled'].includes(booking.status as Booking['status']) && (
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link
                                                            method="post"
                                                            href={route('bookings.update-status', booking.id)}
                                                            data={{ status: 'cancelled' }}
                                                            preserveScroll
                                                        >
                                                            <X className="mr-2 h-4 w-4" />
                                                            Cancel
                                                        </Link>
                                                    </Button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="my-4">
                            <Pagination links={bookings?.links} />
                        </div>
                    </CardContent>
                </Card>
            </div>
            {/* Review Popup */}
            <ReviewModal open={reviewOpen} onClose={() => setReviewOpen(false)} bookingId={selectedBooking} />
        </LayoutWrapper>
    );
};

export default BookingsIndex;
