import { getOrderData } from "@/lib/server-data";
import { OrderPageClient } from "@/components/order-page-client";
import fs from "fs"
import path from "path"

export async function generateStaticParams() {
    const ordersDir = path.join(process.cwd(), "data/orders")

    const files = fs.readdirSync(ordersDir)

    return files
        .filter(file => file.endsWith(".json"))
        .map(file => {
            const order = file.replace(".json", "")

            const filePath = path.join(ordersDir, file)
            const json = JSON.parse(fs.readFileSync(filePath, "utf-8"))

            return {
                className: json.class,
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
    return <OrderPageClient data={data} className={className} />;
}