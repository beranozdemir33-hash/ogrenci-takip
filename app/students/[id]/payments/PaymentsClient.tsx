"use client";

import Link from "next/link";
import { useRef } from "react";
import clsx from "clsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { formatDate } from "@/lib/date-utils";
import { Payment } from "@/lib/adapter";

interface PaymentsClientProps {
    studentId: number;
    studentName: string;
    payments: Payment[];
}

export default function PaymentsClient({ studentId, studentName, payments }: PaymentsClientProps) {
    const reportRef = useRef<HTMLDivElement>(null);

    const getStatusLabel = (status: string) => {
        switch (status) {
            case "completed": return { text: "Ödendi", color: "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400" };
            case "paid": return { text: "Ödendi", color: "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400" };
            case "pending": return { text: "Bekliyor", color: "text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400" };
            case "overdue": return { text: "Gecikmiş", color: "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400" };
            default: return { text: "-", color: "text-gray-600 bg-gray-100" };
        }
    };

    const downloadPDF = async () => {
        if (!reportRef.current) return;

        const canvas = await html2canvas(reportRef.current, {
            scale: 2,
            backgroundColor: "#ffffff"
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save(`odeme_gecmisi_${studentName.replace(/\s+/g, '_')}.pdf`);
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden pb-24">

            {/* Hidden Report Template */}
            <div className="fixed top-0 left-0 w-[595px] -z-50 opacity-0 pointer-events-none">
                <div ref={reportRef} className="w-[595px] min-h-[842px] bg-white p-8 text-black font-sans">
                    <div className="flex items-center justify-between border-b-2 border-gray-800 pb-4 mb-8">
                        <div>
                            <h1 className="text-2xl font-bold uppercase tracking-wide text-gray-900">BeranApp</h1>
                            <p className="text-sm text-gray-500">Öğrenci Takip Sistemi</p>
                        </div>
                        <div className="text-right">
                            <h2 className="text-xl font-bold text-gray-800">ÖDEME GEÇMİŞİ RAPORU</h2>
                            <p className="text-sm text-gray-600">{new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Öğrenci Bilgileri</h3>
                        <div className="flex gap-4 text-sm text-gray-700">
                            <p><span className="font-semibold">Öğrenci Adı:</span> {studentName}</p>
                        </div>
                    </div>

                    <table className="w-full text-left text-sm border-collapse">
                        <thead>
                            <tr className="bg-gray-100 border-b-2 border-gray-300">
                                <th className="p-3 font-bold text-gray-700">Tarih</th>
                                <th className="p-3 font-bold text-gray-700">Açıklama</th>
                                <th className="p-3 font-bold text-gray-700 text-right">Tutar</th>
                                <th className="p-3 font-bold text-gray-700 text-center">Durum</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, i) => (
                                <tr key={payment.id} className={clsx("border-b border-gray-200", i % 2 === 0 ? "bg-white" : "bg-gray-50")}>
                                    <td className="p-3 text-gray-800">{formatDate(payment.date)}</td>
                                    <td className="p-3 text-gray-800">{payment.subject}</td>
                                    <td className="p-3 text-right font-semibold text-gray-800">₺{payment.amount.toLocaleString('tr-TR')}</td>
                                    <td className="p-3 text-center">
                                        <span className={clsx("inline-block px-2 py-1 rounded text-xs font-bold",
                                            payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                payment.status === 'pending' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800')}>
                                            {getStatusLabel(payment.status).text}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="mt-12 pt-4 border-t border-gray-200 text-center text-xs text-gray-400">
                        Bu rapor BeranApp tarafından otomatik olarak oluşturulmuştur.
                    </div>
                </div>
            </div>

            <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border-light dark:border-border-dark bg-background-light/80 dark:bg-background-dark/80 p-4 pb-3 backdrop-blur-sm">
                <Link href={`/students/${studentId}`} className="flex size-8 shrink-0 items-center justify-start">
                    <span className="material-symbols-outlined text-primary">arrow_back_ios_new</span>
                </Link>
                <h1 className="flex-1 text-center text-lg font-bold leading-tight tracking-tight text-text-primary-light dark:text-text-primary-dark">
                    Ödeme Geçmişi
                </h1>
                <div className="flex w-8 items-center justify-end">
                    <button onClick={downloadPDF} className="text-primary hover:bg-primary/10 rounded-full p-1">
                        <span className="material-symbols-outlined">download</span>
                    </button>
                </div>
            </header>
            <main className="flex-1 p-4">
                <div className="overflow-hidden rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-text-secondary-light dark:text-text-secondary-dark">
                            <thead className="bg-gray-50 dark:bg-gray-800 text-xs uppercase text-text-secondary-light dark:text-text-secondary-dark">
                                <tr>
                                    <th scope="col" className="px-4 py-3 font-medium">Tarih</th>
                                    <th scope="col" className="px-4 py-3 font-medium">Açıklama</th>
                                    <th scope="col" className="px-4 py-3 font-medium text-right">Tutar</th>
                                    <th scope="col" className="px-4 py-3 font-medium text-center">Durum</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-light dark:divide-border-dark">
                                {payments.map((payment) => {
                                    const status = getStatusLabel(payment.status);
                                    return (
                                        <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                            <td className="px-4 py-3 font-medium text-text-primary-light dark:text-text-primary-dark whitespace-nowrap">
                                                {formatDate(payment.date)}
                                            </td>
                                            <td className="px-4 py-3 text-text-primary-light dark:text-text-primary-dark">
                                                {payment.subject}
                                            </td>
                                            <td className="px-4 py-3 text-right font-medium text-text-primary-light dark:text-text-primary-dark">
                                                ₺{payment.amount.toLocaleString('tr-TR')}
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <span className={clsx("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", status.color)}>
                                                    {status.text}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
