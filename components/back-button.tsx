"use client";

import { useRouter, usePathname } from "next/navigation";

export function BackButton({ children }: any) {
    const router = useRouter();
    const pathname = usePathname();

    function goParent() {
        const segments = pathname.split("/").filter(Boolean);

        if (segments.length <= 1) {
            router.push("/"); // 已经在一级
            return;
        }

        const parentPath = "/" + segments.slice(0, -1).join("/");
        router.push(parentPath);
    }

    return (
        <button onClick={() => router.back()} className="back-btn">
            {children || "← 返回"}
        </button>
    );
}