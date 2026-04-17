import { getClassData } from "@/lib/data";
import { TreeNode } from "@/components/tree-node";
import { BackButton } from "@/components/back-button";

export async function generateStaticParams() {
    return [
        { className: "aves" },
    ]
}

export default async function ClassPage({
    params,
}: {
    params: Promise<{ className: string }>
}) {
    const { className } = await params;
    const data = getClassData(className);
    return (
        <div className={`body-${className}`}>
            <div className="nav-bar">
                <BackButton>
                    <svg width="20" height="20" viewBox="0 0 24 24">
                        <path
                            d="M15 18l-6-6 6-6"
                            stroke="black"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </BackButton>
                <div className="nav-title">{data["name-jp"]}</div>
            </div>
            <div className={`head-background-base head-background-${className}`}>
                <h1 className="head-title">{data["name-jp"] + " " + data.name}</h1>
            </div>
            <TreeNode node={data} className={className} />
        </div>
    );
}