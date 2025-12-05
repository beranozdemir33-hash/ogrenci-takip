"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchInput({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <label className="flex h-12 w-full flex-col">
            <div className="flex h-full w-full flex-1 items-stretch rounded-lg">
                <div className="text-text-secondary-light dark:text-text-secondary-dark flex items-center justify-center rounded-l-lg border-r-0 bg-gray-200 dark:bg-gray-800 pl-3">
                    <span className="material-symbols-outlined text-2xl">search</span>
                </div>
                <input
                    className="form-input flex min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg border-none bg-gray-200 dark:bg-gray-800 px-2 text-base font-normal leading-normal text-text-primary-light dark:text-text-primary-dark placeholder:text-text-secondary-light dark:placeholder:text-secondary-dark focus:outline-0 focus:ring-0"
                    placeholder={placeholder}
                    onChange={(e) => handleSearch(e.target.value)}
                    defaultValue={searchParams.get("query")?.toString()}
                />
            </div>
        </label>
    );
}
