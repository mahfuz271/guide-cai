import React from "react";
import { router } from "@inertiajs/react";

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    links: PaginationLink[];
}

const Pagination: React.FC<PaginationProps> = ({ links }) => {
    const visibleLinks = links?.filter(
        (link) => link.url && !["Previous", "Next"].includes(link.label)
    );

    if (!visibleLinks || visibleLinks.length <= 1) return null;

    return (
        <div className="mt-6 flex justify-center flex-wrap gap-2">
            {links.map((link, index) => (
                <button
                    key={index}
                    disabled={!link.url}
                    onClick={() =>
                        link.url &&
                        router.visit(link.url, {
                            preserveScroll: false,
                            preserveState: true,
                            replace: true,
                        })
                    }
                    className={`px-4 py-2 border rounded text-sm transition-colors ${
                        link.active
                            ? "bg-primary text-white dark:bg-primary dark:text-white"
                            : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                    } ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
};

export default Pagination;
