"use client";

import BottomNav from "@/components/BottomNav";
import Link from "next/link";
import { useToast } from "@/context/ToastContext";
import { useTheme } from "@/context/ThemeContext";

export default function SettingsPage() {
    const { showToast } = useToast();
    const { theme, toggleTheme } = useTheme();

    const handleIntegrationToggle = (name: string, checked: boolean) => {
        if (checked) {
            showToast(`${name} entegrasyonu aktif edildi`, "success");
        } else {
            showToast(`${name} entegrasyonu kapatıldı`, "info");
        }
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden pb-24">
            <div className="sticky top-0 z-10 flex items-center bg-background-light/90 dark:bg-background-dark/90 p-4 pb-3 justify-between backdrop-blur-sm border-b border-border-light/70 dark:border-border-dark/70">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-3xl">chevron_left</span>
                    <Link className="text-primary text-base" href="/">
                        Ana Sayfa
                    </Link>
                </div>
                <h1 className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight tracking-[-0.015em] absolute left-1/2 -translate-x-1/2">
                    Ayarlar
                </h1>
                <div className="w-16"></div>
            </div>
            <div className="flex-grow p-4">
                <div className="mb-8 flex flex-col items-center">
                    <div className="relative">
                        <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-24 border-4 border-card-light dark:border-card-dark shadow-md"
                            style={{
                                backgroundImage:
                                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA3VTwJzz0W9D0BlW2Lli7uK5lNXclb8jTsQvuW48n9qDnMiOOjtpKd-aWOnmaSh-NPte3gghX6QRTzG9hmg6o7hFzFNw7j-R4ow0EbAdjQkA7o0oQlBdGB5iL48yYOkkv6KZoyO9Mwiq36cx1bNt53S9wEOfucs54F91lGNICH-4LrDVWAryB7iUsT9dI8_aSw_rvVn9UdaBDfItJSMPfJHfIul43K3aJQhhgL2Yt4IbWM5NeV5Clfoxqxv_LreQ4oVqFMYhvgD2o")',
                            }}
                        ></div>
                        <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white border-2 border-card-light dark:border-card-dark">
                            <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                    </div>
                    <h2 className="mt-4 text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
                        Ahmet Yılmaz
                    </h2>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                        ahmet.yilmaz@email.com
                    </p>
                </div>
                <div className="flex flex-col gap-6">
                    <div>
                        <h3 className="px-4 pb-2 text-sm font-semibold uppercase text-text-secondary-light dark:text-text-secondary-dark tracking-wider">
                            Entegrasyonlar
                        </h3>
                        <div className="overflow-hidden rounded-lg bg-card-light dark:bg-card-dark shadow-sm">
                            <div className="flex items-center gap-4 p-4">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                                    <span className="material-symbols-outlined text-white text-xl">calendar_today</span>
                                </div>
                                <span className="flex-1 text-base text-text-primary-light dark:text-text-primary-dark">
                                    Google Takvim
                                </span>
                                <label className="relative inline-flex cursor-pointer items-center">
                                    <input
                                        type="checkbox"
                                        className="peer sr-only"
                                        onChange={(e) => handleIntegrationToggle("Google Takvim", e.target.checked)}
                                    />
                                    <div className="peer h-7 w-12 rounded-full bg-gray-200 after:absolute after:start-[4px] after:top-[4px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-gray-700"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="px-4 pb-2 text-sm font-semibold uppercase text-text-secondary-light dark:text-text-secondary-dark tracking-wider">
                            Hesap
                        </h3>
                        <div className="overflow-hidden rounded-lg bg-card-light dark:bg-card-dark shadow-sm">
                            <Link className="flex items-center gap-4 p-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors" href="/settings/profile">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
                                    <span className="material-symbols-outlined text-white text-xl">person</span>
                                </div>
                                <span className="flex-1 text-base text-text-primary-light dark:text-text-primary-dark">
                                    Profil Bilgileri
                                </span>
                                <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark">
                                    chevron_right
                                </span>
                            </Link>
                            <div className="mx-4 h-px bg-border-light dark:bg-border-dark"></div>
                            <Link className="flex items-center gap-4 p-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors" href="/settings/notifications">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500">
                                    <span className="material-symbols-outlined text-white text-xl">
                                        notifications
                                    </span>
                                </div>
                                <span className="flex-1 text-base text-text-primary-light dark:text-text-primary-dark">
                                    Bildirimler
                                </span>
                                <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark">
                                    chevron_right
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h3 className="px-4 pb-2 text-sm font-semibold uppercase text-text-secondary-light dark:text-text-secondary-dark tracking-wider">
                            Abonelik
                        </h3>
                        <div className="overflow-hidden rounded-lg bg-card-light dark:bg-card-dark shadow-sm">
                            <Link className="flex items-center gap-4 p-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors" href="/settings/subscription">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500">
                                    <span className="material-symbols-outlined text-white text-xl">
                                        workspace_premium
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-base text-text-primary-light dark:text-text-primary-dark">
                                        Aboneliği Yönet
                                    </p>
                                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                        Profesyonel Plan
                                    </p>
                                </div>
                                <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark">
                                    chevron_right
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h3 className="px-4 pb-2 text-sm font-semibold uppercase text-text-secondary-light dark:text-text-secondary-dark tracking-wider">
                            Uygulama
                        </h3>
                        <div className="overflow-hidden rounded-lg bg-card-light dark:bg-card-dark shadow-sm">
                            <Link className="flex items-center gap-4 p-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors" href="/settings/language">
                                <div
                                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                                    style={{ backgroundColor: "#5856D6" }}
                                >
                                    <span className="material-symbols-outlined text-white text-xl">language</span>
                                </div>
                                <span className="flex-1 text-base text-text-primary-light dark:text-text-primary-dark">
                                    Dil
                                </span>
                                <span className="mr-2 text-base text-text-secondary-light dark:text-text-secondary-dark">
                                    Türkçe
                                </span>
                                <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark">
                                    chevron_right
                                </span>
                            </Link>
                            <div className="mx-4 h-px bg-border-light dark:bg-border-dark"></div>
                            <div className="flex items-center gap-4 p-4">
                                <div
                                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                                    style={{ backgroundColor: "#8E8E93" }}
                                >
                                    <span className="material-symbols-outlined text-white text-xl">dark_mode</span>
                                </div>
                                <span className="flex-1 text-base text-text-primary-light dark:text-text-primary-dark">
                                    Görünüm
                                </span>
                                <label className="relative inline-flex cursor-pointer items-center">
                                    <input
                                        className="peer sr-only"
                                        type="checkbox"
                                        checked={theme === 'dark'}
                                        onChange={toggleTheme}
                                    />
                                    <div className="peer h-7 w-12 rounded-full bg-gray-200 after:absolute after:start-[4px] after:top-[4px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-gray-700"></div>
                                </label>
                            </div>
                            <div className="mx-4 h-px bg-border-light dark:bg-border-dark"></div>
                            <Link className="flex items-center gap-4 p-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors" href="/login">
                                <div
                                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                                    style={{ backgroundColor: "#FF2D55" }}
                                >
                                    <span className="material-symbols-outlined text-white text-xl">logout</span>
                                </div>
                                <span className="flex-1 text-base text-red-500">Çıkış Yap</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="py-4 text-center">
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                        Uygulama Sürümü 1.0.0
                    </p>
                </div>
            </div>
            <BottomNav />
        </div>
    );
}
