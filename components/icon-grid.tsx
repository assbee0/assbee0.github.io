import Image from "next/image";
import Link from "next/link";
import { formatScientificName } from "@/lib/data";

function renderName(node: any) {
    const formattedName = formatScientificName(node.name);

    return (
        <>
            {node["name-jp"]}{" "}
            <br />
            {(node.type === "genus" || node.type === "species") ? (
                <i>{formattedName}</i>
            ) : (
                formattedName
            )}
        </>
    );
}

export function IconGrid({
    items,
    className
}: {
    items: any[];
    className: string;
}) {
    return (
        <div className="page-container">
            <div className="icon-grid">
                {items.map((item) => (
                    <Link href={`/${className}/${item.name.toLowerCase()}`} key={item.name}>
                        <div className="card">
                            <Image
                                src={item.icon}
                                alt={item.name}
                                width={256}
                                height={256}
                                sizes="(max-width: 256px) 20vw, (max-width: 256px) 20vw, (max-width: 256px) 20vw"
                                className="card-img"
                            />
                            <div className="card-text">
                                {renderName(item)}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}