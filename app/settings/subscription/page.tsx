"use client";

import Link from "next/link";
import { useToast } from "@/context/ToastContext";

export default function SubscriptionSettingsPage() {
    const { showToast } = useToast();

    const handleAction = () => {
        showToast("İşlem başlatıldı...", "info");
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden pb-24">
            <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border-light dark:border-border-dark bg-background-light/80 dark:bg-background-dark/80 p-4 pb-3 backdrop-blur-sm">
                <Link href="/settings" className="flex size-8 shrink-0 items-center justify-start">
                    <span className="material-symbols-outlined text-primary">arrow_back_ios_new</span>
                </Link>
                <h1 className="flex-1 text-center text-lg font-bold leading-tight tracking-tight text-text-primary-light dark:text-text-primary-dark">
                    Aboneliği Yönet
                </h1>
                <div className="w-8"></div>
            </header>
            <main className="flex-1 p-4">
                <div className="mb-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg">
                    <p className="mb-2 text-sm font-medium opacity-90">Mevcut Plan</p>
                    <h2 className="mb-4 text-3xl font-bold">Profesyonel</h2>
                    <div className="flex items-center justify-between border-t border-white/20 pt-4">
                        <div>
                            <p className="text-xs opacity-90">Yenileme Tarihi</p>
                            <p className="font-semibold">05 Ocak 2026</p>
                        </div>
                        <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur-md">
                            Aktif
                        </span>
                    </div>
                </div>

                <h3 className="mb-3 px-1 text-sm font-bold uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark">
                    Plan İşlemleri
                </h3>
                <div className="mb-6 overflow-hidden rounded-xl bg-card-light dark:bg-card-dark shadow-sm">
                    <button onClick={handleAction} className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                            <span className="material-symbols-outlined">upgrade</span>
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-text-primary-light dark:text-text-primary-dark">Planı Yükselt</p>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Daha fazla özellik keşfet</p>
                        </div>
                        <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                    </button>
                    <div className="mx-4 h-px bg-border-light dark:bg-border-dark"></div>
                    <button onClick={handleAction} className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                            <span className="material-symbols-outlined">cancel</span>
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-text-primary-light dark:text-text-primary-dark">Aboneliği İptal Et</p>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Otomatik yenilemeyi durdur</p>
                        </div>
                        <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                    </button>
                </div>

                <h3 className="mb-3 px-1 text-sm font-bold uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark">
                    Fatura Geçmişi
                </h3>
                <div className="overflow-hidden rounded-xl bg-card-light dark:bg-card-dark shadow-sm">
                    {[
                        { date: "05 Ara 2025", amount: "₺499.00", status: "Ödendi" },
                        { date: "05 Kas 2025", amount: "₺499.00", status: "Ödendi" },
                        { date: "05 Eki 2025", amount: "₺499.00", status: "Ödendi" },
                    ].map((invoice, i) => (
                        <div key={i}>
                            <div className="flex items-center justify-between p-4">
                                <div>
                                    <p className="font-semibold text-text-primary-light dark:text-text-primary-dark">{invoice.date}</p>
                                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Profesyonel Plan</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-text-primary-light dark:text-text-primary-dark">{invoice.amount}</p>
                                    <p className="text-xs text-green-600 dark:text-green-400">{invoice.status}</p>
                                </div>
                            </div>
                            {i < 2 && <div className="mx-4 h-px bg-border-light dark:bg-border-dark"></div>}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
