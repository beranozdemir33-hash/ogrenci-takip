import { getPaymentsByStudent } from "@/app/actions/payments";
import { getStudentById } from "@/app/actions/students";
import PaymentsClient from "./PaymentsClient";

export default async function StudentPaymentHistoryPage({ params }: { params: { id: string } }) {
    const studentId = parseInt(params.id);
    const student = await getStudentById(studentId);
    const payments = await getPaymentsByStudent(studentId);

    // Sort payments by date descending
    const sortedPayments = [...payments].sort((a, b) => b.date.localeCompare(a.date));

    return <PaymentsClient studentId={studentId} studentName={student?.name || ""} payments={sortedPayments} />;
}
