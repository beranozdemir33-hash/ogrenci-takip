"use client";

import Link from "next/link";
import { useToast } from "@/context/ToastContext";
import { useState } from "react";
import clsx from "clsx";

export default function NotificationsSettingsPage() {
    const { showToast } = useToast();
    const [settings, setSettings] = useState({
        email: true,
        sms: false,
        push: true,
        marketing: false,
    });

    const handleToggle = (key: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSave = () => {
        showToast("Bildirim tercihleri kaydedildi", "success");
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden pb-24">
            <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border-light dark:border-border-dark bg-background-light/80 dark:bg-background-dark/80 p-4 pb-3 backdrop-blur-sm">
                <Link href="/settings" className="flex size-8 shrink-0 items-center justify-start">
                    <span className="material-symbols-outlined text-primary">arrow_back_ios_new</span>
                </Link>
                <h1 className="flex-1 text-center text-lg font-bold leading-tight tracking-tight text-text-primary-light dark:text-text-primary-dark">
                    Bildirimler
                </h1>
                <div className="w-8"></div>
            </header>
            <main className="flex-1 p-4">
                <div className="flex flex-col gap-4">
                    <div className="rounded-xl bg-card-light dark:bg-card-dark p-4 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="font-semibold text-text-primary-light dark:text-text-primary-dark">E-posta Bildirimleri</p>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Ders hatırlatmaları ve raporlar</p>
                        </div>
                        <label className="relative inline-flex cursor-pointer items-center">
                            <input type="checkbox" className="peer sr-only" checked={settings.email} onChange={() => handleToggle('email')} />
                            <div className="peer h-7 w-12 rounded-full bg-gray-200 after:absolute after:start-[4px] after:top-[4px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-gray-700"></div>
                        </label>
                    </div>

                    <div className="rounded-xl bg-card-light dark:bg-card-dark p-4 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="font-semibold text-text-primary-light dark:text-text-primary-dark">Anlık Bildirimler</p>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Uygulama içi uyarılar</p>
                        </div>
                        <label className="relative inline-flex cursor-pointer items-center">
                            <input type="checkbox" className="peer sr-only" checked={settings.push} onChange={() => handleToggle('push')} />
                            <div className="peer h-7 w-12 rounded-full bg-gray-200 after:absolute after:start-[4px] after:top-[4px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-gray-700"></div>
                        </label>
                    </div>

                    <div className="rounded-xl bg-card-light dark:bg-card-dark p-4 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="font-semibold text-text-primary-light dark:text-text-primary-dark">SMS Bildirimleri</p>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Acil durumlar ve ödeme uyarıları</p>
                        </div>
                        <label className="relative inline-flex cursor-pointer items-center">
                            <input type="checkbox" className="peer sr-only" checked={settings.sms} onChange={() => handleToggle('sms')} />
                            <div className="peer h-7 w-12 rounded-full bg-gray-200 after:absolute after:start-[4px] after:top-[4px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-gray-700"></div>
                        </label>
                    </div>

                    <div className="rounded-xl bg-card-light dark:bg-card-dark p-4 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="font-semibold text-text-primary-light dark:text-text-primary-dark">Pazarlama İletileri</p>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Kampanyalar ve yenilikler</p>
                        </div>
                        <label className="relative inline-flex cursor-pointer items-center">
                            <input type="checkbox" className="peer sr-only" checked={settings.marketing} onChange={() => handleToggle('marketing')} />
                            <div className="peer h-7 w-12 rounded-full bg-gray-200 after:absolute after:start-[4px] after:top-[4px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-gray-700"></div>
                        </label>
                    </div>

                    <button onClick={handleSave} className="mt-4 rounded-xl bg-primary py-3 text-base font-bold text-white shadow-lg active:scale-95 transition-transform">
                        Kaydet
                    </button>
                </div>
            </main>
        </div>
    );
}
