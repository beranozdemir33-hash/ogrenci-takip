"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { name: "Ana Sayfa", icon: "home", href: "/" },
        { name: "Öğrenciler", icon: "group", href: "/students" },
        { name: "Takvim", icon: "calendar_today", href: "/calendar" },
        { name: "Ödemeler", icon: "payments", href: "/payments" },
        { name: "Ayarlar", icon: "settings", href: "/settings" },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-20 flex h-20 items-start justify-around border-t border-border-light dark:border-border-dark bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md pt-2">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={clsx(
                            "flex flex-col items-center gap-1",
                            isActive
                                ? "text-primary dark:text-primary"
                                : "text-text-secondary-light dark:text-text-secondary-dark"
                        )}
                    >
                        <span
                            className={clsx(
                                "material-symbols-outlined text-2xl",
                                isActive && "filled"
                            )}
                        >
                            {item.icon}
                        </span>
                        <span className="text-xs font-medium">{item.name}</span>
                    </Link>
                );
            })}
        </div>
    );
}
