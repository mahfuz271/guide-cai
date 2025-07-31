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
    name: string;
    email: string;
    phone?: string;
    location?: string;
    avatar_url?: string;
    avatar?: string;
    email_verified_at: string | null;
    status: 'active' | 'blocked' | 'pending';
    verified?: boolean;
    guideProfile?: GuideProfileData;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

interface GuideProfileData {
    title?: string;
    rating?: number;
    reviews_count?: number;
    total_guides?: number;
    response_time?: string;
    booking_rate?: number;
    languages?: string[];
    specialties?: string[];
    bio?: string;
    photos?: { full_path: string; path: string }[];
    hourly_rate?: number;
    verified?: boolean;
    [key: string]: unknown; // This allows for additional properties...
}
