import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Head } from '@inertiajs/react';
import { ChevronDown, ChevronUp, Filter, MapPin, Search, Star } from 'lucide-react';
import { useState } from 'react';

const Explore = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedRegion, setSelectedRegion] = useState('all');
    const [minRating, setMinRating] = useState('all');
    const [showFilters, setShowFilters] = useState(false);

    const topLocations = [
        {
            id: 1,
            name: 'Tokyo, Japan',
            image: '/placeholder.svg',
            rating: 4.8,
            reviews: 2847,
            description: 'Vibrant city blending tradition and modernity',
            tags: ['Cultural', 'Urban', 'Food'],
            region: 'Asia',
            category: 'Cultural',
        },
        {
            id: 2,
            name: 'Santorini, Greece',
            image: '/placeholder.svg',
            rating: 4.9,
            reviews: 1923,
            description: 'Stunning sunsets and whitewashed architecture',
            tags: ['Beach', 'Romantic', 'Photography'],
            region: 'Europe',
            category: 'Beach',
        },
        {
            id: 3,
            name: 'Machu Picchu, Peru',
            image: '/placeholder.svg',
            rating: 4.7,
            reviews: 1456,
            description: 'Ancient Incan citadel high in the Andes',
            tags: ['Adventure', 'History', 'Hiking'],
            region: 'South America',
            category: 'Adventure',
        },
        {
            id: 4,
            name: 'Bali, Indonesia',
            image: '/placeholder.svg',
            rating: 4.6,
            reviews: 3241,
            description: 'Tropical paradise with temples and beaches',
            tags: ['Beach', 'Spiritual', 'Nature'],
            region: 'Asia',
            category: 'Beach',
        },
        {
            id: 5,
            name: 'Paris, France',
            image: '/placeholder.svg',
            rating: 4.8,
            reviews: 4567,
            description: 'City of light and romance',
            tags: ['Cultural', 'Romantic', 'Art'],
            region: 'Europe',
            category: 'Cultural',
        },
        {
            id: 6,
            name: 'Patagonia, Chile',
            image: '/placeholder.svg',
            rating: 4.9,
            reviews: 987,
            description: 'Wild landscapes and pristine nature',
            tags: ['Adventure', 'Nature', 'Hiking'],
            region: 'South America',
            category: 'Adventure',
        },
    ];

    // Filter destinations based on search criteria
    const filteredLocations = topLocations.filter((location) => {
        const matchesSearch =
            location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            location.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            location.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesCategory = selectedCategory === 'all' || location.category === selectedCategory;
        const matchesRegion = selectedRegion === 'all' || location.region === selectedRegion;
        const matchesRating = minRating === 'all' || location.rating >= parseFloat(minRating);

        return matchesSearch && matchesCategory && matchesRegion && matchesRating;
    });

    // Get unique values for filter options
    const categories = [...new Set(topLocations.map((location) => location.category))];
    const regions = [...new Set(topLocations.map((location) => location.region))];

    return (
        <AppHeaderLayout maxWidth>
            <Head title="Explore Trips" />

            <div className="px-4 py-8">
                <div className="mb-8">
                    <div className="mb-8 text-center">
                        <h1 className="from-foreground to-primary mb-4 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                            Explore Destinations
                        </h1>
                        <p className="text-muted-foreground mx-auto mb-6 max-w-2xl text-lg">
                            Discover hidden gems and popular destinations curated by millions of traveler experiences and real-time insights
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="relative mx-auto max-w-md">
                            <Input
                                placeholder="Search destinations..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                            <Search className="text-muted-foreground absolute left-3 top-3 h-4 w-4" />
                        </div>

                        {/* Filter Toggle Button */}
                        <div className="flex justify-center">
                            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
                                <Filter className="h-4 w-4" />
                                Filters
                                {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </Button>
                        </div>

                        {/* Collapsible Filter Section */}
                        {showFilters && (
                            <Card className="border-primary/20">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Filter className="text-primary h-4 w-4" />
                                            <span className="text-primary font-medium">Filter Options</span>
                                        </div>
                                        <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)} className="h-8 w-8 p-0">
                                            <ChevronUp className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                        {/* Category Filter */}
                                        <div className="space-y-2">
                                            <label className="text-foreground text-sm font-medium">Category</label>
                                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="All categories" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All categories</SelectItem>
                                                    {categories.map((category) => (
                                                        <SelectItem key={category} value={category}>
                                                            {category}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* Region Filter */}
                                        <div className="space-y-2">
                                            <label className="text-foreground flex items-center gap-1 text-sm font-medium">
                                                <MapPin className="h-3 w-3" />
                                                Region
                                            </label>
                                            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="All regions" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All regions</SelectItem>
                                                    {regions.map((region) => (
                                                        <SelectItem key={region} value={region}>
                                                            {region}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* Rating Filter */}
                                        <div className="space-y-2">
                                            <label className="text-foreground flex items-center gap-1 text-sm font-medium">
                                                <Star className="h-3 w-3" />
                                                Minimum Rating
                                            </label>
                                            <Select value={minRating} onValueChange={setMinRating}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Any rating" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">Any rating</SelectItem>
                                                    <SelectItem value="4.5">4.5+ stars</SelectItem>
                                                    <SelectItem value="4.0">4.0+ stars</SelectItem>
                                                    <SelectItem value="3.5">3.5+ stars</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    {/* Clear Filters */}
                                    {(selectedCategory !== 'all' || selectedRegion !== 'all' || minRating !== 'all') && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setSelectedCategory('all');
                                                setSelectedRegion('all');
                                                setMinRating('all');
                                            }}
                                        >
                                            Clear Filters
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>

                {/* Results */}
                <div className="mb-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-foreground text-xl font-semibold">
                            {filteredLocations.length} Destination{filteredLocations.length !== 1 ? 's' : ''} Found
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredLocations.map((location) => (
                            <Card
                                key={location.id}
                                className="pt-0 border-primary/10 hover:border-primary/30 hover:shadow-elegant group relative cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className="from-primary/5 absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                <div className="from-primary/20 to-primary/5 relative aspect-video overflow-hidden bg-gradient-to-br">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                    <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 backdrop-blur-sm">
                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                        <span className="text-xs font-medium">{location.rating}</span>
                                    </div>
                                </div>
                                <CardHeader className="relative">
                                    <div className="flex items-start justify-between">
                                        <CardTitle className="group-hover:text-primary text-lg transition-colors">{location.name}</CardTitle>
                                    </div>
                                    <div className="text-muted-foreground flex items-center gap-1 text-sm">
                                        <span className="bg-primary/60 h-1.5 w-1.5 rounded-full"></span>
                                        <span>{location.reviews.toLocaleString()} reviews</span>
                                    </div>
                                </CardHeader>
                                <CardContent className="relative">
                                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{location.description}</p>
                                    <div className="mb-4 flex flex-wrap gap-1.5">
                                        {location.tags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 text-xs transition-colors"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline" className="border-primary/20 text-primary hover:bg-primary/10 flex-1">
                                            View Details
                                        </Button>
                                        <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1">
                                            Book Now
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {filteredLocations.length === 0 && (
                        <div className="py-12 text-center">
                            <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                                <Search className="text-primary/50 h-8 w-8" />
                            </div>
                            <h3 className="text-foreground mb-2 text-lg font-medium">No destinations found</h3>
                            <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
                        </div>
                    )}
                </div>
            </div>
        </AppHeaderLayout>
    );
};

export default Explore;
