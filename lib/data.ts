import fs from "fs";
import path from "path";
import { JSX } from "react";


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

export function getHeadingTag(depth: number): keyof JSX.IntrinsicElements {
    const clamped = Math.min(Math.max(depth, 0), 5);
    return (`h${clamped + 1}`) as keyof JSX.IntrinsicElements;
}

export function formatScientificName(name: string) {
    if (!name) return name;

    const parts = name.split(" ");
    parts[0] = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);

    return parts.join(" ");
}

export function formatSubgenusScientificName(name: string) {
    if (!name) return name;

    const parts = name.split(" ");
    parts[0] = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    if (parts[1].startsWith("(")) {
        parts[1] = parts[1].charAt(0) + parts[1].charAt(1).toUpperCase() + parts[1].slice(2);
    }

    return parts.join(" ");
}