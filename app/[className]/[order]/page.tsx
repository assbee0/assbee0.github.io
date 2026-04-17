import { getOrderData } from "@/lib/data";
import { TreeNode } from "@/components/tree-node";
import { BackButton } from "@/components/back-button";
import fs from "fs"
import path from "path"

export async function generateStaticParams() {
    const ordersDir = path.join(process.cwd(), "data/orders")

    const files = fs.readdirSync(ordersDir)

    return files
        .filter(file => file.endsWith(".json"))
        .map(file => {
            const order = file.replace(".json", "")

            return {
                className: "aves",
                order,
            }
        })
}

export default async function OrderPage({
    params,
}: {
    params: Promise<{ className: string; order: string }>;
}) {
    const { className, order } = await params;
    const data = getOrderData(order);
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