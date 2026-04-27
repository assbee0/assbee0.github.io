import Image from "next/image";
import Link from "next/link";
import { formatScientificName } from "@/lib/utils";
import { Lang } from "@/types/lang";

function getName(node: any, lang: Lang) {
    if (lang === "cn") return node["name-cn"];
    if (lang === "jp") return node["name-jp"];
    return node["name"];
}

function renderName(node: any, lang: Lang) {
    const formattedName = formatScientificName(node.name);
    const displayName = getName(node, lang);

    return (
        <>
            {displayName}{" "}
            <br />
            {(node.type === "species") ? (
                <i>{formattedName}</i>
            ) : (
                formattedName
            )}
        </>
    );
}

export function IconGrid({
    items,
    className,
    lang
}: {
    items: any[];
    className: string;
    lang: Lang;
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
                                {renderName(item, lang)}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}