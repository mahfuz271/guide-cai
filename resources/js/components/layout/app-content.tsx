import { SidebarInset } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import * as React from 'react';

interface AppContentProps extends React.ComponentProps<'main'> {
    variant?: 'header' | 'sidebar';
    maxWidth?: boolean;
}

export function AppContent({ variant = 'header', maxWidth = false, children, ...props }: AppContentProps) {
    if (variant === 'sidebar') {
        return <SidebarInset {...props}>{children}</SidebarInset>;
    }

    return (
        <main
            className={cn('mx-auto flex h-full w-full flex-1 flex-col gap-4 rounded-xl', {
                'max-w-7xl': maxWidth,
            })}
            {...props}
        >
            {children}
        </main>
    );
}
