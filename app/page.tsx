"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Lang } from "@/types/lang";

const classes = ["aves", "mammalia"];

function detectLang(): Lang {
  const lang = navigator.language.toLowerCase();

  if (lang.startsWith("zh")) return "cn";
  if (lang.startsWith("ja")) return "jp";
  return "jp";
}

function getTitle(lang: Lang) {
  if (lang === "cn") return "素莫莫动物图鉴";
  if (lang === "jp") return "スモモ動物図鑑";
  return "ZOOLOGY";
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("jp");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const saved = localStorage.getItem("lang") as Lang;
    if (saved) {
      setLang(saved);
    } else {
      setLang(detectLang());
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("lang", lang);
    }
  }, [lang, mounted]);

  if (!mounted) return null;

  return (
    <div className="homepage-background">
      <h1 className="heading-animal" data-word="ZOOLOGY">
        <span className="title-text">{getTitle(lang)}</span>
      </h1>

      {classes.map(c => (
        <div key={c}>
          <h2 className="homepage-h2-class" data-word={c.toUpperCase()}>
            <Link href={`/${c}`}>{c}</Link>
          </h2>
        </div>
      ))}
    </div>
  );
}