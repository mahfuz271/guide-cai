import { Link } from '@inertiajs/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useInitials } from '@/hooks/use-initials';
import { User } from '@/types';

const GuideCard = ({ guide }: { guide: User }) => {
    const getInitials = useInitials();

    return (
        <Card className="border-primary/10 hover:border-primary/30 hover:shadow-elegant group relative cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1">
            <div className="from-primary/5 absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            <CardHeader className="relative">
                <div className="mb-3 flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={guide.avatar_url} alt={guide.name} />
                        <AvatarFallback className="bg-primary/10 h-10 w-10">{getInitials(guide.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <div className="mb-1 flex items-start justify-between">
                            <CardTitle className="group-hover:text-primary text-lg leading-tight transition-colors">{guide.name}</CardTitle>
                        </div>
                        <p className="text-muted-foreground text-xs">{guide.location}</p>
                    </div>
                </div>
                <div className="mb-3 flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium"> {guide?.avg_rating ? Number(guide.avg_rating).toFixed(1) : 0}</span>
                        <span className="text-muted-foreground text-xs">({guide?.total_reviews ?? 0} reviews)</span>
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
                            className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer transition-all duration-200"
                        >
                            View Profile
                        </Button>
                    </Link>
                </div>
                <div className="flex flex-wrap gap-1.5">
                    {guide.guide_profile?.specialties?.map((specialty) => (
                        <Badge key={specialty} variant="outline" className="border-primary/20 text-primary/80 hover:bg-primary/10 text-xs">
                            {specialty}
                        </Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default GuideCard;
