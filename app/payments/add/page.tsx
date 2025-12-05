"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/context/ToastContext";
import { createPayment } from "@/app/actions/payments";
import { getStudents } from "@/app/actions/students";
import { Student } from "@/lib/adapter";
import SubmitButton from "@/components/SubmitButton";

export default function AddPaymentPage() {
    const router = useRouter();
    const { showToast } = useToast();
    const [students, setStudents] = useState<Student[]>([]);

    useEffect(() => {
        getStudents().then(setStudents);
    }, []);

    const handleSubmit = async (formData: FormData) => {
        await createPayment(formData);
        showToast("Ödeme başarıyla kaydedildi!", "success");
        router.push("/payments");
    };

    return (
        <form action={handleSubmit} className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden pb-24">
            <header className="flex items-center justify-between bg-background-light dark:bg-background-dark p-4 pb-2 sticky top-0 z-10">
                <Link href="/payments" className="text-primary/70 dark:text-primary/80 text-base font-medium leading-normal">
                    İptal
                </Link>
                <h1 className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight tracking-[-0.015em] absolute left-1/2 -translate-x-1/2">
                    Ödeme Ekle
                </h1>
                <div className="w-12"></div>
            </header>
            <main className="flex-1 px-4 py-2">
                <section className="mb-6">
                    <h2 className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4">
                        Ödeme Bilgileri
                    </h2>
                    <div className="flex flex-col gap-px overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-700/50">
                        <label className="flex flex-col bg-card-light dark:bg-card-dark py-3 px-4">
                            <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium leading-normal pb-1">
                                Öğrenci Seç
                            </p>
                            <select
                                name="studentId"
                                required
                                className="form-input w-full min-w-0 flex-1 resize-none overflow-hidden text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-0 border-none bg-transparent p-0 text-base font-normal leading-normal placeholder:text-text-secondary-light dark:placeholder:text-secondary-dark"
                                defaultValue=""
                            >
                                <option value="" disabled>Seçiniz</option>
                                {students.map((student) => (
                                    <option key={student.id} value={student.id}>{student.name}</option>
                                ))}
                            </select>
                        </label>
                        <label className="flex flex-col bg-card-light dark:bg-card-dark py-3 px-4">
                            <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium leading-normal pb-1">
                                Tutar
                            </p>
                            <div className="relative">
                                <input
                                    name="amount"
                                    required
                                    className="form-input w-full min-w-0 flex-1 resize-none overflow-hidden text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-0 border-none bg-transparent p-0 text-base font-normal leading-normal placeholder:text-text-secondary-light dark:placeholder:text-secondary-dark"
                                    placeholder="0"
                                    inputMode="decimal"
                                    type="number"
                                />
                                <span className="absolute right-0 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark pointer-events-none">
                                    ₺
                                </span>
                            </div>
                        </label>
                        <label className="flex flex-col bg-card-light dark:bg-card-dark py-3 px-4">
                            <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium leading-normal pb-1">
                                Açıklama
                            </p>
                            <input
                                name="subject"
                                required
                                className="form-input w-full min-w-0 flex-1 resize-none overflow-hidden text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-0 border-none bg-transparent p-0 text-base font-normal leading-normal placeholder:text-text-secondary-light dark:placeholder:text-secondary-dark"
                                placeholder="Örn: Ekim Ayı Ödemesi"
                            />
                        </label>
                    </div>
                </section>
                <section className="mb-8">
                    <h2 className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4">
                        Tarih
                    </h2>
                    <div className="flex flex-col gap-px overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-700/50">
                        <label className="flex flex-col bg-card-light dark:bg-card-dark py-3 px-4">
                            <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium leading-normal pb-1">
                                Ödeme Tarihi
                            </p>
                            <input
                                name="date"
                                required
                                className="form-input w-full min-w-0 flex-1 resize-none overflow-hidden text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-0 border-none bg-transparent p-0 text-base font-normal leading-normal placeholder:text-text-secondary-light dark:placeholder:text-secondary-dark"
                                type="date"
                            />
                        </label>
                    </div>
                </section>
            </main>
            <footer className="p-4 pt-2 pb-8 sticky bottom-0 bg-background-light dark:bg-background-dark">
                <SubmitButton />
            </footer>
        </form >
    );
}

