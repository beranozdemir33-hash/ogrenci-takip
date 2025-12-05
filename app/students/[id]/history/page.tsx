import { getLessonsByStudent } from "@/app/actions/lessons";
import { getStudentById } from "@/app/actions/students";
import HistoryClient from "./HistoryClient";

export default async function StudentHistoryPage({ params }: { params: { id: string } }) {
    const studentId = parseInt(params.id);
    const student = await getStudentById(studentId);
    const lessons = await getLessonsByStudent(studentId);

    // Sort lessons by date descending
    const sortedLessons = [...lessons].sort((a, b) => b.date.localeCompare(a.date));

    return <HistoryClient studentId={studentId} studentName={student?.name || ""} lessons={sortedLessons} />;
}
