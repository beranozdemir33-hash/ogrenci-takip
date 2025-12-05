import Link from "next/link";
import { getPayments } from "@/app/actions/payments";
import PaymentsList from "@/components/PaymentsList";
import BottomNav from "@/components/BottomNav";

export const dynamic = 'force-dynamic';

export default async function PaymentsPage() {
    const payments = await getPayments();

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden pb-24">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border-light dark:border-border-dark bg-background-light/80 dark:bg-background-dark/80 px-4 py-3 backdrop-blur-sm">
                <div className="flex size-10 shrink-0 items-center justify-start"></div>
                <h1 className="flex-1 text-center text-lg font-bold leading-tight tracking-[-0.015em] text-text-primary-light dark:text-text-primary-dark">
                    Ödemeler Yönetimi
                </h1>
                <div className="flex size-10 items-center justify-end">
                    <Link href="/payments/add" className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-transparent text-primary">
                        <span className="material-symbols-outlined text-2xl">add</span>
                    </Link>
                </div>
            </div>

            <PaymentsList initialPayments={payments} />

            <BottomNav />
        </div>
    );
}
