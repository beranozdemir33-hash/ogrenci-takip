"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { useToast } from "@/context/ToastContext";
import { completeLesson } from "@/app/actions/lessons";

function FinishLessonContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const lessonId = searchParams.get("id");

    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);
    const [homework, setHomework] = useState("");

    const handleFinish = async () => {
        if (!lessonId) {
            showToast("Ders bulunamadı!", "error");
            return;
        }

        setLoading(true);
        try {
            await completeLesson(parseInt(lessonId), homework);
            showToast("Ders başarıyla bitirildi ve ödeme oluşturuldu!", "success");
            router.push("/");
        } catch (error) {
            console.error(error);
            showToast("Bir hata oluştu.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden pb-24">
            <header className="flex items-center justify-between bg-background-light dark:bg-background-dark p-4 pb-2 sticky top-0 z-10">
                <Link href="/" className="text-primary/70 dark:text-primary/80 text-base font-medium leading-normal">
                    İptal
                </Link>
                <h1 className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight tracking-[-0.015em] absolute left-1/2 -translate-x-1/2">
                    Dersi Bitir
                </h1>
                <div className="w-12"></div>
            </header>
            <main className="flex-1 px-4 py-2">
                <section className="mb-6">
                    <h2 className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4">
                        Ders Özeti
                    </h2>
                    <div className="flex flex-col gap-px overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-700/50">
                        <label className="flex flex-col bg-card-light dark:bg-card-dark py-3 px-4">
                            <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium leading-normal pb-1">
                                İşlenen Konu
                            </p>
                            <input
                                className="form-input w-full min-w-0 flex-1 resize-none overflow-hidden text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-0 border-none bg-transparent p-0 text-base font-normal leading-normal placeholder:text-text-secondary-light dark:placeholder:text-secondary-dark"
                                placeholder="Bugün hangi konuyu işlediniz?"
                            />
                        </label>
                        <label className="flex flex-col bg-card-light dark:bg-card-dark py-3 px-4">
                            <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium leading-normal pb-1">
                                Verilen Ödev
                            </p>
                            <textarea
                                value={homework}
                                onChange={(e) => setHomework(e.target.value)}
                                className="form-input w-full min-w-0 flex-1 resize-none overflow-hidden text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-0 border-none bg-transparent p-0 text-base font-normal leading-normal placeholder:text-text-secondary-light dark:placeholder:text-secondary-dark h-24"
                                placeholder="Ödev detaylarını girin..."
                            />
                        </label>
                    </div>
                </section>
            </main>
            <footer className="p-4 pt-2 pb-8 sticky bottom-0 bg-background-light dark:bg-background-dark">
                <button
                    onClick={handleFinish}
                    disabled={loading}
                    className="flex w-full min-w-0 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-4 bg-red-500 text-white text-base font-bold leading-normal text-center shadow-sm transition-transform active:scale-[0.98] disabled:opacity-70"
                >
                    {loading ? "Bitiriliyor..." : "Dersi Bitir"}
                </button>
            </footer>
        </div>
    );
}

export default function FinishLessonPage() {
    return (
        <Suspense fallback={<div className="p-4">Yükleniyor...</div>}>
            <FinishLessonContent />
        </Suspense>
    );
}
