"use client";

import { useState, useEffect } from "react";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { Navbar } from "@/components/nav-bar";
import { Lang } from "@/types/lang";
import { formatScientificName } from "@/lib/utils"

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

export default function SpeciesPageClient({
    data,
}: {
    data: any;
}) {
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

    const [currentIndex, setCurrentIndex] =
        useState(0);

    const currentPhoto =
        data.photos[currentIndex];

    function prevPhoto() {
        setCurrentIndex((prev) =>
            prev === 0
                ? data.photos.length - 1
                : prev - 1
        );
    }

    function nextPhoto() {
        setCurrentIndex((prev) =>
            prev === data.photos.length - 1
                ? 0
                : prev + 1
        );
    }

    return (
        <div className={`body-${data.class}`}>
            <Navbar
                title={getName(data, lang)}
                lang={lang}
                setLang={setLang}
            />

            <div className={`head-background-base head-background-${data.class}`}>
                <h1 className="head-title">
                    <div>
                        {getName(data, lang)}
                    </div>
                    <div className="head-subtitle scientific-name">
                        {formatScientificName(data.scientificName)}
                    </div>
                </h1>
            </div>
            <main className="species-page">

                {/* Main Viewer */}

                <section className="species-main-photo">

                    <div className="viewer-wrapper">

                        <button
                            className="viewer-button left"
                            onClick={prevPhoto}
                        >
                            ←
                        </button>

                        <a
                            href={currentPhoto.original}
                            target="_blank"
                            className="main-photo-link"
                        >
                            <div className="main-photo-frame">

                                <Image
                                    src={currentPhoto.medium}
                                    alt={currentPhoto.id}
                                    fill
                                    priority
                                    style={{
                                        objectFit: "contain",
                                    }}
                                />

                            </div>
                        </a>

                        <button
                            className="viewer-button right"
                            onClick={nextPhoto}
                        >
                            →
                        </button>

                    </div>

                    <div className="photo-meta">

                        {currentPhoto.date && (
                            <div className="meta-item">

                                <Calendar size={16} />

                                <span>
                                    {currentPhoto.date}
                                </span>

                            </div>
                        )}

                        {currentPhoto.location && (
                            <div className="meta-item">

                                <MapPin size={16} />

                                <span>
                                    {currentPhoto.location}
                                </span>

                            </div>
                        )}

                    </div>

                </section>

                {/* Description */}

                <section className="species-description">
                    <p>{data.description}</p>
                </section>

                {/* Thumbnail Strip */}

                <section className="species-gallery">

                    <h2>Gallery</h2>

                    <div className="thumbnail-grid">

                        {data.photos.map(
                            (
                                photo: any,
                                index: number
                            ) => (
                                <button
                                    key={photo.id}
                                    className={
                                        index === currentIndex
                                            ? "thumbnail active"
                                            : "thumbnail"
                                    }
                                    onClick={() =>
                                        setCurrentIndex(index)
                                    }
                                >
                                    <Image
                                        src={photo.thumb}
                                        alt={photo.id}
                                        width={200}
                                        height={200}
                                    />
                                </button>
                            )
                        )}

                    </div>

                </section>

            </main>
        </div>
    );
}