import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { LANGUAGE_OPTIONS, SPECIALTY_OPTIONS } from '@/constants/guide-options';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Clock, Compass, Globe, Heart, MapPin, Search, Star, Users } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '/',
    },
];

interface WelcomeProps {
    locations: string[];
}

export default function Welcome({ locations }: WelcomeProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState([0]);
    const [location, setLocation] = useState('');
    const [language, setLanguage] = useState('');
    const [specialty, setSpecialty] = useState('');

    const featuredTrips = [
        {
            title: 'Tokyo Cultural Experience',
            location: 'Tokyo, Japan',
            duration: '7 days',
            rating: 4.9,
            price: '$1,299',
            image: '/placeholder.svg',
            tags: ['Cultural', 'Urban', 'Food'],
        },
        {
            title: 'European Adventure',
            location: 'Paris, Rome, Barcelona',
            duration: '14 days',
            rating: 4.8,
            price: '$2,599',
            image: '/placeholder.svg',
            tags: ['Multi-city', 'History', 'Art'],
        },
        {
            title: 'Bali Paradise Retreat',
            location: 'Bali, Indonesia',
            duration: '10 days',
            rating: 4.9,
            price: '$899',
            image: '/placeholder.svg',
            tags: ['Beach', 'Wellness', 'Nature'],
        },
    ];

    const features = [
        {
            icon: Users,
            title: 'Verified Local Guides',
            description: 'Connect with experienced and trusted guides from around the world.',
        },
        {
            icon: Compass,
            title: 'Unique Local Tours',
            description: 'Discover hidden gems and cultural experiences only locals know about.',
        },
        {
            icon: Clock,
            title: 'Flexible Scheduling',
            description: 'Book tours that fit your schedule—whether solo, group, or private.',
        },
    ];

    const howItWorksSteps = [
        {
            icon: Globe,
            title: 'Browse Guides',
            description: 'Explore guides and tours in your destination of choice.',
        },
        {
            icon: Heart,
            title: 'Pick a Tour',
            description: 'Select a tour based on your interest, time, and budget.',
        },
        {
            icon: ArrowRight,
            title: 'Book Instantly',
            description: 'Reserve your spot with secure payments and instant confirmation.',
        },
    ];

    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            <Head title="Explore Guided Tours with Experts" />

            {/* Hero Section */}
            <section className="from-background via-primary/5 to-primary/10 relative overflow-hidden bg-gradient-to-br py-16 lg:py-24">
                <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5"></div>
                <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <div className="bg-primary/10 border-primary/20 text-primary mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm backdrop-blur-sm">
                            <span className="bg-primary h-2 w-2 animate-pulse rounded-full"></span>
                            Real Experiences by Real People
                        </div>
                        <h1 className="from-foreground via-primary to-foreground mb-6 bg-gradient-to-r bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-5xl lg:text-6xl">
                            Connect with Expert Local Guides
                        </h1>
                        <p className="text-muted-foreground mx-auto mb-10 max-w-2xl text-lg leading-relaxed md:text-xl">
                            Discover authentic experiences with verified local guides who know the hidden gems, cultural insights, and best spots in
                            their cities.
                        </p>

                        {/* Guide Search Section */}
                        <div className="mx-auto mb-8 max-w-4xl">
                            <Card className="bg-card/90 border-primary/20 shadow-2xl backdrop-blur-lg">
                                <CardContent className="p-6">
                                    <div className="space-y-5">
                                        {/* Main Search Bar */}
                                        <div className="relative">
                                            <Search className="text-muted-foreground absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform" />
                                            <Input
                                                placeholder="Search guides by name, location, or specialty..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="bg-background/80 border-primary/30 focus:border-primary rounded-xl py-4 pl-12 pr-4 text-lg"
                                            />
                                        </div>

                                        {/* Quick Filters Row */}
                                        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                                            <Select value={location} onValueChange={setLocation}>
                                                <SelectTrigger className="bg-background/80 border-primary/30 rounded-lg">
                                                    <SelectValue placeholder="Location" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="any">Any location</SelectItem>
                                                    {locations.map((loc) => (
                                                        <SelectItem key={loc} value={loc}>
                                                            {loc}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>

                                            <Select value={specialty} onValueChange={setSpecialty}>
                                                <SelectTrigger className="bg-background/80 border-primary/30 rounded-lg">
                                                    <SelectValue placeholder="Specialty" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="any">Any specialty</SelectItem>
                                                    {SPECIALTY_OPTIONS.map((spec) => (
                                                        <SelectItem key={spec} value={spec}>
                                                            {spec}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>

                                            <Select value={language} onValueChange={setLanguage}>
                                                <SelectTrigger className="bg-background/80 border-primary/30 rounded-lg">
                                                    <SelectValue placeholder="Language" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="any">Any language</SelectItem>
                                                    {LANGUAGE_OPTIONS.map((lang) => (
                                                        <SelectItem key={lang} value={lang}>
                                                            {lang}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>

                                            <div className="space-y-2">
                                                <div className="text-muted-foreground text-center text-xs">Max Rate: ${priceRange[0]}/hr</div>
                                                <Slider value={priceRange} onValueChange={setPriceRange} max={200} step={10} className="w-full" />
                                            </div>
                                        </div>

                                        {/* Search Action */}
                                        <div className="flex flex-col justify-center gap-3 sm:flex-row">
                                            <Link
                                                href="/guides"
                                                data={{
                                                    location: location !== 'any' ? location || undefined : undefined,
                                                    search: searchTerm || undefined,
                                                    specialty: specialty !== 'any' ? specialty || undefined : undefined,
                                                    language: language !== 'any' ? language || undefined : undefined,
                                                    max_rate: priceRange[0] != 0 ? priceRange[0] : undefined,
                                                }}
                                                className="flex-1 sm:flex-initial"
                                            >
                                                <Button
                                                    size="lg"
                                                    className="from-primary to-primary/60 text-primary-foreground w-full rounded-lg bg-gradient-to-r shadow-lg transition-all duration-200 hover:shadow-xl"
                                                >
                                                    Search Guides
                                                    <Search className="ml-2 h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Guide Stats */}
                        <div className="mx-auto grid max-w-lg grid-cols-3 gap-6 text-center">
                            <div>
                                <div className="text-primary text-2xl font-bold">2,500+</div>
                                <div className="text-muted-foreground text-sm">Verified Guides</div>
                            </div>
                            <div>
                                <div className="text-primary text-2xl font-bold">150+</div>
                                <div className="text-muted-foreground text-sm">Cities</div>
                            </div>
                            <div>
                                <div className="text-primary text-2xl font-bold">4.9 ★</div>
                                <div className="text-muted-foreground text-sm">Avg Rating</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="from-background to-muted/30 bg-gradient-to-b py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-16 text-center">
                        <h2 className="from-foreground to-primary mb-6 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                            Why Choose Our Platform?
                        </h2>
                        <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
                            We make travel personal again. Discover, connect, and explore with passionate locals in every corner of the world.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <Card
                                    key={index}
                                    className="border-primary/10 hover:border-primary/30 hover:shadow-elegant group relative overflow-hidden transition-all duration-300 hover:-translate-y-2"
                                >
                                    <div className="from-primary/5 absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                    <CardContent className="relative p-8 text-center">
                                        <div className="from-primary/20 to-primary/10 mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br transition-transform duration-300 group-hover:scale-110">
                                            <Icon className="text-primary h-8 w-8" />
                                        </div>
                                        <h3 className="text-foreground mb-4 text-xl font-semibold">{feature.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="bg-background py-20">
                <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="from-foreground to-primary mb-6 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                        How It Works
                    </h2>
                    <p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-lg">
                        Planning your next adventure is easy. Just follow these simple steps to get started.
                    </p>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {howItWorksSteps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <Card key={index} className="hover:border-primary/30 hover:shadow-elegant group transition-all duration-300">
                                    <CardContent className="p-6 text-center">
                                        <div className="bg-primary/10 mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full">
                                            <Icon className="text-primary h-6 w-6" />
                                        </div>
                                        <h4 className="mb-2 text-xl font-semibold">{step.title}</h4>
                                        <p className="text-muted-foreground text-sm">{step.description}</p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Featured Trips */}
            <section className="bg-background py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 flex items-end justify-between">
                        <div>
                            <h2 className="from-foreground to-primary mb-4 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                                Featured Tours
                            </h2>
                            <p className="text-muted-foreground max-w-2xl text-lg">Handpicked guided experiences from across the globe.</p>
                        </div>
                        <Link href="/explore">
                            <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/50 cursor-pointer">
                                View All
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {featuredTrips.map((trip, index) => (
                            <Card
                                key={index}
                                className="border-primary/10 hover:border-primary/30 hover:shadow-elegant group cursor-pointer overflow-hidden py-0 transition-all duration-300"
                            >
                                <div className="from-primary/20 to-primary/5 relative aspect-video overflow-hidden bg-gradient-to-br">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                    <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 backdrop-blur-sm dark:bg-black/90">
                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                        <span className="text-xs font-medium">{trip.rating}</span>
                                    </div>
                                    <div className="absolute left-4 top-4">
                                        <Badge className="bg-primary/90 text-primary-foreground">{trip.duration}</Badge>
                                    </div>
                                </div>
                                <CardContent className="p-6">
                                    <h3 className="group-hover:text-primary mb-2 text-xl font-semibold transition-colors">{trip.title}</h3>
                                    <div className="text-muted-foreground mb-4 flex items-center gap-1 text-sm">
                                        <MapPin className="h-3 w-3" />
                                        {trip.location}
                                    </div>
                                    <div className="mb-4 flex items-center justify-between">
                                        <div>
                                            <span className="text-primary text-2xl font-bold">{trip.price}</span>
                                            <span className="text-muted-foreground ml-1 text-sm">per person</span>
                                        </div>
                                    </div>
                                    <div className="mb-4 flex flex-wrap gap-1.5">
                                        {trip.tags.map((tag) => (
                                            <Badge key={tag} className="bg-primary/10 text-primary border-primary/20 text-xs">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                    <Button className="bg-primary hover:bg-primary/90 w-full">Explore Trip</Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </AppHeaderLayout>
    );
}
