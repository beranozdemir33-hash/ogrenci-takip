import { getLessons } from "@/app/actions/lessons";
import { getStudents } from "@/app/actions/students";
import CalendarView from "@/components/CalendarView";

export default async function CalendarPage() {
    const lessons = await getLessons();
    const students = await getStudents();

    const lessonsWithStudentNames = lessons.map(lesson => {
        const student = students.find(s => s.id === lesson.studentId);
        return {
            ...lesson,
            studentName: student ? student.name : "Öğrenci Bulunamadı"
        };
    });

    return <CalendarView initialLessons={lessonsWithStudentNames} />;
}
