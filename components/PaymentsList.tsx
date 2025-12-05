"use client";

import clsx from "clsx";
import { useState } from "react";
import { markPaymentAsPaid } from "@/app/actions/payments";
import { useToast } from "@/context/ToastContext";
import { Payment } from "@/lib/adapter";
import StudentAvatar from "@/components/StudentAvatar";
import { formatDate } from "@/lib/date-utils";

// Define the enriched type locally since it's not in adapter
type EnrichedPayment = Payment & {
    student?: {
        name: string;
        image: string | null;
    };
    name?: string; // Keep for backward compatibility if needed, or remove
    image?: string;
};

export default function PaymentsList({ initialPayments }: { initialPayments: any[] }) {
    const { showToast } = useToast();
    const [filter, setFilter] = useState<"Bekleyen" | "Tamamlanan">("Bekleyen");
    // Optimistic state could be implemented here, but for simplicity we'll assume revalidation handles it
    // Actually, simple client state update is better for UX
    const [payments, setPayments] = useState<EnrichedPayment[]>(initialPayments);

    const handleMarkPaid = async (id: number) => {
        // Optimistic update
        setPayments(prev => prev.map(p => p.id === id ? { ...p, status: "completed" } : p));
        showToast("Ödeme başarıyla alındı!", "success");
        await markPaymentAsPaid(id);
    };

    const filteredPayments = payments.filter(p =>
        filter === "Bekleyen" ? p.status === "pending" : p.status === "completed"
    );

    return (
        <div className="flex-1">
            <div className="p-4">
                <div className="grid grid-cols-2 gap-4 rounded-xl bg-card-light dark:bg-card-dark p-4 shadow-sm">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            <span>Toplam Ödenen</span>
                        </div>
                        <p className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">
                            ₺{payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0).toLocaleString('tr-TR')}
                        </p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                            <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                            <span>Bekleyen Ödeme</span>
                        </div>
                        <p className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">
                            ₺{payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0).toLocaleString('tr-TR')}
                        </p>
                    </div>
                </div>
            </div>
            <div className="px-4 py-3 pt-0">
                <div className="flex h-10 flex-1 items-center justify-center rounded-lg bg-gray-200/60 dark:bg-gray-800/60 p-1">
                    <button
                        onClick={() => setFilter("Bekleyen")}
                        className={clsx(
                            "flex h-full flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-md px-2 text-sm font-medium leading-normal transition-all",
                            filter === "Bekleyen"
                                ? "bg-card-light dark:bg-card-dark text-text-primary-light dark:text-text-primary-dark shadow-sm"
                                : "text-text-secondary-light dark:text-text-secondary-dark"
                        )}
                    >
                        <span className="truncate">Bekleyen</span>
                    </button>
                    <button
                        onClick={() => setFilter("Tamamlanan")}
                        className={clsx(
                            "flex h-full flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-md px-2 text-sm font-medium leading-normal transition-all",
                            filter === "Tamamlanan"
                                ? "bg-card-light dark:bg-card-dark text-text-primary-light dark:text-text-primary-dark shadow-sm"
                                : "text-text-secondary-light dark:text-text-secondary-dark"
                        )}
                    >
                        <span className="truncate">Tamamlanan</span>
                    </button>
                </div>
            </div>
            <div className="px-4 pb-2 pt-1">
                <label className="flex h-10 w-full flex-col">
                    <div className="flex h-full w-full flex-1 items-stretch rounded-lg">
                        <div className="flex items-center justify-center rounded-l-lg border-r-0 bg-gray-200/60 dark:bg-gray-800/60 pl-3 text-text-secondary-light dark:text-text-secondary-dark">
                            <span className="material-symbols-outlined text-xl">search</span>
                        </div>
                        <input
                            className="form-input h-full w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg border-none bg-gray-200/60 dark:bg-gray-800/60 pl-2 text-base font-normal leading-normal text-text-primary-light dark:text-text-primary-dark placeholder:text-text-secondary-light dark:placeholder:text-secondary-dark focus:outline-0 focus:ring-0"
                            placeholder="Öğrenci veya derse göre ara"
                        />
                    </div>
                </label>
            </div>
            <div className="flex flex-col gap-2 p-4">
                {filteredPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center gap-4 rounded-xl bg-card-light dark:bg-card-dark p-4 shadow-sm">
                        <div className="relative h-14 w-14 shrink-0">
                            <StudentAvatar
                                name={payment.student?.name || "Öğrenci"}
                                image={payment.student?.image}
                                className="h-full w-full"
                                size="lg"
                            />
                            <div className={clsx(
                                "absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-card-light dark:border-card-dark",
                                payment.status === 'pending' ? 'bg-orange-500' : 'bg-green-500'
                            )}></div>
                        </div>
                        <div className="flex flex-1 flex-col justify-center">
                            <p className="text-base font-semibold text-text-primary-light dark:text-text-primary-dark">
                                {payment.student?.name || "Öğrenci"}
                            </p>
                            <p className="text-sm font-normal text-text-secondary-light dark:text-text-secondary-dark">
                                {payment.status === 'pending' ? 'Son Ödeme Tarihi:' : 'Ödendi:'} {formatDate(payment.date)}
                            </p>
                        </div>
                        <div className="shrink-0 text-right flex flex-col items-end gap-1">
                            <p className="text-base font-bold text-text-primary-light dark:text-text-primary-dark">
                                ₺{payment.amount}
                            </p>
                            {payment.status === 'pending' && (
                                <button
                                    onClick={() => handleMarkPaid(payment.id)}
                                    className="rounded-md bg-green-500 px-3 py-1 text-xs font-bold text-white shadow-sm active:scale-95 transition-transform"
                                >
                                    Öde
                                </button>
                            )}
                            {payment.status === 'completed' && (
                                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                                    {payment.subject}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
                {filteredPayments.length === 0 && (
                    <div className="p-8 text-center text-text-secondary-light dark:text-text-secondary-dark">
                        Ödeme kaydı bulunamadı.
                    </div>
                )}
            </div>
        </div>
    );
}
