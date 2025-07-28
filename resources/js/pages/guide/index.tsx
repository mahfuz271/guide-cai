
import { Head, Link } from '@inertiajs/react';
import { BookOpen, Map, Search, Train, Utensils } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppHeaderLayout from '@/layouts/app/app-header-layout';

const Guides = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const guideCategories = [
        { id: 'cultural', name: 'Cultural', icon: BookOpen },
        { id: 'transport', name: 'Transport', icon: Train },
        { id: 'dining', name: 'Dining', icon: Utensils },
        { id: 'navigation', name: 'Navigation', icon: Map },
    ];

    const guides = {
        cultural: [
            {
                name: 'Yuki Tanaka',
                title: 'Cultural Heritage Expert',
                location: 'Tokyo, Japan',
                rating: 4.9,
                reviews: 284,
                price: '$45/hour',
                languages: ['Japanese', 'English', 'Mandarin'],
                avatar: '/placeholder.svg',
                specialties: ['Temples', 'Tea Ceremony', 'Traditional Arts'],
                popular: true,
            },
            {
                name: 'Hiroshi Matsumoto',
                title: 'Zen Master & Guide',
                location: 'Kyoto, Japan',
                rating: 4.8,
                reviews: 156,
                price: '$60/hour',
                languages: ['Japanese', 'English'],
                avatar: '/placeholder.svg',
                specialties: ['Meditation', 'Gardens', 'Philosophy'],
                popular: false,
            },
        ],
        transport: [
            {
                name: 'Maria Santos',
                title: 'Metro Navigation Expert',
                location: 'Tokyo, Japan',
                rating: 4.7,
                reviews: 321,
                price: '$35/hour',
                languages: ['Japanese', 'English', 'Spanish'],
                avatar: '/placeholder.svg',
                specialties: ['Subway Systems', 'Local Transport', 'Rush Hour Tips'],
                popular: true,
            },
            {
                name: 'Kenji Watanabe',
                title: 'JR Pass Specialist',
                location: 'Osaka, Japan',
                rating: 4.9,
                reviews: 198,
                price: '$50/hour',
                languages: ['Japanese', 'English', 'Korean'],
                avatar: '/placeholder.svg',
                specialties: ['Train Travel', 'Route Planning', 'Cost Optimization'],
                popular: true,
            },
        ],
        dining: [
            {
                name: 'Akiko Yamamoto',
                title: 'Street Food Explorer',
                location: 'Shibuya, Tokyo',
                rating: 4.8,
                reviews: 267,
                price: '$40/hour',
                languages: ['Japanese', 'English'],
                avatar: '/placeholder.svg',
                specialties: ['Local Cuisine', 'Hidden Gems', 'Food Markets'],
                popular: false,
            },
            {
                name: 'Takeshi Kobayashi',
                title: 'Fine Dining Concierge',
                location: 'Ginza, Tokyo',
                rating: 4.9,
                reviews: 143,
                price: '$75/hour',
                languages: ['Japanese', 'English', 'French'],
                avatar: '/placeholder.svg',
                specialties: ['Michelin Restaurants', 'Omakase', 'Wine Pairing'],
                popular: true,
            },
        ],
        navigation: [
            {
                name: 'Sarah Kim',
                title: 'Digital Navigation Guide',
                location: 'Tokyo, Japan',
                rating: 4.6,
                reviews: 89,
                price: '$30/hour',
                languages: ['Japanese', 'English', 'Korean'],
                avatar: '/placeholder.svg',
                specialties: ['Tech Setup', 'Apps', 'Offline Maps'],
                popular: false,
            },
            {
                name: 'Ryo Nakamura',
                title: 'Emergency Response Guide',
                location: 'Tokyo, Japan',
                rating: 4.9,
                reviews: 76,
                price: '$55/hour',
                languages: ['Japanese', 'English'],
                avatar: '/placeholder.svg',
                specialties: ['Safety', 'Medical Assistance', 'Crisis Management'],
                popular: true,
            },
        ],
    };

    return (
        <AppHeaderLayout maxWidth>
            <Head title="Explore Guides" />
            <div className="px-4 py-8">
                <div className="mb-8 text-center">
                    <h1 className="from-foreground to-primary mb-4 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                        Explore Local Experts
                    </h1>
                    <p className="text-muted-foreground mx-auto mb-6 max-w-2xl text-lg">
                        Connect with trusted guides offering authentic, personalized experiences across Japan.
                    </p>
                    <div className="relative mx-auto max-w-md">
                        <Input placeholder="Search guides..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
                        <Search className="text-muted-foreground absolute left-3 top-3 h-4 w-4" />
                    </div>
                </div>

                <Tabs defaultValue="cultural" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4">
                        {guideCategories.map((category) => {
                            const Icon = category.icon;
                            return (
                                <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                                    <Icon className="h-4 w-4" />
                                    {category.name}
                                </TabsTrigger>
                            );
                        })}
                    </TabsList>

                    {guideCategories.map((category) => (
                        <TabsContent key={category.id} value={category.id}>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {guides[category.id as keyof typeof guides].map((guide, index) => (
                                    <Card
                                        key={index}
                                        className="border-primary/10 hover:border-primary/30 hover:shadow-elegant group relative cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1"
                                    >
                                        <div className="from-primary/5 absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                        <CardHeader className="relative">
                                            <div className="mb-3 flex items-start gap-4">
                                                <div className="from-primary/20 to-primary/5 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br">
                                                    <div className="bg-primary/10 h-10 w-10 rounded-full"></div>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="mb-2 flex items-start justify-between">
                                                        <CardTitle className="group-hover:text-primary text-lg leading-tight transition-colors">
                                                            {guide.name}
                                                        </CardTitle>
                                                        {guide.popular && (
                                                            <Badge className="bg-primary/10 text-primary border-primary/20">Popular</Badge>
                                                        )}
                                                    </div>
                                                    <p className="text-primary/80 text-sm font-medium">{guide.title}</p>
                                                    <p className="text-muted-foreground text-xs">{guide.location}</p>
                                                </div>
                                            </div>
                                            <div className="mb-3 flex items-center gap-4">
                                                <div className="flex items-center gap-1">
                                                    <span className="text-yellow-400">★</span>
                                                    <span className="text-sm font-medium">{guide.rating}</span>
                                                    <span className="text-muted-foreground text-xs">({guide.reviews} reviews)</span>
                                                </div>
                                                <div className="text-primary text-sm font-semibold">{guide.price}</div>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="relative">
                                            <div className="mb-4 flex items-center justify-between">
                                                <div className="flex flex-wrap gap-1">
                                                    {guide.languages.slice(0, 2).map((lang) => (
                                                        <Badge key={lang} variant="outline" className="border-primary/20 text-primary/80 text-xs">
                                                            {lang}
                                                        </Badge>
                                                    ))}
                                                    {guide.languages.length > 2 && (
                                                        <Badge variant="outline" className="border-primary/20 text-primary/80 text-xs">
                                                            +{guide.languages.length - 2}
                                                        </Badge>
                                                    )}
                                                </div>
                                                <Link href={`/guide/${index + 1}`}>
                                                    <Button
                                                        size="sm"
                                                        className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
                                                    >
                                                        View Profile
                                                    </Button>
                                                </Link>
                                            </div>
                                            <div className="flex flex-wrap gap-1.5">
                                                {guide.specialties.map((specialty) => (
                                                    <Badge
                                                        key={specialty}
                                                        variant="outline"
                                                        className="border-primary/20 text-primary/80 hover:bg-primary/10 text-xs"
                                                    >
                                                        {specialty}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </AppHeaderLayout>
    );
};

export default Guides;
