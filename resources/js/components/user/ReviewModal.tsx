import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/text-area';
import { router } from '@inertiajs/react';
import { Star } from 'lucide-react';
import { useState } from 'react';

const ReviewModal = ({ open, onClose, bookingId }: { open: boolean; onClose: () => void; bookingId: number | null }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = () => {
        router.post(
            route('bookings.review.store', { booking: bookingId }),
            {
                rating,
                comment,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setRating(0);
                    setComment('');
                    onClose();
                },
            },
        );
    };
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Leave a Review</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Rating Stars */}
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className={`h-6 w-6 cursor-pointer ${rating >= star ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`}
                                onClick={() => setRating(star)}
                            />
                        ))}
                    </div>

                    {/* Comment Input */}
                    <Textarea placeholder="Write your feedback..." value={comment} onChange={(e) => setComment(e.target.value)} />
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit}>Submit Review</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ReviewModal;
