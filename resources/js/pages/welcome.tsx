import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Clock, Compass, MapPin, Star, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '/',
    },
];

export default function Welcome() {
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
            icon: Compass,
            title: 'AI-Powered Planning',
            description: 'Get personalized recommendations based on your preferences and travel style',
        },
        {
            icon: Users,
            title: 'Local Insights',
            description: 'Access cultural tips and authentic experiences from local experts',
        },
        {
            icon: Clock,
            title: 'Smart Scheduling',
            description: 'Optimized itineraries that maximize your time and minimize travel stress',
        },
    ];

    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            <Head title="Welcome" />

            {/* Hero Section */}
            <section className="from-background via-primary/5 to-primary/10 relative overflow-hidden bg-gradient-to-br py-20 lg:py-32">
                <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5"></div>
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <div className="bg-primary/10 border-primary/20 text-primary mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm backdrop-blur-sm">
                            <span className="bg-primary h-2 w-2 animate-pulse rounded-full"></span>
                            AI-Powered Travel Intelligence
                        </div>
                        <h1 className="from-foreground via-primary to-foreground mb-6 bg-gradient-to-r bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-6xl lg:text-7xl">
                            Your Personal Travel Guide, Powered by AI
                        </h1>
                        <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg leading-relaxed md:text-xl">
                            Guide Cai understands your travel style and creates personalized itineraries with local insights, cultural tips, and
                            hidden gems you won't find anywhere else.
                        </p>
                        <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
                            <Link href="/trip-planner">
                                <Button
                                    size="lg"
                                    className="from-primary to-primary/60 text-primary-foreground shadow-elegant hover:shadow-glow transform bg-gradient-to-r transition-all duration-300 hover:-translate-y-1"
                                >
                                    Start Your Journey
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/explore">
                                <Button size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/50">
                                    Explore Destinations
                                </Button>
                            </Link>
                        </div>
                        <div className="mx-auto grid max-w-md grid-cols-3 gap-8 text-center">
                            <div>
                                <div className="text-primary text-2xl font-bold">50K+</div>
                                <div className="text-muted-foreground text-sm">Destinations</div>
                            </div>
                            <div>
                                <div className="text-primary text-2xl font-bold">1M+</div>
                                <div className="text-muted-foreground text-sm">Happy Travelers</div>
                            </div>
                            <div>
                                <div className="text-primary text-2xl font-bold">24/7</div>
                                <div className="text-muted-foreground text-sm">AI Support</div>
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
                            Travel Smarter with Guide Cai
                        </h2>
                        <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
                            Our AI doesn't just suggest destinations—it understands your travel DNA and crafts experiences that match your soul.
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

            {/* Featured Trips Section */}
            <section className="bg-background py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 flex items-end justify-between">
                        <div>
                            <h2 className="from-foreground to-primary mb-4 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                                AI-Curated Experiences
                            </h2>
                            <p className="text-muted-foreground max-w-2xl text-lg">
                                Every trip is crafted by our AI to match different travel personalities and interests
                            </p>
                        </div>
                        <Link href="/explore">
                            <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/50">
                                View All Trips
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
                                    <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 backdrop-blur-sm">
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

            {/* CTA Section */}
            <section className="from-primary/10 via-primary/5 to-background relative overflow-hidden bg-gradient-to-br py-20">
                <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5"></div>
                <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <div className="bg-primary/10 border-primary/20 text-primary mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm backdrop-blur-sm">
                        <span className="bg-primary h-2 w-2 animate-pulse rounded-full"></span>
                        Join the AI Travel Revolution
                    </div>
                    <h2 className="from-foreground to-primary mb-6 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
                        Your Next Adventure Awaits
                    </h2>
                    <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg">
                        Let Guide Cai's AI understand your travel dreams and transform them into unforgettable journeys tailored just for you.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Link href="/trip-planner">
                            <Button
                                size="lg"
                                className="from-primary to-primary/60 text-primary-foreground shadow-elegant hover:shadow-glow transform bg-gradient-to-r transition-all duration-300 hover:-translate-y-1"
                            >
                                Start Planning for Free
                            </Button>
                        </Link>
                        <Link href="/about">
                            <Button size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/50">
                                See How It Works
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </AppHeaderLayout>
    );
}
