import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import SpeciesPageClient from "@/components/species-page-client";

type Props = {
    params: Promise<{
        speciesId: string;
    }>;
};

export async function generateStaticParams() {
    const dataDir = path.join(
        process.cwd(),
        "data/species"
    );

    const files = fs.readdirSync(dataDir);

    return files.map((file) => ({
        speciesId: file.replace(".json", ""),
    }));
}

function getSpeciesData(speciesId: string) {
    try {
        const filePath = path.join(
            process.cwd(),
            "data/species",
            `${speciesId}.json`
        );

        const json = fs.readFileSync(
            filePath,
            "utf-8"
        );

        return JSON.parse(json);
    } catch {
        return null;
    }
}

export default async function SpeciesPage({
    params,
}: Props) {
    const { speciesId } = await params;

    const data = getSpeciesData(speciesId);

    if (!data) {
        notFound();
    }

    return (
        <SpeciesPageClient data={data} />
    );
}