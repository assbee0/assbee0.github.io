"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/nav-bar";
import { TreeNode } from "@/components/tree-node";
import { Lang } from "@/types/lang";
import { formatScientificName } from "@/lib/utils";

type Props = {
    data: any;
    className: string;
};

function getName(data: any, lang: Lang) {
    if (lang === "cn") return data["name-cn"];
    if (lang === "jp") return data["name-jp"];
    return data["name"];
}

function detectLang(): Lang {
    if (typeof navigator === "undefined") return "cn";

    const lang = navigator.language.toLowerCase();

    if (lang.startsWith("zh")) return "cn";
    if (lang.startsWith("ja")) return "jp";

    return "cn";
}

export function OrderPageClient({ data, className }: Props) {
    const [lang, setLang] = useState<Lang>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("lang") as Lang;
            if (saved) return saved;
        }
        return detectLang();
    });

    useEffect(() => {
        localStorage.setItem("lang", lang);
    }, [lang]);

    return (
        <div className={`body-${className}`}>
            <Navbar
                title={getName(data, lang)}
                lang={lang}
                setLang={setLang}
            />

            <div className={`head-background-base head-background-${className}`}>
                <h1 className="head-title">
                    <div>
                        {getName(data, lang)}
                    </div>
                    <div className="head-subtitle">
                        {formatScientificName(data.name)}
                    </div>
                </h1>
            </div>

            <TreeNode node={data} className={className} lang={lang} />
        </div>
    );
}