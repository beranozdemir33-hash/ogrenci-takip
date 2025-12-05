"use client";

import Link from "next/link"; // Ensure Link is imported if used (it's not used in current code but safe to keep/add if needed)
// Actually original code kept imports.
import BottomNav from "@/components/BottomNav";
import clsx from "clsx";
import { useState } from "react";
import { Lesson } from "@/lib/adapter";
import StudentAvatar from "@/components/StudentAvatar";

// Helper to match mock data structure or use Lesson directly
// The UI uses 'image', 'color'. My DB Lesson doesn't have them.
// I will map them inside the component.

export default function CalendarView({ initialLessons }: { initialLessons: Lesson[] }) {

    // Start with current date
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [view, setView] = useState<'Month' | 'Week'>('Month');

    const weekDays = ["P", "S", "Ç", "P", "C", "C", "P"];
    const months = [
        "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
        "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
    ];

    const formatDateKey = (date: Date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Month View Helpers
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const startPadding = (firstDayOfMonth + 6) % 7;
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // Week View Helpers
    const getWeekRange = (date: Date) => {
        const currentDay = date.getDay(); // 0 = Sunday
        const diffToMonday = (currentDay === 0 ? -6 : 1) - currentDay;

        const monday = new Date(date);
        monday.setDate(date.getDate() + diffToMonday);

        const weekDates = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(monday);
            d.setDate(monday.getDate() + i);
            weekDates.push(d);
        }
        return weekDates;
    };

    const currentWeekDates = getWeekRange(currentDate);

    // Navigation Handlers
    const prev = () => {
        if (view === 'Month') {
            setCurrentDate(new Date(year, month - 1, 1));
        } else {
            const newDate = new Date(currentDate);
            newDate.setDate(newDate.getDate() - 7);
            setCurrentDate(newDate);
        }
    };

    const next = () => {
        if (view === 'Month') {
            setCurrentDate(new Date(year, month + 1, 1));
        } else {
            const newDate = new Date(currentDate);
            newDate.setDate(newDate.getDate() + 7);
            setCurrentDate(newDate);
        }
    };

    const handleDayClick = (dayOrDate: number | Date) => {
        if (typeof dayOrDate === 'number') {
            setSelectedDate(new Date(year, month, dayOrDate));
        } else {
            setSelectedDate(dayOrDate);
        }
    };

    const selectedDateKey = formatDateKey(selectedDate);

    // Enrich lessons with UI properties (image, color) if missing
    const enrichedLessons = initialLessons.map(l => ({
        ...l,
        image: "", // Default empty to trigger initials
        color: "bg-primary",
        cancelled: l.status === 'cancelled'
    }));

    const filteredLessons = enrichedLessons.filter(l => l.date === selectedDateKey);

    const activeDays = new Set(enrichedLessons.map(l => l.date));

    const getHeaderText = () => {
        if (view === 'Month') {
            return `${months[month]} ${year}`;
        } else {
            const start = currentWeekDates[0];
            const end = currentWeekDates[6];
            const startMonth = months[start.getMonth()];
            const endMonth = months[end.getMonth()];

            if (start.getMonth() === end.getMonth()) {
                return `${start.getDate()} - ${end.getDate()} ${startMonth}`;
            } else {
                return `${start.getDate()} ${startMonth} - ${end.getDate()} ${endMonth}`;
            }
        }
    };

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden pb-24">
            <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10">
                <div className="flex size-12 shrink-0 items-center justify-start"></div>
                <h2 className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
                    Ders Takvimi
                </h2>
                <div className="flex w-12 items-center justify-end">
                    <Link href="/lessons/add" className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-transparent text-text-primary-light dark:text-text-primary-dark gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0">
                        <span className="material-symbols-outlined text-3xl">add_circle</span>
                    </Link>
                </div>
            </div>

            <div className="flex px-4 py-3">
                <div className="flex h-10 flex-1 items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-800 p-1">
                    <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-white has-[:checked]:dark:bg-gray-700 has-[:checked]:shadow-[0_1px_3px_rgba(0,0,0,0.1)] has-[:checked]:text-text-primary-light has-[:checked]:dark:text-text-primary-dark text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium leading-normal">
                        <span className="truncate">Ay</span>
                        <input
                            checked={view === 'Month'}
                            onChange={() => setView('Month')}
                            className="invisible w-0"
                            name="view-toggle"
                            type="radio"
                        />
                    </label>
                    <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-white has-[:checked]:dark:bg-gray-700 has-[:checked]:shadow-[0_1px_3px_rgba(0,0,0,0.1)] has-[:checked]:text-text-primary-light has-[:checked]:dark:text-text-primary-dark text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium leading-normal">
                        <span className="truncate">Hafta</span>
                        <input
                            checked={view === 'Week'}
                            onChange={() => setView('Week')}
                            className="invisible w-0"
                            name="view-toggle"
                            type="radio"
                        />
                    </label>
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 p-4">
                <div className="flex min-w-72 max-w-[336px] flex-1 flex-col gap-0.5">
                    <div className="flex items-center p-1 justify-between">
                        <button onClick={prev} className="text-text-primary-light dark:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-1">
                            <span className="material-symbols-outlined flex size-8 items-center justify-center text-lg">
                                chevron_left
                            </span>
                        </button>
                        <p className="text-text-primary-light dark:text-text-primary-dark text-base font-bold leading-tight flex-1 text-center">
                            {getHeaderText()}
                        </p>
                        <button onClick={next} className="text-text-primary-light dark:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-1">
                            <span className="material-symbols-outlined flex size-8 items-center justify-center text-lg">
                                chevron_right
                            </span>
                        </button>
                    </div>
                    <div className="grid grid-cols-7">
                        {weekDays.map((day, index) => (
                            <p
                                key={index}
                                className="text-text-secondary-light dark:text-text-secondary-dark text-[13px] font-bold leading-normal tracking-[0.015em] flex h-12 w-full items-center justify-center pb-0.5"
                            >
                                {day}
                            </p>
                        ))}

                        {view === 'Month' ? (
                            <>
                                {Array.from({ length: startPadding }).map((_, i) => (
                                    <div key={`empty-${i}`} className="col-span-1"></div>
                                ))}
                                {days.map((day) => {
                                    const isSelected =
                                        day === selectedDate.getDate() &&
                                        month === selectedDate.getMonth() &&
                                        year === selectedDate.getFullYear();

                                    const dateKey = formatDateKey(new Date(year, month, day));
                                    const hasLesson = activeDays.has(dateKey);

                                    return (
                                        <button
                                            key={day}
                                            onClick={() => handleDayClick(day)}
                                            className={clsx(
                                                "h-12 w-full text-sm font-medium leading-normal relative rounded-full transition-colors",
                                                isSelected
                                                    ? "text-white"
                                                    : "text-text-primary-light dark:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-800"
                                            )}
                                        >
                                            <div className={clsx(
                                                "flex size-full items-center justify-center rounded-full",
                                                isSelected && "bg-primary shadow-lg"
                                            )}>
                                                {day}
                                            </div>
                                            {hasLesson && !isSelected && (
                                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary"></div>
                                            )}
                                        </button>
                                    )
                                })}
                            </>
                        ) : (
                            currentWeekDates.map((date) => {
                                const isSelected = formatDateKey(date) === formatDateKey(selectedDate);
                                const hasLesson = activeDays.has(formatDateKey(date));

                                return (
                                    <button
                                        key={date.toISOString()}
                                        onClick={() => handleDayClick(date)}
                                        className={clsx(
                                            "h-12 w-full text-sm font-medium leading-normal relative rounded-full transition-colors",
                                            isSelected
                                                ? "text-white"
                                                : "text-text-primary-light dark:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-800"
                                        )}
                                    >
                                        <div className={clsx(
                                            "flex size-full items-center justify-center rounded-full",
                                            isSelected && "bg-primary shadow-lg"
                                        )}>
                                            {date.getDate()}
                                        </div>
                                        {hasLesson && !isSelected && (
                                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary"></div>
                                        )}
                                    </button>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>

            <h3 className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
                {selectedDate.getDate()} {months[selectedDate.getMonth()]}, {
                    ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"][selectedDate.getDay()]
                }
            </h3>

            <div className="flex flex-col gap-2 px-4 pb-4">
                {filteredLessons.length > 0 ? (
                    filteredLessons.map((lesson) => (
                        <Link href={`/lessons/${lesson.id}/edit`} key={lesson.id} className="flex items-center gap-4 bg-card-light dark:bg-card-dark rounded-lg p-3 min-h-[72px] justify-between shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                            <div className={clsx("flex items-center gap-4", lesson.cancelled && "opacity-60")}>
                                <div className="flex items-center justify-center shrink-0 size-12 relative">
                                    <div className={clsx("absolute top-1 left-1 h-2 w-2 rounded-full z-10", lesson.color)}></div>
                                    <StudentAvatar
                                        name={(lesson as any).studentName || lesson.teacher || "Öğrenci"}
                                        image={lesson.image}
                                        className="h-12 w-12"
                                        size="lg"
                                    />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <p className={clsx("text-text-primary-light dark:text-text-primary-dark text-base font-medium leading-normal line-clamp-1", lesson.cancelled && "line-through")}>
                                        {lesson.time} - {(lesson as any).studentName || lesson.teacher || "Öğrenci"}
                                    </p>
                                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-normal leading-normal line-clamp-2">
                                        {lesson.subject}
                                    </p>
                                </div>
                            </div>
                            <div className="shrink-0">
                                {lesson.status === 'scheduled' && (
                                    <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark">edit</span>
                                )}
                                {lesson.status === 'completed' && (
                                    <span className="material-symbols-outlined text-green-500">check_circle</span>
                                )}
                                {lesson.status === 'cancelled' && (
                                    <span className="material-symbols-outlined text-red-500">cancel</span>
                                )}
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-text-secondary-light dark:text-text-secondary-dark">
                        <span className="material-symbols-outlined text-4xl mb-2 opacity-50">event_busy</span>
                        <p>Bu tarihte ders bulunmuyor.</p>
                    </div>
                )}
            </div>
            <BottomNav />
        </div>
    );
}
