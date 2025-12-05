'use server';

import { db } from '@/lib/json-db';
import { revalidatePath } from 'next/cache';

export async function getPayments() {
    const payments = await db.getPayments();
    const students = await db.getStudents();
    const studentMap = new Map(students.map(s => [s.id, s]));

    return payments.map(p => ({
        ...p,
        student: studentMap.get(p.studentId),
    }));
}

export async function getPaymentsByStudent(studentId: number) {
    return await db.getPaymentsByStudent(studentId);
}

export async function markPaymentAsPaid(id: number) {
    await db.updatePayment(id, { status: 'completed' });
    revalidatePath('/payments');
}

export async function createPayment(formData: FormData) {
    const studentId = parseInt(formData.get("studentId") as string);
    const amount = parseFloat(formData.get("amount") as string);
    const subject = formData.get("subject") as string;
    const date = formData.get("date") as string; // YYYY-MM-DD

    // Store YYYY-MM-DD for new data. Frontend handles display.

    await db.createPayment({
        studentId,
        amount,
        subject,
        date,
        status: 'pending'
    });

    revalidatePath('/payments');
    // redirect handled by client or here
}
