"use client";

import Link from "next/link";
import { useState } from "react";
import { updateStudent, deleteStudent } from "@/app/actions/students";
import { deleteLesson } from "@/app/actions/lessons";
import SubmitButton from "@/components/SubmitButton";
import { Student, Lesson, Payment } from "@/lib/adapter";
import StudentAvatar from "@/components/StudentAvatar";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { formatDate } from "@/lib/date-utils";

export default function StudentEditForm({ student, lessons = [], payments = [] }: { student: Student, lessons?: Lesson[], payments?: Payment[] }) {
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        try {
            await updateStudent(student.id, formData);
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteLesson = async (lessonId: number) => {
        if (confirm("Bu dersi silmek istediğinize emin misiniz?")) {
            await deleteLesson(lessonId);
            // In a real app we might want to update local state or rely on revalidatePath
        }
    };

    const generatePDF = () => {
        const doc = new jsPDF();

        // Use default font (Helvetica) which supports basic latin. 
        // For full Turkish support we would need a custom font file, but avoiding it for now to prevent build errors.
        doc.setFont("helvetica");
        doc.setFontSize(18);
        doc.text(`${student.name} - Öğrenci Raporu`, 14, 22);

        doc.setFontSize(12);
        doc.text(`Tarih: ${formatDate(new Date().toISOString())}`, 14, 30);

        // Lesson History
        doc.text("Ders Geçmişi", 14, 40);
        autoTable(doc, {
            startY: 45,
            head: [['Tarih', 'Ders', 'Durum']],
            body: lessons.map(l => [formatDate(l.date) + ' ' + l.time, l.subject, l.status === 'completed' ? 'Tamamlandı' : 'Planlandı']),
            styles: { font: "helvetica" }
        });

        // Payment History
        const finalY = (doc as any).lastAutoTable.finalY || 45;
        doc.text("Ödeme Geçmişi", 14, finalY + 10);
        autoTable(doc, {
            startY: finalY + 15,
            head: [['Tarih', 'Tutar', 'Durum']],
            body: payments.map(p => [formatDate(p.date), `${p.amount} TL`, p.status === 'completed' ? 'Ödendi' : 'Bekliyor']),
            styles: { font: "helvetica" }
        });

        doc.save(`${student.name.replace(/\s+/g, '_')}_Rapor.pdf`);
    };

    const handleDeleteStudent = async () => {
        if (confirm("Bu öğrenciyi ve tüm kayıtlı verilerini silmek istediğinize emin misiniz? Bu işlem geri alınamaz!")) {
            await deleteStudent(student.id);
            // Redirect is handled in server action but might need client side push if not
        }
    };

    return (
        <form action={handleSubmit} className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden pb-24">
            <header className="flex items-center justify-between bg-background-light dark:bg-background-dark p-4 pb-2 sticky top-0 z-10">
                <Link href={`/students/${student.id}`} className="text-primary/70 dark:text-primary/80 text-base font-medium leading-normal">
                    İptal
                </Link>
                <h1 className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight tracking-[-0.015em] absolute left-1/2 -translate-x-1/2">
                    Öğrenci Düzenle
                </h1>
                <div className="w-12 flex justify-end">
                    <button type="button" onClick={handleDeleteStudent} className="text-red-500">
                        <span className="material-symbols-outlined">delete</span>
                    </button>
                </div>
            </header>
            <main className="flex-1 px-4 py-2">
                <section className="flex flex-col items-center justify-center mb-6 pt-4">
                    <StudentAvatar
                        name={student.name}
                        image={student.image}
                        className="h-24 w-24 mb-4"
                        size="xl"
                    />
                    <label className="cursor-pointer bg-card-light dark:bg-card-dark py-2 px-4 rounded-full text-sm font-medium text-primary border border-border-light dark:border-border-dark hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        Fotoğrafı Değiştir
                        <input name="image" type="file" accept="image/*" className="hidden" />
                    </label>
                </section>

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
                                defaultValue={student.name}
                                placeholder="Öğrencinin adını ve soyadını girin"
                            />
                        </label>
                        <label className="flex flex-col bg-card-light dark:bg-card-dark py-3 px-4 border-t border-border-light dark:border-border-dark">
                            <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium leading-normal pb-1">
                                Ders Ücreti (TL)
                            </p>
                            <input
                                name="price"
                                type="number"
                                placeholder="500"
                                defaultValue={student.price}
                                className="form-input w-full min-w-0 flex-1 resize-none overflow-hidden text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-0 border-none bg-transparent p-0 text-base font-normal leading-normal placeholder:text-text-secondary-light dark:placeholder:text-secondary-dark"
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
                                defaultValue={student.phone}
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
                                defaultValue={student.email}
                                placeholder="ornek@email.com"
                                type="email"
                            />
                        </label>
                    </div>
                </section>

                <section className="mb-6">
                    <div className="flex items-center justify-between pb-2 pt-4">
                        <h2 className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight tracking-[-0.015em]">
                            Ders Geçmişi
                        </h2>
                        <button type="button" onClick={generatePDF} className="text-primary text-sm font-medium flex items-center gap-1">
                            <span className="material-symbols-outlined text-lg">picture_as_pdf</span>
                            Rapor İndir
                        </button>
                    </div>

                    <div className="flex flex-col gap-2">
                        {lessons.length > 0 ? lessons.map((lesson) => (
                            <div key={lesson.id} className="flex items-center justify-between bg-card-light dark:bg-card-dark p-3 rounded-lg border border-border-light dark:border-border-dark">
                                <div>
                                    <p className="text-text-primary-light dark:text-text-primary-dark font-medium">{lesson.subject}</p>
                                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">{formatDate(lesson.date)} - {lesson.time}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleDeleteLesson(lesson.id)}
                                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                                >
                                    <span className="material-symbols-outlined">delete</span>
                                </button>
                            </div>
                        )) : (
                            <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm text-center py-4 bg-card-light dark:bg-card-dark rounded-lg">
                                Henüz ders kaydı yok.
                            </p>
                        )}
                    </div>
                </section>

                <section className="mb-6">
                    <h2 className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4">
                        Ödeme Geçmişi
                    </h2>
                    <div className="flex flex-col gap-2">
                        {payments.length > 0 ? payments.map((payment) => (
                            <div key={payment.id} className="flex items-center justify-between bg-card-light dark:bg-card-dark p-3 rounded-lg border border-border-light dark:border-border-dark">
                                <div>
                                    <p className="text-text-primary-light dark:text-text-primary-dark font-medium">{payment.amount} TL</p>
                                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">{formatDate(payment.date)} - {payment.subject || 'Ödeme'}</p>
                                </div>
                                <span className={`text-sm px-2 py-1 rounded ${payment.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                                    {payment.status === 'completed' ? 'Ödendi' : 'Bekliyor'}
                                </span>
                            </div>
                        )) : (
                            <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm text-center py-4 bg-card-light dark:bg-card-dark rounded-lg">
                                Henüz ödeme kaydı yok.
                            </p>
                        )}
                    </div>
                </section>
            </main>
            <footer className="p-4 pt-2 pb-8 sticky bottom-0 bg-background-light dark:bg-background-dark">
                <SubmitButton />
            </footer>
            <div className="h-12 w-full flex items-center justify-center pb-4">
                <button type="button" onClick={handleDeleteStudent} className="text-red-500 text-sm font-semibold hover:underline">
                    Öğrenciyi Sil
                </button>
            </div>
        </form>
    );
}
