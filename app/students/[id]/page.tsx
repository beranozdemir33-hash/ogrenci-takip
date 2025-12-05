import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import StudentAvatar from "@/components/StudentAvatar";
import { getStudentById } from "@/app/actions/students";
import { getLessonsByStudent } from "@/app/actions/lessons";
import { getPaymentsByStudent } from "@/app/actions/payments";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/date-utils";

export default async function StudentProfilePage({ params }: { params: { id: string } }) {
    const studentId = parseInt(params.id);
    const student = await getStudentById(studentId);

    if (!student) {
        notFound();
    }

    const lessons = await getLessonsByStudent(studentId);
    const payments = await getPaymentsByStudent(studentId);

    // Sort lessons by date descending
    const sortedLessons = [...lessons].sort((a, b) => b.date.localeCompare(a.date));

    // Sort payments by date descending
    const sortedPayments = [...payments].sort((a, b) => b.date.localeCompare(a.date));

    // Calculate balance (Mock calculation for now as we don't have fee structure per student yet)
    // Assuming mock fee for now or 0
    const pendingBalance = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden pb-24">
            <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border-light dark:border-border-dark bg-background-light/80 dark:bg-background-dark/80 p-4 pb-3 backdrop-blur-sm">
                <Link href="/students" className="flex size-8 shrink-0 items-center justify-start">
                    <span className="material-symbols-outlined text-primary">arrow_back_ios_new</span>
                </Link>
                <h1 className="flex-1 text-center text-lg font-bold leading-tight tracking-tight text-text-primary-light dark:text-text-primary-dark">
                    Öğrenci Profili
                </h1>
                <div className="flex w-8 items-center justify-end">
                    <Link href={`/students/${params.id}/edit`} className="shrink-0 text-base font-semibold leading-normal text-primary">Düzenle</Link>
                </div>
            </header>
            <main className="flex-1 space-y-6 p-4">
                <section className="flex w-full flex-col items-center gap-4">
                    <StudentAvatar
                        name={student.name}
                        image={student.image}
                        className="h-32 w-32"
                        size="xl"
                    />
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-[22px] font-bold leading-tight tracking-tight text-text-primary-light dark:text-text-primary-dark">
                            {student.name}
                        </p>
                        <p className="text-base font-normal leading-normal text-text-secondary-light dark:text-text-secondary-dark">
                            {student.grade || "Ders Seçilmedi"}
                        </p>
                    </div>
                </section>
                <div className="grid grid-cols-1 gap-4">
                    <div className="flex flex-col gap-1 rounded-xl bg-card-light dark:bg-card-dark p-4 shadow-sm">
                        <div className="flex justify-between items-center">
                            <p className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">Bekleyen Ödeme</p>
                        </div>
                        <p className="text-base font-bold text-orange-500">₺{pendingBalance.toLocaleString('tr-TR')}</p>
                    </div>
                </div>
                <div className="overflow-hidden rounded-xl bg-card-light dark:bg-card-dark shadow-sm">
                    <h3 className="px-4 pb-2 pt-4 text-lg font-bold leading-tight tracking-tight text-text-primary-light dark:text-text-primary-dark">
                        İletişim Bilgileri
                    </h3>
                    <div className="divide-y divide-border-light dark:divide-border-dark">
                        <div className="flex min-h-14 items-center gap-4 px-4 py-2">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <span className="material-symbols-outlined">call</span>
                            </div>
                            <p className="flex-1 truncate text-base font-normal leading-normal text-text-primary-light dark:text-text-primary-dark">
                                {student.phone || "Telefon yok"}
                            </p>
                        </div>
                        <div className="flex min-h-14 items-center gap-4 px-4 py-2">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <span className="material-symbols-outlined">mail</span>
                            </div>
                            <p className="flex-1 truncate text-base font-normal leading-normal text-text-primary-light dark:text-text-primary-dark">
                                {student.email || "E-posta yok"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Lesson History */}
                <div className="overflow-hidden rounded-xl bg-card-light dark:bg-card-dark shadow-sm">
                    <div className="flex items-center justify-between px-4 pb-2 pt-4">
                        <h3 className="text-lg font-bold leading-tight tracking-tight text-text-primary-light dark:text-text-primary-dark">
                            Ders Geçmişi
                        </h3>
                        <Link href={`/students/${params.id}/history`} className="text-base font-semibold text-primary">Tümünü Gör</Link>
                    </div>
                    <div className="divide-y divide-border-light dark:divide-border-dark">
                        {sortedLessons.slice(0, 3).map((lesson, index) => (
                            <div key={lesson.id} className="flex items-center justify-between gap-4 px-4 py-3">
                                <div className="flex flex-col">
                                    <p className="text-base font-semibold leading-normal text-text-primary-light dark:text-text-primary-dark">
                                        {lesson.subject}
                                    </p>
                                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                        {formatDate(lesson.date)}
                                    </p>
                                </div>
                                <div className={`flex items-center gap-2 rounded-full px-3 py-1 ${lesson.status === 'completed' ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                                    <div className={`size-2 rounded-full ${lesson.status === 'completed' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                    <p className={`text-sm font-medium ${lesson.status === 'completed' ? 'text-green-500' : 'text-red-500'}`}>
                                        {lesson.status === 'completed' ? 'Tamamlandı' : 'Planlandı'}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {sortedLessons.length === 0 && (
                            <div className="p-4 text-center text-text-secondary-light dark:text-text-secondary-dark">
                                Henüz ders kaydı yok.
                            </div>
                        )}
                    </div>
                </div>

                {/* Payment History */}
                <div className="overflow-hidden rounded-xl bg-card-light dark:bg-card-dark shadow-sm">
                    <div className="flex items-center justify-between px-4 pb-2 pt-4">
                        <h3 className="text-lg font-bold leading-tight tracking-tight text-text-primary-light dark:text-text-primary-dark">
                            Ödeme Geçmişi
                        </h3>
                        <Link href={`/students/${params.id}/payments`} className="text-base font-semibold text-primary">Tümünü Gör</Link>
                    </div>
                    <div className="divide-y divide-border-light dark:divide-border-dark">
                        {sortedPayments.slice(0, 3).map((payment, index) => (
                            <div key={payment.id} className="flex items-center justify-between gap-4 px-4 py-3">
                                <div className="flex flex-col">
                                    <p className="text-base font-semibold leading-normal text-text-primary-light dark:text-text-primary-dark">
                                        {payment.subject}
                                    </p>
                                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                        {formatDate(payment.date)}
                                    </p>
                                </div>
                                <div className="flex flex-col items-end">
                                    <p className="text-base font-bold text-text-primary-light dark:text-text-primary-dark">
                                        ₺{payment.amount.toLocaleString('tr-TR')}
                                    </p>
                                    <p className={`text-xs font-medium ${payment.status === 'completed' ? 'text-green-500' : 'text-orange-500'}`}>
                                        {payment.status === 'completed' ? 'Ödendi' : 'Bekliyor'}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {sortedPayments.length === 0 && (
                            <div className="p-4 text-center text-text-secondary-light dark:text-text-secondary-dark">
                                Henüz ödeme kaydı yok.
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <BottomNav />
        </div>
    );
}
