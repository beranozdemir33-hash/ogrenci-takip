import { Suspense } from "react";
import DashboardView from "@/components/DashboardView";
import { getLessons } from "@/app/actions/lessons";
import { getStudents } from "@/app/actions/students";

export const dynamic = 'force-dynamic';

export default async function Home() {
    const lessons = await getLessons();
    const students = await getStudents();

    // Filter for today's lessons
    // Note: This relies on formatted date string matching.
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const d = String(today.getDate()).padStart(2, '0');
    const todayStr = `${y}-${m}-${d}`;

    const dailyLessons = lessons
        .filter(l => l.date === todayStr)
        .map(lesson => {
            const student = students.find(s => s.id === lesson.studentId);
            return {
                ...lesson,
                studentName: student ? student.name : "Öğrenci Bulunamadı"
            };
        });

    return (
        <Suspense fallback={<div>Yükleniyor...</div>}>
            <DashboardView dailyLessons={dailyLessons} totalStudents={students.length} />
        </Suspense>
    );
}
