'use server';

import { db } from '@/lib/json-db';
import { Student } from '@/lib/adapter';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';

export async function getStudents(query?: string) {
    const students = await db.getStudents();
    if (query) {
        const lowerQuery = query.toLowerCase();
        return students.filter(s => s.name.toLowerCase().includes(lowerQuery));
    }
    return students;
}

export async function getStudentById(id: number) {
    return await db.getStudentById(id);
}

export async function createStudent(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;

    // Simple validation
    if (!name) return { error: 'Name is required' };

    // Default image if not provided
    let image = "";

    const imageFile = formData.get('image') as File;
    if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        const timestamp = Date.now();
        // Sanitize filename to prevent security issues and invalid chars
        const safeName = imageFile.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const filename = `${timestamp}-${safeName}`;

        // Ensure uploads directory exists
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        try {
            await fs.access(uploadDir);
        } catch {
            await fs.mkdir(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, filename);
        await fs.writeFile(filePath, buffer);
        image = `/uploads/${filename}`;
    }

    const lesson = formData.get('lesson') as string;
    const priceStr = formData.get('price') as string;
    const price = priceStr ? parseFloat(priceStr) : undefined;

    await db.createStudent({
        name,
        email,
        phone,
        image,
        grade: lesson, // Storing the selected lesson/instrument as "grade" since that's what we repurpose
        price
    });

    revalidatePath('/students');
    redirect('/students');
}

export async function updateStudent(id: number, formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;

    if (!name) return { error: 'Name is required' };

    const priceStr = formData.get('price') as string;
    const price = priceStr ? parseFloat(priceStr) : undefined;

    const data: Partial<Student> = {
        name,
        email,
        phone,
        price
    };

    const imageFile = formData.get('image') as File;
    if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        const timestamp = Date.now();
        const safeName = imageFile.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const filename = `${timestamp}-${safeName}`;

        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        try {
            await fs.access(uploadDir);
        } catch {
            await fs.mkdir(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, filename);
        await fs.writeFile(filePath, buffer);
        data.image = `/uploads/${filename}`;
    }

    await db.updateStudent(id, data);
    revalidatePath(`/students/${id}`);
    revalidatePath('/students');
    redirect(`/students/${id}`);
}

export async function deleteStudent(id: number) {
    await db.deleteStudent(id);
    revalidatePath('/students');
    redirect('/students');
}
