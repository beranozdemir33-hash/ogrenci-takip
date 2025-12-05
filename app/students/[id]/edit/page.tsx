import { getStudentById } from "@/app/actions/students";
import { getLessonsByStudent } from "@/app/actions/lessons";
import { getPaymentsByStudent } from "@/app/actions/payments";
import StudentEditForm from "@/components/StudentEditForm";
import { notFound } from "next/navigation";

export default async function EditStudentPage({ params }: { params: { id: string } }) {
    const studentId = parseInt(params.id);
    const student = await getStudentById(studentId);

    if (!student) {
        notFound();
    }

    const lessons = await getLessonsByStudent(studentId);
    const payments = await getPaymentsByStudent(studentId);

    console.log(`[EditStudentPage] StudentID: ${studentId}`);
    console.log(`[EditStudentPage] Lessons Found: ${lessons.length}`, lessons);
    console.log(`[EditStudentPage] Payments Found: ${payments.length}`, payments);

    return <StudentEditForm student={student} lessons={lessons} payments={payments} />;
}
