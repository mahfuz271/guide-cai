import { Head, useForm, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { Award, Calendar as CalendarIcon, Clock, DollarSign, Languages, MapPin, MessageCircle, Star } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useInitials } from '@/hooks/use-initials';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { GuideAvailability, SharedData, User } from '@/types';

interface GuideProfileProps {
    guide: User;
    availabilities: GuideAvailability[];
}

interface Review {
    name: string;
    rating: number;
    date: string;
    comment: string;
}

interface Trip {
    title: string;
    duration: string;
    price: string;
    description: string;
    popular?: boolean;
}

const GuideProfile: React.FC<GuideProfileProps> = ({ guide, availabilities }) => {
    const { auth } = usePage<SharedData>().props;
    const isAdmin = auth.user && auth.user.role === 'admin';
    const getInitials = useInitials();

    const [localDate, setLocalDate] = useState<Date>(new Date());

    const { data, setData, post, processing, errors } = useForm({
        guide_id: guide.id,
        date: dayjs().format('YYYY-MM-DD'),
        start_time: '',
        hours: 2,
        special_requests: '',
    });

    const [availableTimes, setAvailableTimes] = useState<string[]>([]);

    const handleDateChange = (date: Date | undefined) => {
        if (!date) return;
        setLocalDate(date);
        setData('date', dayjs(date).format('YYYY-MM-DD'));
        setData('start_time', '');

        const dayOfWeek = dayjs(date).format('dddd').toLowerCase();

        const availability = availabilities.find((a) => a.day_of_week === dayOfWeek);

        if (availability) {
            const start = new Date(`1970-01-01T${availability.start_time}`);
            const end = new Date(`1970-01-01T${availability.end_time}`);

            const times: string[] = [];
            let current = new Date(start);

            while (current < end) {
                times.push(current.toTimeString().substring(0, 5));
                current.setHours(current.getHours() + 1);
            }

            setAvailableTimes(times);
        } else {
            setAvailableTimes([]);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('bookings.store'));
    };

    // Check guide status
    if (!guide) {
        return (
            <AppHeaderLayout maxWidth>
                <Head title="Guide Blocked" />
                <div className="p-8 text-center text-red-600">
                    <h1 className="text-2xl font-bold">Guide not found.</h1>
                </div>
            </AppHeaderLayout>
        );
    }

    if (!isAdmin && guide.status === 'blocked') {
        return (
            <AppHeaderLayout maxWidth>
                <Head title="Guide Blocked" />
                <div className="p-8 text-center text-red-600">
                    <h1 className="text-2xl font-bold">This guide is currently blocked.</h1>
                    <p>Please contact support for more information.</p>
                </div>
            </AppHeaderLayout>
        );
    }

    if (!isAdmin && guide.status === 'pending') {
        return (
            <AppHeaderLayout maxWidth>
                <Head title="Guide Pending Approval" />
                <div className="p-8 text-center text-yellow-600">
                    <h1 className="text-2xl font-bold">This guide's profile is pending approval.</h1>
                    <p>We are reviewing the profile and will update you soon.</p>
                </div>
            </AppHeaderLayout>
        );
    }

    const profile = guide.guide_profile || {};

    const reviews: Review[] = [
        {
            name: 'Sarah Johnson',
            rating: 5,
            date: '2 weeks ago',
            comment:
                'Yuki was absolutely amazing! She took us to hidden temples I never would have found on my own. Her knowledge of Japanese culture is incredible and she speaks perfect English. Highly recommend!',
        },
        {
            name: 'Marcus Weber',
            rating: 5,
            date: '1 month ago',
            comment:
                "Best guide experience I've ever had. Yuki customized our tour based on our interests and showed us authentic local spots. The tea ceremony was unforgettable!",
        },
        {
            name: 'Lisa Chen',
            rating: 4,
            date: '2 months ago',
            comment:
                'Great cultural insights and very professional. Yuki helped us understand the history behind every place we visited. Only wish the tour was longer!',
        },
    ];

    const trips: Trip[] = [
        {
            title: 'Traditional Tokyo Cultural Experience',
            duration: '4 hours',
            price: '$180',
            description: 'Explore ancient temples, participate in tea ceremony, and discover traditional crafts',
            popular: true,
        },
        {
            title: 'Hidden Temples & Gardens Tour',
            duration: '3 hours',
            price: '$135',
            description: 'Visit lesser-known temples and peaceful gardens away from crowds',
        },
        {
            title: 'Traditional Arts Workshop',
            duration: '2 hours',
            price: '$90',
            description: 'Learn calligraphy, origami, or traditional painting with local artisans',
        },
    ];

    return (
        <AppHeaderLayout maxWidth>
            <Head title={`Guide - ${guide.name}`} />
            {isAdmin && guide.status === 'pending' && (
                <div className="p-8 pb-0 text-center text-yellow-600">
                    <h1 className="text-2xl font-bold">This guide's profile is pending approval.</h1>
                </div>
            )}
            {isAdmin && guide.status === 'blocked' && (
                <div className="p-8 pb-0 text-center text-yellow-600">
                    <h1 className="text-2xl font-bold">This guide is currently blocked.</h1>
                </div>
            )}
            <div className="px-4 py-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="space-y-6 lg:col-span-2">
                        {/* Guide Header */}
                        <Card className="border-primary/10">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-6">
                                    <Avatar className="h-24 w-24">
                                        <AvatarImage src={guide.avatar_url} alt={guide.name} />
                                        <AvatarFallback className="from-primary/20 to-primary/5 bg-gradient-to-br text-2xl">
                                            {getInitials(guide.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="mb-3 flex items-start justify-between">
                                            <div>
                                                <div className="mb-1 flex items-center gap-2">
                                                    <h1 className="text-2xl font-bold">{guide.name}</h1>
                                                    {guide?.verified && (
                                                        <Badge className="bg-primary/10 text-primary border-primary/20">
                                                            <Award className="mr-1 h-3 w-3" />
                                                            Verified
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="text-primary text-lg font-medium">{profile.title}</p>
                                                <div className="text-muted-foreground flex items-center gap-1">
                                                    <MapPin className="h-4 w-4" />
                                                    <span>{guide.location}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                                            <div className="text-center">
                                                <div className="mb-1 flex items-center justify-center gap-1">
                                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                    <span className="font-semibold">{profile.rating ?? 0}</span>
                                                </div>
                                                <p className="text-muted-foreground text-xs">{profile.reviews_count ?? 0} reviews</p>
                                            </div>
                                            <div className="text-center">
                                                <div className="mb-1 font-semibold">{profile.total_guides ?? 0}</div>
                                                <p className="text-muted-foreground text-xs">tours completed</p>
                                            </div>
                                            <div className="text-center">
                                                <div className="mb-1 font-semibold">{profile.response_time ?? '-'}</div>
                                                <p className="text-muted-foreground text-xs">response time</p>
                                            </div>
                                            <div className="text-center">
                                                <div className="mb-1 font-semibold">{profile.booking_rate ?? 0}%</div>
                                                <p className="text-muted-foreground text-xs">booking rate</p>
                                            </div>
                                        </div>

                                        <div className="mb-4 flex flex-wrap gap-2">
                                            {(profile.languages ?? []).map((language: string) => (
                                                <Badge key={language} variant="outline" className="border-primary/20 text-primary/80">
                                                    <Languages className="mr-1 h-3 w-3" />
                                                    {language}
                                                </Badge>
                                            ))}
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {(profile.specialties ?? []).map((specialty: string) => (
                                                <Badge key={specialty} variant="outline" className="border-primary/20 text-primary/80">
                                                    {specialty}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Tabs defaultValue="about" className="space-y-6">
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="about">About</TabsTrigger>
                                <TabsTrigger value="trips">Trips</TabsTrigger>
                                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                                <TabsTrigger value="photos">Photos</TabsTrigger>
                            </TabsList>

                            <TabsContent value="about">
                                <Card className="border-primary/10">
                                    <CardHeader>
                                        <CardTitle>About {guide.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="trips">
                                <div className="space-y-4">
                                    {trips.map((trip, index) => (
                                        <Card key={index} className="border-primary/10">
                                            <CardContent className="p-6">
                                                <div className="mb-3 flex items-start justify-between">
                                                    <div>
                                                        <div className="mb-1 flex items-center gap-2">
                                                            <h3 className="text-lg font-semibold">{trip.title}</h3>
                                                            {trip.popular && (
                                                                <Badge className="bg-primary/10 text-primary border-primary/20">Popular</Badge>
                                                            )}
                                                        </div>
                                                        <div className="text-muted-foreground mb-2 flex items-center gap-4 text-sm">
                                                            <div className="flex items-center gap-1">
                                                                <Clock className="h-4 w-4" />
                                                                {trip.duration}
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <DollarSign className="h-4 w-4" />
                                                                {trip.price}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-muted-foreground mb-4">{trip.description}</p>
                                                <Button variant="outline">View Details</Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="reviews">
                                <div className="space-y-4">
                                    {reviews.map((review, index) => (
                                        <Card key={index} className="border-primary/10">
                                            <CardContent className="p-6">
                                                <div className="mb-3 flex items-start justify-between">
                                                    <div>
                                                        <h4 className="font-medium">{review.name}</h4>
                                                        <div className="flex items-center gap-1">
                                                            {[...Array(review.rating)].map((_, i) => (
                                                                <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                            ))}
                                                            <span className="text-muted-foreground ml-1 text-sm">{review.date}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-muted-foreground">{review.comment}</p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="photos">
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                                    {guide?.guide_profile?.photos?.map((photo: { full_path: string }, index: number) => (
                                        <div key={index} className="border-primary/20 aspect-square overflow-hidden rounded-lg border">
                                            <img src={photo.full_path} alt={`Guide photo ${index + 1}`} className="h-full w-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Booking Sidebar */}
                    <div className="space-y-6">
                        <Card className="border-primary/20 from-primary/5 bg-gradient-to-br to-transparent">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CalendarIcon className="text-primary h-5 w-5" /> Book {guide.name}
                                </CardTitle>
                                <div className="text-primary text-2xl font-bold">${profile.hourly_rate ?? 0}/hour</div>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={submit} className="space-y-4">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium">Select Date</label>
                                        <Calendar
                                            mode="single"
                                            selected={localDate}
                                            onSelect={handleDateChange}
                                            className="border-primary/20 rounded-md border"
                                            disabled={(date) => date < new Date()}
                                        />
                                        {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="start_time">Start Time</Label>
                                        <Select
                                            value={data.start_time}
                                            disabled={availableTimes.length == 0}
                                            onValueChange={(value) => setData('start_time', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder={availableTimes.length > 0 ? 'Select start time' : 'No Slot Available'} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {availableTimes.length > 0 &&
                                                    availableTimes.map((time) => (
                                                        <SelectItem key={time} value={time}>
                                                            {time}
                                                        </SelectItem>
                                                    ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.start_time && <p className="mt-1 text-sm text-red-500">{errors.start_time}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="hours">Duration (hours)</Label>
                                        <Input
                                            id="hours"
                                            type="number"
                                            min="1"
                                            max="8"
                                            disabled={availableTimes.length == 0}
                                            value={data.hours}
                                            onChange={(e) => setData('hours', parseInt(e.target.value))}
                                        />
                                        {errors.hours && <p className="mt-1 text-sm text-red-500">{errors.hours}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="special_requests">Special Requests</Label>
                                        <textarea
                                            disabled={availableTimes.length == 0}
                                            id="special_requests"
                                            className="border-primary/20 flex h-20 w-full rounded-md border px-3 py-2 text-sm"
                                            value={data.special_requests}
                                            onChange={(e) => setData('special_requests', e.target.value)}
                                        />
                                    </div>

                                    <div className="border-primary/20 mt-6 rounded-lg border p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <DollarSign className="h-5 w-5" />
                                                <span className="font-medium">Hourly Rate:</span>
                                            </div>
                                            <span>${guide.guide_profile?.hourly_rate}/hour</span>
                                        </div>
                                        <div className="mt-2 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-5 w-5" />
                                                <span className="font-medium">Total:</span>
                                            </div>
                                            <span className="text-lg font-bold">
                                                ${((guide.guide_profile?.hourly_rate ?? 0) * data.hours).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                    <Button
                                        disabled={processing || availableTimes.length == 0}
                                        className="from-primary to-primary/50 text-primary-foreground w-full bg-gradient-to-r"
                                    >
                                        Book Now
                                    </Button>

                                    {isAdmin && (
                                        <a href={`tel:${guide.phone}`}>
                                            <Button variant="outline" className="w-full cursor-pointer">
                                                <MessageCircle className="mr-2 h-4 w-4" />
                                                Contact Guide
                                            </Button>
                                        </a>
                                    )}
                                </form>
                            </CardContent>
                        </Card>

                        <Card className="border-primary/10">
                            <CardHeader>
                                <CardTitle className="text-lg">Safety & Trust</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="bg-primary mt-2 h-2 w-2 rounded-full"></div>
                                    <div>
                                        <h4 className="font-medium">Identity Verified</h4>
                                        <p className="text-muted-foreground text-sm">Government ID confirmed</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-primary mt-2 h-2 w-2 rounded-full"></div>
                                    <div>
                                        <h4 className="font-medium">Background Checked</h4>
                                        <p className="text-muted-foreground text-sm">Passed security screening</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-primary mt-2 h-2 w-2 rounded-full"></div>
                                    <div>
                                        <h4 className="font-medium">Local Expert</h4>
                                        <p className="text-muted-foreground text-sm">Native or long-term resident</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppHeaderLayout>
    );
};

export default GuideProfile;
