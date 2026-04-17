"use client";

import { useRouter } from "next/navigation";

export function BackButton({ children }: any) {
    const router = useRouter();

    return (
        <button
            onClick={() => {
                if (window.history.length > 1) {
                    router.back();
                } else {
                    router.push("/");
                }
            }}
            className="back-btn"
        >
            {children || "← 返回"}
        </button>
    );
}