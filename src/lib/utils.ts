import { clsx, type ClassValue } from "clsx"
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge"
import type { NotificationType } from "../types/notification";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function formatDate(isoString: string) {
    return new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    }).format(new Date(isoString));
}

export function toastNotification(message: string, type: NotificationType = "info") {
   const toastId = toast.loading("Loading...");
   
    const Colors: Record<Uppercase<NotificationType>, string> = {
        SUCCESS: 'primary',
        ERROR: 'red-500',
        INFO: 'blue-500',
    };

    const color = Colors[type.toUpperCase() as Uppercase<NotificationType>];
    return toast.update(toastId, {
        className: `bg-white text-${color} border-2 border-${color} font-semibold`,
        progressClassName: `bg-${color} `,
        render: message,
        type: type,
        isLoading: false,
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
    });
}

export function splitWords(text: string) {
    return text
        .toLowerCase()
        .split(/\s+/)
        .map((word) => word.replace(/[^\w]/g, ""))
        .filter((word) => word.length > 2);
}

export function capitalizeFirstWord(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}