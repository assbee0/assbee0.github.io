"use client";

import { Lang } from "@/types/lang";
import { BackButton } from "@/components/back-button";

type NavbarProps = {
    title: string;
    lang: Lang;
    setLang: (lang: Lang) => void;
    fallback: string;
};

export function Navbar({ title, lang, setLang, fallback }: NavbarProps) {
    return (
        <div className="nav-bar">
            <BackButton fallback={fallback}>
                <svg width="20" height="20" viewBox="0 0 24 24">
                    <path
                        d="M15 18l-6-6 6-6"
                        stroke="black"
                        strokeWidth="2"
                        fill="none"
                    />
                </svg>
            </BackButton>

            <div className="nav-title">{title}</div>

            <div className="lang-switch">
                <button
                    className={lang === "jp" ? "active" : ""}
                    onClick={() => setLang("jp")}
                >
                    日
                </button>
                <button
                    className={lang === "cn" ? "active" : ""}
                    onClick={() => setLang("cn")}
                >
                    中
                </button>
            </div>
        </div>
    );
}