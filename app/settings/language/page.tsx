"use client";

import Link from "next/link";
import { useToast } from "@/context/ToastContext";
import { useState } from "react";
import clsx from "clsx";

export default function LanguageSettingsPage() {
    const { showToast } = useToast();
    const [selectedLang, setSelectedLang] = useState("tr");

    const handleSelect = (lang: string) => {
        setSelectedLang(lang);
        showToast(lang === 'tr' ? "Dil Türkçe olarak ayarlandı" : "Language set to English", "success");
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden pb-24">
            <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border-light dark:border-border-dark bg-background-light/80 dark:bg-background-dark/80 p-4 pb-3 backdrop-blur-sm">
                <Link href="/settings" className="flex size-8 shrink-0 items-center justify-start">
                    <span className="material-symbols-outlined text-primary">arrow_back_ios_new</span>
                </Link>
                <h1 className="flex-1 text-center text-lg font-bold leading-tight tracking-tight text-text-primary-light dark:text-text-primary-dark">
                    Dil Seçimi
                </h1>
                <div className="w-8"></div>
            </header>
            <main className="flex-1 p-4">
                <div className="flex flex-col gap-4">
                    <button
                        onClick={() => handleSelect('tr')}
                        className={clsx(
                            "rounded-xl p-4 shadow-sm flex items-center justify-between border-2 transition-all",
                            selectedLang === 'tr'
                                ? "bg-primary/5 border-primary text-primary"
                                : "bg-card-light dark:bg-card-dark border-transparent text-text-primary-light dark:text-text-primary-dark"
                        )}
                    >
                        <div className="flex items-center gap-4">
                            <span className="text-2xl">🇹🇷</span>
                            <span className="font-semibold">Türkçe</span>
                        </div>
                        {selectedLang === 'tr' && <span className="material-symbols-outlined text-primary">check_circle</span>}
                    </button>

                    <button
                        onClick={() => handleSelect('en')}
                        className={clsx(
                            "rounded-xl p-4 shadow-sm flex items-center justify-between border-2 transition-all",
                            selectedLang === 'en'
                                ? "bg-primary/5 border-primary text-primary"
                                : "bg-card-light dark:bg-card-dark border-transparent text-text-primary-light dark:text-text-primary-dark"
                        )}
                    >
                        <div className="flex items-center gap-4">
                            <span className="text-2xl">🇬🇧</span>
                            <span className="font-semibold">English</span>
                        </div>
                        {selectedLang === 'en' && <span className="material-symbols-outlined text-primary">check_circle</span>}
                    </button>

                </div>
            </main>
        </div>
    );
}
