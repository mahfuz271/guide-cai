import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

interface FlashMessages {
    success?: string;
    error?: string;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    flash?: FlashMessages;
    [key: string]: unknown;
}

export interface User {
    id: number;
    role: 'user' | 'guide' | 'admin';
    name: string;
    email: string;
    phone?: string;
    location?: string;
    avatar_url?: string;
    avatar?: string;
    email_verified_at: string | null;
    status: 'active' | 'blocked' | 'pending';
    verified?: 1 | null;
    guide_profile?: GuideProfileData;
    avg_rating?: number;
    total_reviews?: number;
    reviews?: Review[];
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface GuideProfileData {
    title?: string;
    booking_rate?: number;
    languages?: string[];
    specialties?: string[];
    bio?: string;
    photos?: { full_path: string; path: string }[];
    hourly_rate?: number;
    nid_front?: string;
    nid_back?: string;
    [key: string]: unknown;
}

export interface GuideAvailability {
    id: number;
    guide_id: number;
    day_of_week: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
    start_time: string;
    end_time: string;
    is_active: boolean;
    [key: string]: unknown;
}

export type Booking = {
    id: number;
    user: User;
    guide: User;
    date: string;
    start_time: string;
    end_time: string;
    hours: number;
    total_amount: number;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    is_paid: boolean;
    special_requests?: string;
    review?: Review | null;
};

export type Review = {
    id: number;
    rating: number;
    comment: string | null;
    user_id: number;
    guide_id: number;
    booking_id: number;
    created_at: string;
    user?: User;
};
