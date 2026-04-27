import { getClassData } from "@/lib/server-data";
import { ClassPageClient } from "@/components/class-page-client";

export async function generateStaticParams() {
    return [
        { className: "aves" },
        { className: "mammalia" },
    ]
}

export default async function ClassPage({
    params,
}: {
    params: Promise<{ className: string }>;
}) {
    const { className } = await params;
    const data = getClassData(className);

    return (
        <ClassPageClient
            data={data}
            className={className}
        />
    );
}