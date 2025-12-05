
import { prismaAdapter } from '../lib/prisma-db';
import { firestoreAdapter } from '../lib/firebase-db';

async function migrate() {
    console.log("Starting migration to Firebase...");

    // Read from Prisma (SQLite)
    const students = await prismaAdapter.getStudents();
    const lessons = await prismaAdapter.getLessons();
    const payments = await prismaAdapter.getPayments();

    console.log(`Found ${students.length} students, ${lessons.length} lessons, ${payments.length} payments in SQLite.`);

    // Migrate Students
    const studentIdMap = new Map<number, number>();

    for (const s of students) {
        console.log(`Migrating student: ${s.name} (ID: ${s.id})`);
        // We want to keep the same IDs if possible to maintain relationships easily
        // But Firestore Adapter generates new IDs based on Max ID. 
        // Since we are migrating into an empty Firestore (presumably), the IDs should match if we insert in order.
        // However, to be safe, we should essentially "force" the creation with specific data.
        // The firestoreAdapter.createStudent logic auto-increments. 
        // Let's rely on that logic but verify mapping.

        try {
            // Note: createStudent in firestoreAdapter generates a NEW ID.
            // If we want to preserve IDs exactly, we might need to "hack" it or just accept new IDs and map them.
            // Let's accept new IDs and map them. It is safer.
            console.log("Creating student with data:", JSON.stringify({
                name: s.name,
                email: s.email,
                phone: s.phone,
                image: s.image,
                grade: s.grade,
                price: s.price
            }, null, 2));

            const created = await firestoreAdapter.createStudent({
                name: s.name,
                email: s.email,
                phone: s.phone,
                image: s.image,
                grade: s.grade,
                price: s.price
            });
            studentIdMap.set(s.id, created.id);
            console.log(`Student migrated. Old ID: ${s.id} -> New ID: ${created.id}`);
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
            await firestoreAdapter.createLesson({
                studentId: newStudentId, // Link to new Student ID
                date: l.date,
                time: l.time,
                subject: l.subject,
                topic: l.topic,
                homework: l.homework,
                teacher: l.teacher,
                status: l.status
            });
            console.log(`Lesson ${l.id} migrated.`);
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
            await firestoreAdapter.createPayment({
                studentId: newStudentId, // Link to new Student ID
                amount: p.amount,
                date: p.date,
                status: p.status,
                subject: p.subject
            });
            console.log(`Payment ${p.id} migrated.`);
        } catch (e) {
            console.error(`Failed to migrate payment ${p.id}:`, e);
        }
    }

    console.log("Migration to Firestore completed!");
    process.exit(0);
}

migrate().catch(console.error);
