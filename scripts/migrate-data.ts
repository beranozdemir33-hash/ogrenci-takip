
import { db as jsonDb } from '../lib/json-db';
import { prismaAdapter } from '../lib/prisma-db';

async function migrate() {
    console.log("Starting migration...");

    // Read from JSON
    const students = await jsonDb.getStudents();
    const lessons = await jsonDb.getLessons();
    const payments = await jsonDb.getPayments();

    console.log(`Found ${students.length} students, ${lessons.length} lessons, ${payments.length} payments.`);

    // Migrate Students
    const studentIdMap = new Map<number, number>();

    for (const s of students) {
        console.log(`Migrating student: ${s.name}`);
        // Create student in Prisma (letting it generate new ID to be safe, or we could force ID if we enabled it in schema but autoincrement is better)
        // Wait, if we change IDs, we break relationships.
        // Option 1: Force IDs. Prisma allows this if we don't depend on autoincrement during insert? 
        // Actually, with @default(autoincrement()), we can still provide a value in create().

        try {
            const created = await prismaAdapter.createStudent({
                name: s.name,
                email: s.email,
                phone: s.phone,
                image: s.image,
                grade: s.grade,
                price: s.price
            });
            // Map old ID to new ID
            // Since we are creating fresh, IDs might change. 
            // json-db IDs are effectively 1, 2, 3... Prisma might be same.
            studentIdMap.set(s.id, created.id);
            console.log(`Student created. Old ID: ${s.id} -> New ID: ${created.id}`);
        } catch (e) {
            console.error(`Failed to migrate student ${s.name}:`, e);
        }
    }

    // Migrate Lessons
    for (const l of lessons) {
        const newStudentId = studentIdMap.get(l.studentId);
        if (!newStudentId) {
            console.warn(`Skipping lesson ${l.id}: Student ID ${l.studentId} not found in new DB.`);
            continue;
        }

        try {
            await prismaAdapter.createLesson({
                studentId: newStudentId,
                date: l.date,
                time: l.time,
                subject: l.subject,
                topic: l.topic,
                homework: l.homework,
                teacher: l.teacher,
                status: l.status
            });
        } catch (e) {
            console.error(`Failed to migrate lesson ${l.id}:`, e);
        }
    }

    // Migrate Payments
    for (const p of payments) {
        const newStudentId = studentIdMap.get(p.studentId);
        if (!newStudentId) {
            console.warn(`Skipping payment ${p.id}: Student ID ${p.studentId} not found in new DB.`);
            continue;
        }

        try {
            await prismaAdapter.createPayment({
                studentId: newStudentId,
                amount: p.amount,
                date: p.date,
                status: p.status,
                subject: p.subject
            });
        } catch (e) {
            console.error(`Failed to migrate payment ${p.id}:`, e);
        }
    }

    console.log("Migration completed!");
}

migrate().catch(console.error);
