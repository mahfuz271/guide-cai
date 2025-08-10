import { Head, useForm } from '@inertiajs/react';
import { Camera, DollarSign, LoaderCircle, User, X } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/layout/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/text-area';
import { LANGUAGE_OPTIONS, SPECIALTY_OPTIONS } from '@/constants/guide-options';
import AppHeaderLayout from '@/layouts/app/app-header-layout';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone: string;
    location: string;
    hourlyRate: string;
    bio: string;
    languages: string[];
    specialties: string[];
    experience: string;
    photos: File[];
};

export default function GuideRegister() {
    const [photoPreviews, setPhotoPreviews] = useState<string[]>(['', '', '', '']);

    const { data, setData, post, processing, errors, reset, transform } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        location: '',
        hourlyRate: '',
        bio: '',
        languages: [],
        specialties: [],
        experience: '',
        photos: [null, null, null, null] as unknown as File[],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('guide-register'), {
            onFinish: () => {
                reset('password', 'password_confirmation');
                setPhotoPreviews(['', '', '', '']);
            },
        });
    };

    const toggleCheckbox = (key: 'languages' | 'specialties', value: string, checked: boolean) => {
        const updated = checked ? [...data[key], value] : data[key].filter((item) => item !== value);
        setData(key, updated);
    };

    return (
        <AppHeaderLayout maxWidth={true}>
            <Head title="Guide Register" />
            <div className="px-4 py-8">
                <div className="mb-8 text-center">
                    <div className="bg-primary/10 border-primary/20 text-primary mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm backdrop-blur-sm">
                        <span className="bg-primary h-2 w-2 animate-pulse rounded-full"></span>
                        Join Our Guide Network
                    </div>
                    <h1 className="from-foreground to-primary mb-4 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                        Become a Local Guide
                    </h1>
                    <p className="text-muted-foreground mx-auto mb-6 max-w-2xl text-lg">
                        Share your local expertise and earn money by guiding travelers through your city
                    </p>
                </div>

                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <Card className="border-primary/10">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="text-primary h-5 w-5" /> Guide Registration
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-8">
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        {/* Full Name */}
                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input
                                                id="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                disabled={processing}
                                                required
                                                autoComplete="name"
                                            />
                                            <InputError message={errors.name} className="mt-2" />
                                        </div>

                                        {/* Email */}
                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                disabled={processing}
                                                required
                                                autoComplete="email"
                                            />
                                            <InputError message={errors.email} className="mt-2" />
                                        </div>

                                        {/* Password */}
                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="password">Password</Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                disabled={processing}
                                                required
                                            />
                                            <InputError message={errors.password} />
                                        </div>

                                        {/* Confirm Password */}
                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="password_confirmation">Confirm Password</Label>
                                            <Input
                                                id="password_confirmation"
                                                type="password"
                                                value={data.password_confirmation}
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                disabled={processing}
                                                required
                                            />
                                            <InputError message={errors.password_confirmation} />
                                        </div>

                                        {/* Phone */}
                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input
                                                id="phone"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                disabled={processing}
                                            />
                                            <InputError message={errors.phone} className="mt-2" />
                                        </div>

                                        {/* Location */}
                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="location">Location</Label>
                                            <Input
                                                id="location"
                                                value={data.location}
                                                onChange={(e) => setData('location', e.target.value)}
                                                disabled={processing}
                                            />
                                            <InputError message={errors.location} className="mt-2" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        {/* Hourly Rate */}
                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="hourlyRate">Hourly Rate (USD)</Label>
                                            <div className="relative">
                                                <DollarSign className="text-muted-foreground absolute left-3 top-2.5 h-4 w-4" />
                                                <Input
                                                    id="hourlyRate"
                                                    className="pl-10"
                                                    value={data.hourlyRate}
                                                    onChange={(e) => setData('hourlyRate', e.target.value)}
                                                    disabled={processing}
                                                    placeholder="50"
                                                    required
                                                />
                                            </div>
                                            <InputError message={errors.hourlyRate} className="mt-2" />
                                        </div>

                                        {/* Experience */}
                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="experience">Years of Experience</Label>
                                            <Select
                                                value={data.experience}
                                                onValueChange={(value) => setData('experience', value)}
                                                disabled={processing}
                                                required
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select experience" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1-2">1-2 years</SelectItem>
                                                    <SelectItem value="3-5">3-5 years</SelectItem>
                                                    <SelectItem value="6-10">6-10 years</SelectItem>
                                                    <SelectItem value="10+">10+ years</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <InputError message={errors.experience} className="mt-2" />
                                        </div>
                                    </div>

                                    {/* Bio */}
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="bio">About You</Label>
                                        <Textarea
                                            id="bio"
                                            value={data.bio}
                                            onChange={(e) => setData('bio', e.target.value)}
                                            disabled={processing}
                                            placeholder="Tell travelers about yourself..."
                                            className="min-h-[100px]"
                                            required
                                        />
                                        <InputError message={errors.bio} className="mt-2" />
                                    </div>

                                    {/* Languages Spoken */}
                                    <div className="flex flex-col gap-2">
                                        <Label>
                                            Languages Spoken <span className="text-red-500">*</span>
                                        </Label>
                                        <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-3">
                                            {LANGUAGE_OPTIONS.map((language) => (
                                                <div key={language} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={language}
                                                        checked={data.languages.includes(language)}
                                                        onCheckedChange={(checked) => toggleCheckbox('languages', language, !!checked)}
                                                    />
                                                    <Label htmlFor={language} className="text-sm">
                                                        {language}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                        <InputError message={errors.languages} className="mt-2" />
                                    </div>

                                    {/* Specialties */}
                                    <div className="flex flex-col gap-2">
                                        <Label>
                                            Specialties <span className="text-red-500">*</span>
                                        </Label>
                                        <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
                                            {SPECIALTY_OPTIONS.map((specialty) => (
                                                <div key={specialty} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={specialty}
                                                        checked={data.specialties.includes(specialty)}
                                                        onCheckedChange={(checked) => toggleCheckbox('specialties', specialty, !!checked)}
                                                    />
                                                    <Label htmlFor={specialty} className="text-sm">
                                                        {specialty}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                        <InputError message={errors.specialties} className="mt-2" />
                                    </div>

                                    {/* Profile Photos */}
                                    <div className="border-t pt-6">
                                        <h3 className="mb-4 text-lg font-semibold">Profile Photos</h3>
                                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                            {[0, 1, 2, 3].map((i) => (
                                                <div
                                                    className="border-primary/30 hover:border-primary/50 flex aspect-square items-center justify-center rounded-lg border-2 border-dashed transition-colors"
                                                    key={`photo-${i}`}
                                                >
                                                    {photoPreviews[i] ? (
                                                        <div className="relative h-40 w-full max-w-sm overflow-hidden rounded-lg">
                                                            <img
                                                                src={photoPreviews[i]}
                                                                alt={`Preview ${i + 1}`}
                                                                className="h-full w-full object-cover"
                                                            />
                                                            <button
                                                                type="button"
                                                                title="Remove photo"
                                                                aria-label="Remove photo"
                                                                onClick={() => {
                                                                    const updatedPhotos = [...data.photos];
                                                                    const updatedPreviews = [...photoPreviews];
                                                                    updatedPhotos[i] = null as unknown as File;
                                                                    updatedPreviews[i] = '';

                                                                    setData('photos', updatedPhotos);
                                                                    setPhotoPreviews(updatedPreviews);
                                                                }}
                                                                className="absolute right-1 top-1 rounded-full bg-black/50 p-1 text-white hover:bg-black/80"
                                                            >
                                                                <X className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <label
                                                                htmlFor={`photo-${i}`}
                                                                className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-0 text-center"
                                                            >
                                                                <Camera className="text-primary/50 mx-auto mb-2 h-8 w-8" />
                                                                <p className="text-muted-foreground text-xs">Upload Photo</p>
                                                            </label>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                id={`photo-${i}`}
                                                                className="hidden"
                                                                onChange={(e) => {
                                                                    const file = e.target.files?.[0];
                                                                    if (file) {
                                                                        const updatedPhotos = [...data.photos];
                                                                        updatedPhotos[i] = file;
                                                                        setData('photos', updatedPhotos);

                                                                        const updatedPreviews = [...photoPreviews];
                                                                        updatedPreviews[i] = URL.createObjectURL(file);
                                                                        setPhotoPreviews(updatedPreviews);
                                                                    }
                                                                }}
                                                                disabled={processing}
                                                            />
                                                        </>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <InputError message={errors.photos} className="mt-2" />
                                    </div>

                                    <Button
                                        className="from-primary to-primary/50 text-primary-foreground w-full bg-gradient-to-r"
                                        disabled={processing}
                                    >
                                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />} Submit Application
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="space-y-6">
                            <Card className="border-primary/20 from-primary/5 bg-gradient-to-br to-transparent">
                                <CardHeader>
                                    <CardTitle className="text-lg">Why Become a Guide?</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="bg-primary mt-2 h-2 w-2 rounded-full"></div>
                                        <div>
                                            <h4 className="font-medium">Earn Money</h4>
                                            <p className="text-muted-foreground text-sm">Set your own rates and work flexible hours</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="bg-primary mt-2 h-2 w-2 rounded-full"></div>
                                        <div>
                                            <h4 className="font-medium">Share Culture</h4>
                                            <p className="text-muted-foreground text-sm">Show travelers the real local experience</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="bg-primary mt-2 h-2 w-2 rounded-full"></div>
                                        <div>
                                            <h4 className="font-medium">Build Network</h4>
                                            <p className="text-muted-foreground text-sm">Meet people from around the world</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-primary/10">
                                <CardHeader>
                                    <CardTitle className="text-lg">Application Process</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-full text-sm font-medium">
                                            1
                                        </div>
                                        <span className="text-sm">Submit application</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="bg-muted text-muted-foreground flex h-6 w-6 items-center justify-center rounded-full text-sm font-medium">
                                            2
                                        </div>
                                        <span className="text-muted-foreground text-sm">Background verification</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="bg-muted text-muted-foreground flex h-6 w-6 items-center justify-center rounded-full text-sm font-medium">
                                            3
                                        </div>
                                        <span className="text-muted-foreground text-sm">Interview & approval</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="bg-muted text-muted-foreground flex h-6 w-6 items-center justify-center rounded-full text-sm font-medium">
                                            4
                                        </div>
                                        <span className="text-muted-foreground text-sm">Start guiding!</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </form>
            </div>
        </AppHeaderLayout>
    );
}
