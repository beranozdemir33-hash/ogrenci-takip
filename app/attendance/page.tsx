import { getStudents } from "@/app/actions/students";
import { getLessonById } from "@/app/actions/lessons";
import AttendanceForm from "@/components/AttendanceForm";
import { redirect } from "next/navigation";

export default async function AttendancePage({ searchParams }: { searchParams: { id?: string } }) {
    const students = await getStudents();

    let lesson = null;
    if (searchParams.id) {
        console.log(`[AttendancePage] Fetching lesson ID: ${searchParams.id}`);
        lesson = await getLessonById(parseInt(searchParams.id));
        console.log(`[AttendancePage] Lesson found:`, lesson);
    } else {
        console.log(`[AttendancePage] No lesson ID in searchParams`);
    }

    return <AttendanceForm students={students} lesson={lesson} />;
}
