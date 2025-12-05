import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import SearchInput from "@/components/SearchInput";
import { getStudents } from "@/app/actions/students";
import StudentAvatar from "@/components/StudentAvatar";

export const dynamic = 'force-dynamic';

export default async function StudentsPage({
    searchParams,
}: {
    searchParams?: {
        query?: string;
    };
}) {
    const query = searchParams?.query || "";
    const students = await getStudents(query);

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden pb-24">
            <div className="sticky top-0 z-10 flex flex-col bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
                <div className="flex h-16 items-center justify-between px-4 pt-4">
                    <h1 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">
                        Öğrenciler
                    </h1>
                    <Link href="/students/add" className="flex h-12 w-12 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-transparent text-primary dark:text-primary">
                        <span className="material-symbols-outlined text-4xl">add_circle</span>
                    </Link>
                </div>
                <div className="px-4 py-3">
                    <SearchInput placeholder="Öğrenci ara..." />
                </div>
            </div>
            <div className="flex-grow">
                <div className="flex flex-col">
                    {students.map((student) => (
                        <Link
                            key={student.id}
                            href={`/students/${student.id}`}
                            className="flex cursor-pointer items-center gap-4 border-b border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark px-4 py-2 min-h-[72px] justify-between active:bg-gray-100 dark:active:bg-gray-800"
                        >
                            <div className="flex items-center gap-4">
                                <StudentAvatar
                                    name={student.name}
                                    image={student.image}
                                    className="h-14 w-14"
                                    size="lg"
                                />
                                <div className="flex flex-col justify-center">
                                    <p className="text-base font-medium leading-normal text-text-primary-light dark:text-text-primary-dark line-clamp-1">
                                        {student.name}
                                    </p>
                                    <p className="text-sm font-normal leading-normal text-text-secondary-light dark:text-text-secondary-dark line-clamp-2">
                                        {student.phone || "Telefon yok"}
                                    </p>
                                </div>
                            </div>
                            <div className="shrink-0">
                                <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark">
                                    chevron_right
                                </span>
                            </div>
                        </Link>
                    ))}
                    {students.length === 0 && (
                        <div className="p-8 text-center text-text-secondary-light dark:text-text-secondary-dark">
                            Öğrenci bulunamadı.
                        </div>
                    )}
                </div>
            </div>
            <BottomNav />
        </div>
    );
}
