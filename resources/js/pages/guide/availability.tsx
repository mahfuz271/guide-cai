// resources/js/Pages/Guide/Availability.tsx
import { Head, useForm } from '@inertiajs/react';
import { Clock, Plus, Trash2 } from 'lucide-react';

import Heading from '@/components/layout/heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { confirmDialog } from '@/lib/toast';
import { GuideAvailability } from '@/types';

interface DayOption {
    value: string;
    label: string;
}

interface GuideAvailabilityProps {
    availabilities: GuideAvailability[];
}

const Availability = ({ availabilities }: GuideAvailabilityProps) => {
    const {
        data,
        setData,
        post,
        delete: destroy,
        reset,
    } = useForm({
        day_of_week: 'monday',
        start_time: '09:00',
        end_time: '17:00',
    });

    const days: DayOption[] = [
        { value: 'monday', label: 'Monday' },
        { value: 'tuesday', label: 'Tuesday' },
        { value: 'wednesday', label: 'Wednesday' },
        { value: 'thursday', label: 'Thursday' },
        { value: 'friday', label: 'Friday' },
        { value: 'saturday', label: 'Saturday' },
        { value: 'sunday', label: 'Sunday' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('guides.availability.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const onDelete = async (id: number) => {
        const confirmed = await confirmDialog();
        if (confirmed) {
            destroy(route('guides.availability.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppSidebarLayout>
            <Head title="Manage Availability" />
            <div className="px-4 py-6">
                <Heading title="Manage Your Availability" description={''} />
                <div className="space-y-6">
                    <form onSubmit={handleSubmit} className="border-primary/10 rounded-lg border p-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                            <div>
                                <Label htmlFor="day_of_week">Day of Week</Label>
                                <Select value={data.day_of_week} onValueChange={(value: string) => setData('day_of_week', value)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {days.map((day) => (
                                            <SelectItem key={day.value} value={day.value}>
                                                {day.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="start_time">Start Time</Label>
                                <Input type="time" value={data.start_time} onChange={(e) => setData('start_time', e.target.value)} />
                            </div>

                            <div>
                                <Label htmlFor="end_time">End Time</Label>
                                <Input type="time" value={data.end_time} onChange={(e) => setData('end_time', e.target.value)} />
                            </div>

                            <div className="flex items-end">
                                <Button type="submit" className="w-full">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Availability
                                </Button>
                            </div>
                        </div>
                    </form>

                    <div className="space-y-2">
                        <h3 className="font-medium">Current Availability</h3>
                        {availabilities.length === 0 ? (
                            <p className="text-muted-foreground text-sm">No availability set</p>
                        ) : (
                            <div className="border-primary/10 divide-primary/10 divide-y rounded-lg border">
                                {availabilities.map((availability) => (
                                    <div key={availability.id} className="flex items-center justify-between p-3">
                                        <div className="flex items-center gap-4">
                                            <div className="font-medium capitalize">{availability.day_of_week}</div>
                                            <div className="text-muted-foreground flex items-center gap-2 text-sm">
                                                <Clock className="h-4 w-4" />
                                                {availability.start_time} - {availability.end_time}
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm" onClick={() => onDelete(availability.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppSidebarLayout>
    );
};

export default Availability;
