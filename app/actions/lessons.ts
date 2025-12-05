'use server';

import { db } from '@/lib/json-db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getLessons() {
    return await db.getLessons();
}

export async function getCalendarEvents(start: Date, end: Date) {
    // For now, just return all lessons. In a real DB we would query by date range.
    return await db.getLessons();
}

export async function getLessonsByStudent(studentId: number) {
    return await db.getLessonsByStudent(studentId);
}
export async function createLesson(formData: FormData) {
    const studentId = parseInt(formData.get("studentId") as string);
    const dateStr = formData.get("date") as string;
    const startTime = formData.get("startTime") as string;
    const endTime = formData.get("endTime") as string;
    const subject = formData.get("subject") as string;
    const teacher = "Öğretmen";

    // Recurrence fields
    const isRecurring = formData.get("recurring") === "on";
    const recurringEndDateStr = formData.get("recurringEndDate") as string;

    const timeRange = `${startTime} - ${endTime}`;

    const lessonsToCreate = [];
    const startDate = new Date(dateStr);
    let weeksToCreate = 1;

    if (isRecurring && recurringEndDateStr) {
        const endDate = new Date(recurringEndDateStr);
        // Calculate difference in weeks, ensuring at least 1
        const diffInTime = endDate.getTime() - startDate.getTime();
        const diffInDays = diffInTime / (1000 * 3600 * 24);
        weeksToCreate = Math.ceil(diffInDays / 7) + 1; // +1 to include the start date week if it falls on same day cycle
        if (weeksToCreate < 1) weeksToCreate = 1;
        // Safety cap
        if (weeksToCreate > 52) weeksToCreate = 52;
    }

    for (let i = 0; i < weeksToCreate; i++) {
        const lessonDate = new Date(startDate);
        lessonDate.setDate(startDate.getDate() + (i * 7));

        // If specific end date provided, ensure we don't go past it (extra safety for partial weeks)
        if (isRecurring && recurringEndDateStr) {
            const endDate = new Date(recurringEndDateStr);
            // Set times to midnight for accurate comparison
            const d1 = new Date(lessonDate); d1.setHours(0, 0, 0, 0);
            const d2 = new Date(endDate); d2.setHours(0, 0, 0, 0);
            if (d1 > d2) break;
        }

        const y = lessonDate.getFullYear();
        const m = String(lessonDate.getMonth() + 1).padStart(2, '0');
        const d = String(lessonDate.getDate()).padStart(2, '0');
        const formattedDate = `${y}-${m}-${d}`;

        lessonsToCreate.push({
            date: formattedDate,
            time: timeRange,
            subject,
            teacher,
            status: 'scheduled' as const,
            studentId
        });
    }

    // Create all lessons
    for (const lesson of lessonsToCreate) {
        await db.createLesson(lesson);
    }

    revalidatePath('/calendar');
    revalidatePath('/lessons');
    redirect('/calendar');
}

export async function updateLesson(id: number, data: Partial<import('@/lib/adapter').Lesson>) {
    await db.updateLesson(id, data);
    revalidatePath('/calendar');
    revalidatePath('/lessons');
    revalidatePath('/');
}

export async function completeLesson(id: number, homework: string) {
    const lesson = await getLessonById(id);
    if (!lesson) throw new Error("Lesson not found");

    // Update lesson status
    await updateLesson(id, {
        status: 'completed',
        homework
    });

    // Create payment
    // Fetch student to get default price
    const student = await db.getStudentById(lesson.studentId);
    // Default to 500 if NO price is set, but better logic:
    // If user sets price, use it. If not, use 0 or maybe a global default.
    // For now, let's stick to 500 as a fallback if undefined, so we don't zero out completely, 
    // OR default to 0 to force them to set it? The user complained about "where did 500 come from".
    // So 0 is safer to avoid confusion, but 500 is a nice reasonable default.
    // Let's use student.price || 0. 
    const amount = student?.price || 0;

    await db.createPayment({
        studentId: lesson.studentId,
        amount: amount,
        subject: `Ders: ${lesson.subject}`,
        date: new Date().toISOString().split('T')[0],
        status: 'pending'
    });

    revalidatePath('/payments');
}

export async function getLessonById(id: number) {
    const lessons = await db.getLessons();
    return lessons.find(l => l.id === id) || null;
}

export async function deleteLesson(id: number) {
    await db.deleteLesson(id);
    revalidatePath('/calendar');
    revalidatePath('/lessons');
}
