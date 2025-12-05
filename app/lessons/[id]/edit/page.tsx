import LessonEditForm from "@/components/LessonEditForm";
import { getLessonById } from "@/app/actions/lessons";
import { notFound } from "next/navigation";

export default async function EditLessonPage({ params }: { params: { id: string } }) {
    const lesson = await getLessonById(parseInt(params.id));

    if (!lesson) {
        notFound();
    }

    return <LessonEditForm lesson={lesson} />;
}
