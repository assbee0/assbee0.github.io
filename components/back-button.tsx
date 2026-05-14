"use client";

import { useRouter } from "next/navigation";

export function BackButton({ children, fallback = "/", }: any) {
    const router = useRouter();

    function handleBack() {

        if (window.history.length > 1) {
            router.back();
        } else {
            router.push(fallback);
        }
    }

    return (
        <button onClick={handleBack} className="back-btn">
            {children || "← 返回"}
        </button>
    );
}