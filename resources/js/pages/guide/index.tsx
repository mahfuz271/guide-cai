import { Head, Link, router } from '@inertiajs/react';
import { BookOpen, ChevronDown, ChevronUp, Filter, Languages, MapPin, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Pagination from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { LANGUAGE_OPTIONS, SPECIALTY_OPTIONS } from '@/constants/guide-options';
import { useInitials } from '@/hooks/use-initials';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { PaginationLink, User } from '@/types';

interface GuideProps {
    guides: {
        data: User[];
        total: number;
        links: PaginationLink[];
    };
    locations: string[];
    filters: {
        search?: string;
        location?: string;
        language?: string;
        specialty?: string;
        min_rate?: number;
        max_rate?: number;
    };
}

export default function Guides({ guides, locations, filters }: GuideProps) {
    const getInitials = useInitials();
    const [initiated, setInitiated] = useState(false);
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [priceRange, setPriceRange] = useState([filters.min_rate || 20, filters.max_rate || 100]);
    const [selectedLocation, setSelectedLocation] = useState(filters.location || 'all');
    const [selectedLanguage, setSelectedLanguage] = useState(filters.language || 'any');
    const [selectedSpecialty, setSelectedSpecialty] = useState(filters.specialty || 'any');
    const [showFilters, setShowFilters] = useState(false);

    const applyFilters = () => {
        if (initiated) {
            router.get(
                '/guides',
                {
                    search: searchTerm || undefined,
                    location: selectedLocation !== 'all' ? selectedLocation : undefined,
                    language: selectedLanguage !== 'any' ? selectedLanguage : undefined,
                    specialty: selectedSpecialty !== 'any' ? selectedSpecialty : undefined,
                    min_rate: priceRange[0] !== 20 ? priceRange[0] : undefined,
                    max_rate: priceRange[1] !== 100 ? priceRange[1] : undefined,
                    page: undefined,
                },
                {
                    preserveState: true,
                    replace: true,
                },
            );
        }
    };

    useEffect(() => {
        setInitiated(true);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            applyFilters();
        }, 400);
        return () => clearTimeout(timeout);
    }, [searchTerm]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            applyFilters();
        }, 200);
        return () => clearTimeout(timeout);
    }, [selectedLocation, selectedLanguage, selectedSpecialty, priceRange]);

    const clearFilters = () => {
        setSelectedLocation('all');
        setSelectedLanguage('any');
        setSelectedSpecialty('any');
        setPriceRange([20, 100]);
        setSearchTerm('');
    };

    return (
        <AppHeaderLayout maxWidth>
            <Head title="Explore Guides" />

            <div className="px-4 py-8">
                <div className="mb-8 text-center">
                    <h1 className="from-foreground to-primary mb-4 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                        Local Travel Guides
                    </h1>
                    <p className="text-muted-foreground mx-auto mb-6 max-w-2xl text-lg">
                        Connect with verified local guides who bring destinations to life with insider knowledge and personalized experiences
                    </p>
                </div>
                {/* Search */}
                <div className="relative mx-auto mb-4 max-w-md">
                    <Input
                        placeholder="Search guides..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
                        className="pl-10"
                    />
                    <Search className="text-muted-foreground absolute left-3 top-3 h-4 w-4" />
                </div>

                {/* Filter toggle */}
                <div className="mb-4 flex justify-center">
                    <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
                        <Filter className="mr-2 h-4 w-4" />
                        Filters
                        {showFilters ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                    </Button>
                </div>

                {showFilters && (
                    <Card className="border-primary/20 mb-6">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Filter className="text-primary h-4 w-4" />
                                    <span className="text-primary font-medium">Filter Options</span>
                                </div>
                                <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                                    <ChevronUp className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                {/* Hourly Rate */}
                                <div className="space-y-3">
                                    <label className="block text-sm font-medium">Hourly Rate</label>
                                    <Slider value={priceRange} onValueChange={setPriceRange} max={100} min={20} step={5} />
                                    <div className="mt-1 flex justify-between text-xs">
                                        <span>${priceRange[0]}</span>
                                        <span>${priceRange[1]}</span>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-1 text-sm font-medium">
                                        <MapPin className="h-3 w-3" /> Location
                                    </label>
                                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="All locations" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All locations</SelectItem>
                                            {locations.map((loc) => (
                                                <SelectItem key={loc} value={loc}>
                                                    {loc}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Language */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-1 text-sm font-medium">
                                        <Languages className="h-3 w-3" /> Language
                                    </label>
                                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Any language" />
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
                                </div>

                                {/* Specialty */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-1 text-sm font-medium">
                                        <BookOpen className="h-3 w-3" /> Specialty
                                    </label>
                                    <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Any specialty" />
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
                                </div>
                            </div>
                            <Button variant="outline" onClick={clearFilters}>
                                Clear Filters
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
            {/* Results */}
            <div className="mb-12 px-4">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-foreground text-xl font-semibold">
                        {guides.total} Guide{guides.total !== 1 ? 's' : ''} Found
                    </h2>
                </div>

                {guides?.data?.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {guides.data.map((guide) => (
                                <Card
                                    key={guide.id}
                                    className="border-primary/10 hover:border-primary/30 hover:shadow-elegant group relative cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="from-primary/5 absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                    <CardHeader className="relative">
                                        <div className="mb-3 flex items-start gap-4">
                                            <Avatar className="h-12 w-12">
                                                <AvatarImage src={guide.avatar_url} alt={guide.name} />
                                                <AvatarFallback className="bg-primary/10 h-10 w-10">{getInitials(guide.name)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <div className="mb-1 flex items-start justify-between">
                                                    <CardTitle className="group-hover:text-primary text-lg leading-tight transition-colors">
                                                        {guide.name}
                                                    </CardTitle>
                                                </div>
                                                <p className="text-muted-foreground text-xs">{guide.location}</p>
                                            </div>
                                        </div>
                                        <div className="mb-3 flex items-center gap-4">
                                            <div className="flex items-center gap-1">
                                                <span className="text-yellow-400">★</span>
                                                <span className="text-sm font-medium">{guide.guide_profile?.rating ?? 0}</span>
                                                <span className="text-muted-foreground text-xs">
                                                    ({guide.guide_profile?.reviews_count ?? 0} reviews)
                                                </span>
                                            </div>
                                            <div className="text-primary text-sm font-semibold">${guide?.guide_profile?.hourly_rate}/hour</div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="relative">
                                        <div className="mb-4 flex items-center justify-between">
                                            <div className="flex flex-wrap gap-1">
                                                {guide.guide_profile?.languages?.slice(0, 2)?.map((lang) => (
                                                    <Badge key={lang} variant="outline" className="border-primary/20 text-primary/80 text-xs">
                                                        {lang}
                                                    </Badge>
                                                ))}
                                                {(guide?.guide_profile?.languages?.length ?? 0) > 2 && (
                                                    <Badge variant="outline" className="border-primary/20 text-primary/80 text-xs">
                                                        +{(guide?.guide_profile?.languages?.length ?? 0) - 2}
                                                    </Badge>
                                                )}
                                            </div>
                                            <Link href={`/guide/${guide.id}`}>
                                                <Button
                                                    size="sm"
                                                    className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
                                                >
                                                    View Profile
                                                </Button>
                                            </Link>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {guide.guide_profile?.specialties?.map((specialty) => (
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
                        <Pagination links={guides?.links} />
                    </>
                ) : (
                    <div className="py-12 text-center">
                        <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                            <Search className="text-primary/50 h-8 w-8" />
                        </div>
                        <h3 className="text-foreground mb-2 text-lg font-medium">No guides found</h3>
                        <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
                    </div>
                )}
            </div>
        </AppHeaderLayout>
    );
}
