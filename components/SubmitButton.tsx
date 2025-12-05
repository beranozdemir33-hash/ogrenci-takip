"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ label = "Öğrenciyi Kaydet" }: { label?: string }) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="flex w-full min-w-0 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-4 bg-primary text-black dark:text-black text-base font-bold leading-normal text-center shadow-sm transition-transform active:scale-[0.98] disabled:opacity-70"
        >
            {pending ? "İşleniyor..." : label}
        </button>
    );
}
