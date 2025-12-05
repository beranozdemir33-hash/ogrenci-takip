import { PrismaClient } from '@prisma/client';
import { StorageAdapter, Student, Lesson, Payment } from './adapter';

const prisma = new PrismaClient();

export const prismaAdapter: StorageAdapter = {
    // Students
    getStudents: async (): Promise<Student[]> => {
        const students = await prisma.student.findMany();
        return students.map(s => ({
            ...s,
            createdAt: s.createdAt.toISOString(),
            updatedAt: s.updatedAt.toISOString(),
            // Ensure compatibility if potential nulls
            email: s.email || undefined,
            phone: s.phone || undefined,
            grade: s.grade || undefined,
            image: s.image || undefined,
            price: s.price || undefined
        }));
    },
    getStudentById: async (id: number): Promise<Student | null> => {
        const student = await prisma.student.findUnique({ where: { id } });
        if (!student) return null;
        return {
            ...student,
            createdAt: student.createdAt.toISOString(),
            updatedAt: student.updatedAt.toISOString(),
            email: student.email || undefined,
            phone: student.phone || undefined,
            grade: student.grade || undefined,
            image: student.image || undefined,
            price: student.price || undefined
        };
    },
    createStudent: async (data): Promise<Student> => {
        const student = await prisma.student.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                image: data.image,
                grade: data.grade,
                price: data.price
            }
        });
        return {
            ...student,
            createdAt: student.createdAt.toISOString(),
            updatedAt: student.updatedAt.toISOString(),
            email: student.email || undefined,
            phone: student.phone || undefined,
            grade: student.grade || undefined,
            image: student.image || undefined,
            price: student.price || undefined
        };
    },
    updateStudent: async (id, data): Promise<Student> => {
        const student = await prisma.student.update({
            where: { id },
            data: {
                ...data
            }
        });
        return {
            ...student,
            createdAt: student.createdAt.toISOString(),
            updatedAt: student.updatedAt.toISOString(),
            email: student.email || undefined,
            phone: student.phone || undefined,
            grade: student.grade || undefined,
            image: student.image || undefined,
            price: student.price || undefined
        };
    },
    deleteStudent: async (id: number): Promise<void> => {
        await prisma.student.delete({ where: { id } });
    },

    // Lessons
    getLessons: async (): Promise<Lesson[]> => {
        const lessons = await prisma.lesson.findMany();
        return lessons.map(l => ({
            ...l,
            status: l.status as 'scheduled' | 'completed' | 'cancelled',
            topic: l.topic || undefined,
            homework: l.homework || undefined,
            teacher: l.teacher || undefined
        }));
    },
    getLessonsByStudent: async (studentId: number): Promise<Lesson[]> => {
        const lessons = await prisma.lesson.findMany({ where: { studentId } });
        return lessons.map(l => ({
            ...l,
            status: l.status as 'scheduled' | 'completed' | 'cancelled',
            topic: l.topic || undefined,
            homework: l.homework || undefined,
            teacher: l.teacher || undefined
        }));
    },
    createLesson: async (data): Promise<Lesson> => {
        const lesson = await prisma.lesson.create({
            data: {
                studentId: data.studentId,
                date: data.date,
                time: data.time,
                subject: data.subject,
                topic: data.topic,
                homework: data.homework,
                teacher: data.teacher,
                status: data.status
            }
        });
        return {
            ...lesson,
            status: lesson.status as 'scheduled' | 'completed' | 'cancelled',
            topic: lesson.topic || undefined,
            homework: lesson.homework || undefined,
            teacher: lesson.teacher || undefined
        };
    },
    updateLesson: async (id, data): Promise<Lesson> => {
        const lesson = await prisma.lesson.update({
            where: { id },
            data: { ...data }
        });
        return {
            ...lesson,
            status: lesson.status as 'scheduled' | 'completed' | 'cancelled',
            topic: lesson.topic || undefined,
            homework: lesson.homework || undefined,
            teacher: lesson.teacher || undefined
        };
    },
    deleteLesson: async (id: number): Promise<void> => {
        await prisma.lesson.delete({ where: { id } });
    },

    // Payments
    getPayments: async (): Promise<Payment[]> => {
        const payments = await prisma.payment.findMany();
        return payments.map(p => ({
            ...p,
            status: p.status as 'pending' | 'completed' | 'overdue',
            subject: p.subject || undefined
        }));
    },
    getPaymentsByStudent: async (studentId: number): Promise<Payment[]> => {
        const payments = await prisma.payment.findMany({ where: { studentId } });
        return payments.map(p => ({
            ...p,
            status: p.status as 'pending' | 'completed' | 'overdue',
            subject: p.subject || undefined
        }));
    },
    createPayment: async (data): Promise<Payment> => {
        const payment = await prisma.payment.create({
            data: {
                studentId: data.studentId,
                amount: data.amount,
                date: data.date,
                status: data.status,
                subject: data.subject
            }
        });
        return {
            ...payment,
            status: payment.status as 'pending' | 'completed' | 'overdue',
            subject: payment.subject || undefined
        };
    },
    updatePayment: async (id, data): Promise<Payment> => {
        const payment = await prisma.payment.update({
            where: { id },
            data: { ...data }
        });
        return {
            ...payment,
            status: payment.status as 'pending' | 'completed' | 'overdue',
            subject: payment.subject || undefined
        };
    }
};
