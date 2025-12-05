"use client";

import { Lesson } from "@/lib/adapter";
import { updateLesson, deleteLesson } from "@/app/actions/lessons"; // We will need to export updateLesson properly or wrap it if it's not working directly
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import SubmitButton from "@/components/SubmitButton";

export default function LessonEditForm({ lesson }: { lesson: Lesson }) {
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        const date = formData.get("date") as string;
        const startTime = formData.get("startTime") as string;
        const endTime = formData.get("endTime") as string;
        const subject = formData.get("subject") as string;
        const time = `${startTime} - ${endTime}`;

        await updateLesson(lesson.id, {
            date,
            time,
            subject
        });
        router.push("/"); // Back to dashboard
    }

    async function handleCancelLesson() {
        if (confirm("Dersi iptal etmek istediğinize emin misiniz?")) {
            await updateLesson(lesson.id, { status: "cancelled" });
            router.push("/");
        }
    }

    async function handleActivateLesson() {
        await updateLesson(lesson.id, { status: "scheduled" });
        router.push("/");
    }

    async function handleDeleteLesson() {
        if (confirm("Bu dersi tamamen silmek istediğinize emin misiniz?")) {
            await deleteLesson(lesson.id);
            router.push("/");
        }
    }

    const [start, end] = lesson.time.split(" - ");

    return (
        <form action={handleSubmit} className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden pb-24">
            <header className="flex items-center justify-between bg-background-light dark:bg-background-dark p-4 pb-2 sticky top-0 z-10">
                <Link href="/" className="text-primary/70 dark:text-primary/80 text-base font-medium leading-normal">
                    İptal
                </Link>
                <h1 className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight tracking-[-0.015em] absolute left-1/2 -translate-x-1/2">
                    Ders Düzenle
                </h1>
                <div className="w-12 flex justify-end">
                    <button type="button" onClick={handleDeleteLesson} className="text-red-500">
                        <span className="material-symbols-outlined">delete</span>
                    </button>
                </div>
            </header>
            <main className="flex-1 px-4 py-2">
                <section className="mb-6">
                    <div className="flex flex-col items-center justify-center mb-6 pt-4">
                        <div className={`rounded-full p-4 mb-2 ${lesson.status === 'cancelled' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                            <span className="material-symbols-outlined text-3xl">
                                {lesson.status === 'cancelled' ? 'event_busy' : 'event'}
                            </span>
                        </div>
                        <h2 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">
                            {lesson.status === 'cancelled' ? 'Ders İptal Edildi' : 'Planlanmış Ders'}
                        </h2>
                    </div>

                    <h2 className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4">
                        Ders Bilgileri
                    </h2>
                    <div className="flex flex-col gap-px overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-700/50">
                        <label className="flex flex-col bg-card-light dark:bg-card-dark py-3 px-4">
                            <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium leading-normal pb-1">
                                Ders Konusu
                            </p>
                            <select
                                name="subject"
                                defaultValue={lesson.subject}
                                className="form-input w-full min-w-0 flex-1 resize-none overflow-hidden text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-0 border-none bg-transparent p-0 text-base font-normal leading-normal placeholder:text-text-secondary-light dark:placeholder:text-secondary-dark [&>option]:bg-white [&>option]:text-black dark:[&>option]:bg-gray-800 dark:[&>option]:text-white"
                            >
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
                                type="date"
                                defaultValue={lesson.date}
                                className="form-input w-full min-w-0 flex-1 resize-none overflow-hidden text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-0 border-none bg-transparent p-0 text-base font-normal leading-normal placeholder:text-text-secondary-light dark:placeholder:text-secondary-dark"
                            />
                        </label>
                        <div className="flex gap-px">
                            <label className="flex flex-col flex-1 bg-card-light dark:bg-card-dark py-3 px-4">
                                <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium leading-normal pb-1">
                                    Başlangıç
                                </p>
                                <input
                                    name="startTime"
                                    type="time"
                                    defaultValue={start}
                                    className="form-input w-full min-w-0 flex-1 resize-none overflow-hidden text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-0 border-none bg-transparent p-0 text-base font-normal leading-normal placeholder:text-text-secondary-light dark:placeholder:text-secondary-dark"
                                />
                            </label>
                            <label className="flex flex-col flex-1 bg-card-light dark:bg-card-dark py-3 px-4">
                                <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium leading-normal pb-1">
                                    Bitiş
                                </p>
                                <input
                                    name="endTime"
                                    type="time"
                                    defaultValue={end}
                                    className="form-input w-full min-w-0 flex-1 resize-none overflow-hidden text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-0 border-none bg-transparent p-0 text-base font-normal leading-normal placeholder:text-text-secondary-light dark:placeholder:text-secondary-dark"
                                />
                            </label>
                        </div>
                    </div>
                </section>

                {lesson.status !== 'completed' && (
                    <div className="flex flex-col gap-4 mt-8">
                        {lesson.status === 'cancelled' ? (
                            <button
                                type="button"
                                onClick={handleActivateLesson}
                                className="w-full py-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold"
                            >
                                Dersi Aktifleştir
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleCancelLesson}
                                className="w-full py-3 rounded-xl bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 font-bold"
                            >
                                Dersi İptal Et
                            </button>
                        )}
                    </div>
                )}
            </main>
            <footer className="p-4 pt-2 pb-8 sticky bottom-0 bg-background-light dark:bg-background-dark">
                <SubmitButton label="Kaydet" />
            </footer>
        </form>
    );
}
