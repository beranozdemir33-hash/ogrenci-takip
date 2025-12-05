"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
    message: string;
    type: ToastType;
    isVisible: boolean;
    onClose: () => void;
}

export default function Toast({ message, type, isVisible, onClose }: ToastProps) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setShow(true);
            const timer = setTimeout(() => {
                setShow(false);
                setTimeout(onClose, 300); // Wait for animation to finish
            }, 3000);
            return () => clearTimeout(timer);
        } else {
            setShow(false);
        }
    }, [isVisible, onClose]);

    if (!isVisible && !show) return null;

    const icons = {
        success: "check_circle",
        error: "error",
        info: "info",
    };

    const colors = {
        success: "bg-green-500",
        error: "bg-red-500",
        info: "bg-blue-500",
    };

    return (
        <div
            className={clsx(
                "fixed top-4 right-4 z-50 flex items-center gap-3 rounded-xl px-4 py-3 text-white shadow-lg transition-all duration-300 ease-in-out transform",
                colors[type],
                show ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            )}
        >
            <span className="material-symbols-outlined text-xl">{icons[type]}</span>
            <p className="text-sm font-medium">{message}</p>
            <button onClick={() => setShow(false)} className="ml-2 text-white/80 hover:text-white">
                <span className="material-symbols-outlined text-lg">close</span>
            </button>
        </div>
    );
}
