"use client";

import Link from "next/link";
import { createLesson } from "@/app/actions/lessons";
import SubmitButton from "@/components/SubmitButton";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";
import { useEffect, useState } from "react";
import { getStudents } from "@/app/actions/students"; // We need this to populate the dropdown
import { Student } from "@/lib/adapter";

export default function AddLessonPage() {
    const router = useRouter();
    const { showToast } = useToast();
    const [students, setStudents] = useState<Student[]>([]);

    useEffect(() => {
        getStudents().then(setStudents);
    }, []);

    async function handleSubmit(formData: FormData) {
        await createLesson(formData);
        showToast("Ders başarıyla eklendi!", "success");
        router.push("/calendar");
    }

    return (
        <form action={handleSubmit} className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden pb-24">
            <header className="flex items-center justify-between bg-background-light dark:bg-background-dark p-4 pb-2 sticky top-0 z-10">
                <Link href="/calendar" className="text-primary/70 dark:text-primary/80 text-base font-medium leading-normal">
                    İptal
                </Link>
                <h1 className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight tracking-[-0.015em] absolute left-1/2 -translate-x-1/2">
                    Ders Ekle
                </h1>
                <div className="w-12"></div>
            </header>
            <main className="flex-1 px-4 py-2">
                <section className="mb-6">
                    <h2 className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4">
                        Ders Bilgileri
                    </h2>
                    <div className="flex flex-col gap-px overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-700/50">
                        <label className="flex flex-col bg-card-light dark:bg-card-dark py-3 px-4">
                            <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium leading-normal pb-1">
                                Öğrenci
                            </p>
                            <select
                                name="studentId"
                                required
                                className="form-input w-full min-w-0 flex-1 resize-none overflow-hidden text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-0 border-none bg-transparent p-0 text-base font-normal leading-normal placeholder:text-text-secondary-light dark:placeholder:text-secondary-dark [&>option]:bg-white [&>option]:text-black dark:[&>option]:bg-gray-800 dark:[&>option]:text-white"
                                defaultValue=""
                            >
                                <option value="" disabled>Öğrenci Seçin</option>
                                {students.map(s => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>
                        </label>
                        <label className="flex flex-col bg-card-light dark:bg-card-dark py-3 px-4">
                            <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium leading-normal pb-1">
                                Ders
                            </p>
                            <select
                                name="subject"
                                required
                                className="form-input w-full min-w-0 flex-1 resize-none overflow-hidden text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-0 border-none bg-transparent p-0 text-base font-normal leading-normal placeholder:text-text-secondary-light dark:placeholder:text-secondary-dark [&>option]:bg-white [&>option]:text-black dark:[&>option]:bg-gray-800 dark:[&>option]:text-white"
                                defaultValue=""
                            >
                                <option value="" disabled>Ders Seçin</option>
                                <option value="Keman">Keman</option>
                                <option value="Piyano">Piyano</option>
                                <option value="Gitar">Gitar</option>
                                <option value="Şan">Şan</option>
                                <option value="Bağlama">Bağlama</option>
                                <option value="Yan Flüt">Yan Flüt</option>
                                <option value="Bateri">Bateri</option>
                            </select>
                        </label>
                    </div>
                </section>
                <section className="mb-6">
                    <h2 className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4">
                        Zamanlama
                    </h2>
                    <div className="flex flex-col gap-px overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-700/50">
                        <label className="flex flex-col bg-card-light dark:bg-card-dark py-3 px-4">
                            <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium leading-normal pb-1">
                                Tarih
                            </p>
                            <input
                                name="date"
                                required
                                type="date"
                                className="form-input w-full min-w-0 flex-1 resize-none overflow-hidden text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-0 border-none bg-transparent p-0 text-base font-normal leading-normal placeholder:text-text-secondary-light dark:placeholder:text-secondary-dark"
                            />
                        </label>
                        <div className="flex gap-px">
                            <label className="flex flex-col flex-1 bg-card-light dark:bg-card-dark py-3 px-4">
                                <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium leading-normal pb-1">
                                    Başlangıç Saati
                                </p>
                                <input
                                    name="startTime"
                                    required
                                    type="time"
                                    className="form-input w-full min-w-0 flex-1 resize-none overflow-hidden text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-0 border-none bg-transparent p-0 text-base font-normal leading-normal placeholder:text-text-secondary-light dark:placeholder:text-secondary-dark"
                                />
                            </label>
                            <label className="flex flex-col flex-1 bg-card-light dark:bg-card-dark py-3 px-4">
                                <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium leading-normal pb-1">
                                    Bitiş Saati
                                </p>
                                <input
                                    name="endTime"
                                    required
                                    type="time"
                                    className="form-input w-full min-w-0 flex-1 resize-none overflow-hidden text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-0 border-none bg-transparent p-0 text-base font-normal leading-normal placeholder:text-text-secondary-light dark:placeholder:text-secondary-dark"
                                />
                            </label>
                        </div>
                    </div>
                </section>
                <section className="mb-6">
                    <h2 className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4">
                        Tekrar Seçenekleri
                    </h2>
                    <div className="flex flex-col gap-px overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-700/50">
                        <label className="flex items-center justify-between bg-card-light dark:bg-card-dark py-3 px-4 cursor-pointer">
                            <p className="text-text-primary-light dark:text-text-primary-dark text-base font-medium leading-normal">
                                Her Hafta Tekrarla
                            </p>
                            <input
                                name="recurring"
                                type="checkbox"
                                className="h-6 w-6 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                        </label>
                        <label className="flex flex-col bg-card-light dark:bg-card-dark py-3 px-4">
                            <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium leading-normal pb-1">
                                Hangi Tarihe Kadar?
                            </p>
                            <input
                                name="recurringEndDate"
                                type="date"
                                className="form-input w-full min-w-0 flex-1 resize-none overflow-hidden text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-0 border-none bg-transparent p-0 text-base font-normal leading-normal placeholder:text-text-secondary-light dark:placeholder:text-secondary-dark"
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
