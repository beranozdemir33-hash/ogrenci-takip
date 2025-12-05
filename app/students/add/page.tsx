"use client";

import Link from "next/link";
import { createStudent } from "@/app/actions/students";
import SubmitButton from "@/components/SubmitButton";

export default function AddStudentPage() {

    async function handleSubmit(formData: FormData) {
        await createStudent(formData);
    }

    return (
        <form action={handleSubmit} className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden pb-24">
            <header className="flex items-center justify-between bg-background-light dark:bg-background-dark p-4 pb-2 sticky top-0 z-10">
                <Link href="/students" className="text-primary/70 dark:text-primary/80 text-base font-medium leading-normal">
                    İptal
                </Link>
                <h1 className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight tracking-[-0.015em] absolute left-1/2 -translate-x-1/2">
                    Öğrenci Ekle
                </h1>
                <div className="w-12"></div>
            </header>
            <main className="flex-1 px-4 py-2">
                <section className="mb-6">
                    <h2 className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4">
                        Öğrenci Bilgileri
                    </h2>
                    <div className="flex flex-col gap-px overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-700/50">
                        <label className="flex flex-col bg-card-light dark:bg-card-dark py-3 px-4">
                            <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium leading-normal pb-1">
                                Ad Soyad
                            </p>
                            <input
                                name="name"
                                required
                                className="form-input w-full min-w-0 flex-1 resize-none overflow-hidden text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-0 border-none bg-transparent p-0 text-base font-normal leading-normal placeholder:text-text-secondary-light dark:placeholder:text-secondary-dark"
                                placeholder="Öğrencinin adını ve soyadını girin"
                            />
                        </label>
                        <label className="flex flex-col bg-card-light dark:bg-card-dark py-3 px-4 border-t border-border-light dark:border-border-dark">
                            <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium leading-normal pb-1">
                                Profil Fotoğrafı
                            </p>
                            <input
                                name="image"
                                type="file"
                                accept="image/*"
                                className="w-full text-sm text-text-primary-light dark:text-text-primary-dark file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
                            />
                        </label>
                    </div>
                </section>
                <section className="mb-6">
                    <h2 className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4">
                        İletişim Bilgileri
                    </h2>
                    <div className="flex flex-col gap-px overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-700/50">
                        <label className="flex flex-col bg-card-light dark:bg-card-dark py-3 px-4">
                            <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium leading-normal pb-1">
                                Telefon Numarası
                            </p>
                            <input
                                name="phone"
                                className="form-input w-full min-w-0 flex-1 resize-none overflow-hidden text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-0 border-none bg-transparent p-0 text-base font-normal leading-normal placeholder:text-text-secondary-light dark:placeholder:text-secondary-dark"
                                placeholder="05XX XXX XX XX"
                                type="tel"
                            />
                        </label>
                        <label className="flex flex-col bg-card-light dark:bg-card-dark py-3 px-4">
                            <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium leading-normal pb-1">
                                E-posta Adresi
                            </p>
                            <input
                                name="email"
                                className="form-input w-full min-w-0 flex-1 resize-none overflow-hidden text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-0 border-none bg-transparent p-0 text-base font-normal leading-normal placeholder:text-text-secondary-light dark:placeholder:text-secondary-dark"
                                placeholder="ornek@email.com"
                                type="email"
                            />
                        </label>
                    </div>
                </section>
                <section className="mb-8">
                    <h2 className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4">
                        Ders Detayları
                    </h2>
                    <div className="flex flex-col gap-px overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-700/50">
                        <label className="flex flex-col bg-card-light dark:bg-card-dark py-3 px-4">
                            <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium leading-normal pb-1">
                                Ders Ücreti (TL)
                            </p>
                            <input
                                name="price"
                                type="number"
                                placeholder="500"
                                className="form-input w-full min-w-0 flex-1 resize-none overflow-hidden text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-0 border-none bg-transparent p-0 text-base font-normal leading-normal placeholder:text-text-secondary-light dark:placeholder:text-secondary-dark"
                            />
                        </label>
                        <div className="flex items-center justify-between bg-card-light dark:bg-card-dark py-3 px-4 border-t border-border-light dark:border-border-dark">
                            <p className="text-text-secondary-light dark:text-text-secondary-dark text-base font-medium leading-normal">
                                Alınan Dersler
                            </p>
                            <select
                                name="lesson"
                                className="bg-transparent text-text-primary-light dark:text-text-primary-dark text-base font-normal focus:outline-none text-right dir-rtl [&>option]:bg-white [&>option]:text-black dark:[&>option]:bg-gray-800 dark:[&>option]:text-white"
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
                        </div>
                    </div>
                </section>
            </main>
            <footer className="p-4 pt-2 pb-8 sticky bottom-0 bg-background-light dark:bg-background-dark">
                <SubmitButton />
            </footer>
        </form >
    );
}
