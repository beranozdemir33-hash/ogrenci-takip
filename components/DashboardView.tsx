"use client";

import BottomNav from "@/components/BottomNav";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import StudentAvatar from "@/components/StudentAvatar";
import { Lesson } from "@/lib/adapter";

export default function DashboardView({ dailyLessons, totalStudents }: { dailyLessons: Lesson[], totalStudents: number }) {
  const searchParams = useSearchParams();
  const lessonStarted = searchParams.get("lessonStarted") === "true";
  const activeLessonId = searchParams.get("lessonId");

  // Sort lessons by time
  const sortedLessons = [...dailyLessons].sort((a, b) => a.time.localeCompare(b.time));

  // Find the next scheduled lesson
  // Logic: First 'scheduled' lesson in the list. 
  // If a lesson is active, it might still show up here if we don't filter it out, but usually 'scheduled' implies not started.
  // Actually, if a lesson is 'scheduled' but it's past time, it's still the next one to deal with until marked done.
  const nextLesson = sortedLessons.find(l => l.status === 'scheduled');

  const isLessonStartable = (lesson: Lesson) => {
    const now = new Date();

    // Parse lesson date (YYYY-MM-DD)
    const [y, m, d] = lesson.date.split('-').map(Number);

    // Parse lesson time (HH:MM)
    const startTime = lesson.time.split(' - ')[0];
    const [hours, minutes] = startTime.split(':').map(Number);

    const lessonDate = new Date(y, m - 1, d, hours, minutes);

    const diffInMinutes = (lessonDate.getTime() - now.getTime()) / (1000 * 60);

    // Allow start if within 15 mins before or anytime after (until completed)
    return diffInMinutes <= 15;
  };

  // ... inside render ...
  // isLessonStartable(nextLesson) ? ...
  // isLessonStartable(lesson) ? ...

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden pb-24">
      <div className="sticky top-0 z-10 flex items-center bg-background-light/80 dark:bg-background-dark/80 p-4 pb-2 justify-between backdrop-blur-sm">
        <div className="flex size-12 shrink-0 items-center">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA3VTwJzz0W9D0BlW2Lli7uK5lNXclb8jTsQvuW48n9qDnMiOOjtpKd-aWOnmaSh-NPte3gghX6QRTzG9hmg6o7hFzFNw7j-R4ow0EbAdjQkA7o0oQlBdGB5iL48yYOkkv6KZoyO9Mwiq36cx1bNt53S9wEOfucs54F91lGNICH-4LrDVWAryB7iUsT9dI8_aSw_rvVn9UdaBDfItJSMPfJHfIul43K3aJQhhgL2Yt4IbWM5NeV5Clfoxqxv_LreQ4oVqFMYhvgD2o")',
            }}
          ></div>
        </div>
        <h2 className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
          Ana Sayfa
        </h2>
        <div className="flex w-12 items-center justify-end">
          <Link href="/students/add" className="flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-9 w-9 bg-transparent text-text-primary-light dark:text-text-primary-dark">
            <span className="material-symbols-outlined text-2xl">add_circle</span>
          </Link>
        </div>
      </div>
      <h1 className="text-text-primary-light dark:text-text-primary-dark tracking-tight text-[32px] font-bold leading-tight px-4 text-left pb-3 pt-4">
        Günaydın, Hocam
      </h1>
      <div className="flex flex-wrap gap-4 p-4">
        <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg bg-card-light dark:bg-card-dark p-4 shadow-sm">
          <p className="text-text-secondary-light dark:text-text-secondary-dark text-base font-medium leading-normal">
            Bugünkü Ders
          </p>
          <p className="text-text-primary-light dark:text-text-primary-dark tracking-light text-3xl font-bold leading-tight">
            {dailyLessons.length}
          </p>
        </div>
        <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg bg-card-light dark:bg-card-dark p-4 shadow-sm">
          <p className="text-text-secondary-light dark:text-text-secondary-dark text-base font-medium leading-normal">
            Toplam Öğrenci
          </p>
          <p className="text-text-primary-light dark:text-text-primary-dark tracking-light text-3xl font-bold leading-tight">
            {totalStudents}
          </p>
        </div>
      </div>

      {nextLesson ? (
        <div className="px-4 py-3">
          <div className="flex flex-col gap-4 rounded-xl bg-primary/10 dark:bg-primary/20 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                  <span className="material-symbols-outlined text-sm">school</span>
                </div>
                <p className="text-base font-bold text-primary dark:text-blue-300">
                  Şimdi Sırada
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-1 py-2">
              <p className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark text-center">
                {(nextLesson as any).studentName || "Öğrenci"} - {nextLesson.subject}
              </p>
              <p className="text-base text-text-secondary-light dark:text-text-secondary-dark font-medium">
                {nextLesson.time}
              </p>
            </div>
            {lessonStarted && activeLessonId ? (
              <Link href={`/attendance/finish?id=${activeLessonId}`} className="mt-2 flex w-full items-center justify-center rounded-lg bg-red-500 py-3 text-base font-bold text-white transition-opacity hover:opacity-90">
                Dersi Bitir
              </Link>
            ) : (
              isLessonStartable(nextLesson) ? (
                <Link href={`/attendance?id=${nextLesson.id}`} className="mt-2 flex w-full items-center justify-center rounded-lg bg-primary py-3 text-base font-bold text-white transition-opacity hover:opacity-90">
                  Dersi Başlat
                </Link>
              ) : (
                <button disabled className="mt-2 flex w-full items-center justify-center rounded-lg bg-gray-300 dark:bg-gray-700 py-3 text-base font-bold text-text-secondary-light dark:text-text-secondary-dark cursor-not-allowed opacity-70">
                  Ders Saatine 15dk Kala Açılır
                </button>
              )
            )}
          </div>
        </div>
      ) : (
        <div className="px-4 py-3">
          <div className="p-4 text-center text-text-secondary-light dark:text-text-secondary-dark bg-card-light dark:bg-card-dark rounded-xl">
            Bugün için başka planlanmış ders yok.
          </div>
        </div>
      )}

      <h2 className="text-text-primary-light dark:text-text-primary-dark text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Günlük Akış
      </h2>
      <div className="flex flex-col gap-0 px-4">
        {sortedLessons.length > 0 ? (
          <div className="rounded-xl bg-card-light dark:bg-card-dark shadow-sm overflow-hidden">
            {sortedLessons.map((lesson, index) => (
              <div key={lesson.id}>
                {lesson.status === 'completed' ? (
                  <div className="flex items-center gap-4 p-4 opacity-60 bg-gray-50 dark:bg-gray-800/50 cursor-default">
                    <div className="flex w-14 flex-col items-center">
                      <p className="text-text-primary-light dark:text-text-primary-dark text-sm font-semibold line-through decoration-slate-500">
                        {lesson.time.split(' - ')[0] || lesson.time}
                      </p>
                      <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                        Tamamlandı
                      </p>
                    </div>
                    <div className="h-10 w-px bg-border-light dark:bg-border-dark"></div>
                    <div className="flex-1">
                      <p className="text-text-primary-light dark:text-text-primary-dark font-semibold">
                        {(lesson as any).studentName || lesson.teacher || "Öğrenci"}
                      </p>
                      <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                        {lesson.subject}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className="material-symbols-outlined text-green-500 text-xl">
                        check_circle
                      </span>
                    </div>
                  </div>
                ) : (
                  isLessonStartable(lesson) ? (
                    <Link href={`/lessons/${lesson.id}/edit`} className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <div className="flex w-14 flex-col items-center">
                        <p className="text-text-primary-light dark:text-text-primary-dark text-sm font-semibold">
                          {lesson.time.split(' - ')[0] || lesson.time}
                        </p>
                        <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                          60 dk
                        </p>
                      </div>
                      <div className="h-10 w-px bg-border-light dark:bg-border-dark"></div>
                      <div className="flex-1">
                        <p className="text-text-primary-light dark:text-text-primary-dark font-semibold">
                          {(lesson as any).studentName || lesson.teacher || "Öğrenci"}
                        </p>
                        <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                          {lesson.subject}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark">
                          edit
                        </span>
                      </div>
                    </Link>
                  ) : (
                    <Link href={`/lessons/${lesson.id}/edit`} className="flex items-center gap-4 p-4 opacity-70 bg-gray-50 dark:bg-gray-800/30 hover:opacity-100 transition-opacity">
                      <div className="flex w-14 flex-col items-center">
                        <p className="text-text-primary-light dark:text-text-primary-dark text-sm font-semibold">
                          {lesson.time.split(' - ')[0] || lesson.time}
                        </p>
                        <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                          60 dk
                        </p>
                      </div>
                      <div className="h-10 w-px bg-border-light dark:bg-border-dark"></div>
                      <div className="flex-1">
                        <p className="text-text-primary-light dark:text-text-primary-dark font-semibold">
                          {(lesson as any).studentName || lesson.teacher || "Öğrenci"}
                        </p>
                        <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                          {lesson.subject}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark">
                          edit
                        </span>
                      </div>
                    </Link>
                  )
                )}

                {index < sortedLessons.length - 1 && (
                  <div className="mx-4 border-t border-border-light dark:border-border-dark"></div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-text-secondary-light dark:text-text-secondary-dark bg-card-light dark:bg-card-dark rounded-xl">
            Bugün için planlanmış ders yok.
          </div>
        )}
      </div>
      <BottomNav />
    </div >
  );
}
