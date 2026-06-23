"use client";

import Link from "next/link";
import archive from "@/data/archive.json";

type StatCardProps = {
    title: string;
    total: number;
    wild: number;
};

function StatCard({
    title,
    total,
    wild,
}: StatCardProps) {
    return (
        <div className="archive-stat-card">

            <div className="archive-stat-title">
                {title}
            </div>

            <div className="archive-stat-wild-number">
                {wild.toLocaleString()}
            </div>

            <div className="archive-stat-wild-label">
                WILD
            </div>

            <div className="archive-stat-divider" />

            <div className="archive-stat-total">
                {total.toLocaleString()}
            </div>

            <div className="archive-stat-total-label">
                TOTAL
            </div>

        </div>
    );
}

export default function ArchivePage() {

    const total = archive.total;

    return (
        <div className="archive-background">

            <div className="archive-path">
                <Link href="/">
                    ZOOLOGY
                </Link>

                <span> / ARCHIVE</span>
            </div>

            <header className="archive-header">

                <h1
                    className="archive-heading"
                    data-word="ARCHIVE"
                >
                    <span className="archive-title">
                        ARCHIVE
                    </span>
                </h1>

                <p className="archive-subtitle">
                    ZOOLOGICAL COLLECTION DATABASE
                </p>

            </header>

            <section className="archive-section">

                <h2
                    className="archive-section-title"
                    data-word="TOTAL"
                >
                    TOTAL
                </h2>

                <div className="archive-grid">

                    <StatCard
                        title="ORDERS"
                        total={total.orders}
                        wild={total.wildOrders}
                    />

                    <StatCard
                        title="FAMILIES"
                        total={total.families}
                        wild={total.wildFamilies}
                    />

                    <StatCard
                        title="GENERA"
                        total={total.genera}
                        wild={total.wildGenera}
                    />

                    <StatCard
                        title="SPECIES"
                        total={total.species}
                        wild={total.wildSpecies}
                    />

                </div>

            </section>

            {archive.classes.map(cls => (

                <section
                    key={cls.name}
                    className="archive-section"
                >

                    <h2
                        className="archive-section-title"
                        data-word={cls.name}
                    >
                        {cls.name}
                    </h2>

                    <div className="archive-grid">

                        <StatCard
                            title="ORDERS"
                            total={cls.orders}
                            wild={cls.wildOrders}
                        />

                        <StatCard
                            title="FAMILIES"
                            total={cls.families}
                            wild={cls.wildFamilies}
                        />

                        <StatCard
                            title="GENERA"
                            total={cls.genera}
                            wild={cls.wildGenera}
                        />

                        <StatCard
                            title="SPECIES"
                            total={cls.species}
                            wild={cls.wildSpecies}
                        />

                    </div>

                </section>

            ))}

        </div>
    );
}