import clsx from "clsx";

export default function StudentAvatar({ name, image, className, size = "md" }: { name: string, image?: string | null, className?: string, size?: "sm" | "md" | "lg" | "xl" }) {
    const initials = (name || "")
        .split(' ')
        .map(n => n.slice(0, 1))
        .join('')
        .toUpperCase()
        .slice(0, 2);

    const sizeClasses = {
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
        xl: "h-16 w-16 text-xl"
    };

    return (
        <div className={clsx("relative shrink-0 overflow-hidden rounded-full", sizeClasses[size], className)}>
            {image ? (
                <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover"
                />
            ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary text-black font-bold">
                    {initials}
                </div>
            )}
        </div>
    );
}
