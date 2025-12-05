"use client";

import Link from "next/link";
import { useToast } from "@/context/ToastContext";

export default function ProfileSettingsPage() {
    const { showToast } = useToast();

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        showToast("Profil bilgileri güncellendi", "success");
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden pb-24">
            <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border-light dark:border-border-dark bg-background-light/80 dark:bg-background-dark/80 p-4 pb-3 backdrop-blur-sm">
                <Link href="/settings" className="flex size-8 shrink-0 items-center justify-start">
                    <span className="material-symbols-outlined text-primary">arrow_back_ios_new</span>
                </Link>
                <h1 className="flex-1 text-center text-lg font-bold leading-tight tracking-tight text-text-primary-light dark:text-text-primary-dark">
                    Profil Bilgileri
                </h1>
                <div className="w-8"></div>
            </header>
            <main className="flex-1 p-4">
                <div className="flex flex-col items-center mb-6">
                    <div className="relative">
                        <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-24 border-4 border-card-light dark:border-card-dark shadow-md"
                            style={{
                                backgroundImage:
                                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA3VTwJzz0W9D0BlW2Lli7uK5lNXclb8jTsQvuW48n9qDnMiOOjtpKd-aWOnmaSh-NPte3gghX6QRTzG9hmg6o7hFzFNw7j-R4ow0EbAdjQkA7o0oQlBdGB5iL48yYOkkv6KZoyO9Mwiq36cx1bNt53S9wEOfucs54F91lGNICH-4LrDVWAryB7iUsT9dI8_aSw_rvVn9UdaBDfItJSMPfJHfIul43K3aJQhhgL2Yt4IbWM5NeV5Clfoxqxv_LreQ4oVqFMYhvgD2o")',
                            }}
                        ></div>
                        <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white border-2 border-card-light dark:border-card-dark">
                            <span className="material-symbols-outlined text-lg">photo_camera</span>
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSave} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">Ad Soyad</label>
                        <input defaultValue="Ahmet Yılmaz" className="form-input rounded-lg border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark px-4 py-3 text-text-primary-light dark:text-text-primary-dark shadow-sm" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">E-posta</label>
                        <input defaultValue="ahmet.yilmaz@email.com" type="email" className="form-input rounded-lg border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark px-4 py-3 text-text-primary-light dark:text-text-primary-dark shadow-sm" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">Telefon</label>
                        <input defaultValue="+90 555 123 45 67" type="tel" className="form-input rounded-lg border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark px-4 py-3 text-text-primary-light dark:text-text-primary-dark shadow-sm" />
                    </div>

                    <button type="submit" className="mt-4 rounded-xl bg-primary py-3 text-base font-bold text-white shadow-lg active:scale-95 transition-transform">
                        Kaydet
                    </button>
                </form>
            </main>
        </div>
    );
}
