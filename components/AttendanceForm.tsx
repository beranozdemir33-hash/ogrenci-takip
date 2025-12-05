"use client";

import { useState } from "react";
import clsx from "clsx";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";
import StudentAvatar from "@/components/StudentAvatar";
import { Student } from "@/lib/adapter";
import Link from "next/link";
import { formatDate } from "@/lib/date-utils";

interface AttendanceFormProps {
    students: Student[];
    lesson: any; // Using any for now to avoid strict type issues with missing Lesson import
}

export default function AttendanceForm({ students: initialStudents, lesson }: AttendanceFormProps) {
    const router = useRouter();
    const { showToast } = useToast();
    const [studentStatuses, setStudentStatuses] = useState<Record<number, string>>(
        initialStudents.reduce((acc, s) => ({ ...acc, [s.id]: 'present' }), {})
    );

    const handleStatusChange = (id: number, status: string) => {
        setStudentStatuses(prev => ({ ...prev, [id]: status }));
    };

    const handleSave = async () => {
        // Simulate API call
        // In a real app we'd call a server action here to save attendance
        await new Promise(resolve => setTimeout(resolve, 500));
        showToast("Yoklama başarıyla kaydedildi!", "success");
        // Pass lessonId to query params so dashboard knows which lesson is active
        router.push(`/?lessonStarted=true&lessonId=${lesson.id}`);
    };

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden">
            <div className="sticky top-0 z-10 flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between border-b border-border-light dark:border-border-dark">
                <Link href="/" className="flex size-12 shrink-0 items-center justify-start text-text-primary-light dark:text-text-primary-dark">
                    <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
                </Link>
                <h2 className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
                    Yoklama Alma
                </h2>
                <div className="w-12 shrink-0"></div>
            </div>
            <div className="px-4 pt-6 pb-3 bg-background-light dark:bg-background-dark">
                <h1 className="text-text-primary-light dark:text-text-primary-dark tracking-tight text-[32px] font-bold leading-tight text-left">
                    {lesson ? lesson.subject : "Ders Seçilmedi"}
                </h1>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-base font-normal leading-normal pt-1">
                    {lesson ? `${formatDate(lesson.date)}, ${lesson.time}` : formatDate(new Date().toISOString())}
                </p>
            </div>
            <div className="flex flex-col gap-px pb-32">
                {initialStudents.map((student) => (
                    <div key={student.id} className="flex flex-col gap-2 bg-card-light dark:bg-card-dark p-4 border-b border-border-light dark:border-border-dark last:border-0">
                        <div className="flex items-center gap-4 justify-between">
                            <div className="flex items-center gap-4">
                                <StudentAvatar
                                    name={student.name}
                                    image={student.image}
                                    className="h-10 w-10"
                                    size="md"
                                />
                                <p className="text-text-primary-light dark:text-text-primary-dark text-base font-medium leading-normal flex-1 truncate">
                                    {student.name}
                                </p>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex h-10 flex-1 items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-800 p-1">
                                {['present', 'absent'].map((status) => {
                                    const labels: Record<string, string> = { present: 'Geldi', absent: 'Gelmedi' };
                                    const isSelected = studentStatuses[student.id] === status;
                                    return (
                                        <button
                                            key={status}
                                            onClick={() => handleStatusChange(student.id, status)}
                                            className={clsx(
                                                "flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 text-sm font-medium leading-normal transition-all",
                                                isSelected
                                                    ? "bg-white dark:bg-gray-700 shadow-[0_1px_3px_rgba(0,0,0,0.1)] text-text-primary-light dark:text-text-primary-dark"
                                                    : "text-text-secondary-light dark:text-text-secondary-dark"
                                            )}
                                        >
                                            <span className="truncate">{labels[status]}</span>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent">
                <button
                    onClick={handleSave}
                    className="flex h-12 w-full items-center justify-center rounded-xl bg-primary px-6 text-base font-bold text-black shadow-lg hover:brightness-95 active:scale-95 transition-all"
                >
                    Yoklamayı Bitir
                </button>
            </div>
        </div>
    );
}
