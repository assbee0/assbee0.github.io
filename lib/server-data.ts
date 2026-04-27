import fs from "fs";
import path from "path";


export function getClassData(className: string) {
    const filePath = path.join(process.cwd(), "data", `${className}.json`);
    const json = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(json);
}

export function getOrderData(order: string) {
    const filePath = path.join(process.cwd(), "data/orders", `${order}.json`);
    const json = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(json);
}

export function getAllClasses() {
    return ["aves", "mammalia"];
}