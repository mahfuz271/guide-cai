import { Head, router } from '@inertiajs/react';
import { BookOpen, ChevronDown, ChevronUp, Filter, Languages, MapPin, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

import GuideCard from '@/components/guide/GuideCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Pagination from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { LANGUAGE_OPTIONS, SPECIALTY_OPTIONS } from '@/constants/guide-options';
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
    const [initiated, setInitiated] = useState(false);
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [priceRange, setPriceRange] = useState([filters.min_rate || 0, filters.max_rate || 500]);
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
                    min_rate: priceRange[0] !== 0 ? priceRange[0] : undefined,
                    max_rate: priceRange[1] !== 500 ? priceRange[1] : undefined,
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
        setPriceRange([0, 500]);
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
                                    <Slider value={priceRange} onValueChange={setPriceRange} max={500} min={10} step={5} />
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
                                <GuideCard key={guide.id} guide={guide} />
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
