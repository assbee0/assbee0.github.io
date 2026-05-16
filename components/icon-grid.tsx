import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
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
    const pathname = usePathname();

    useEffect(() => {

        const saved =
            sessionStorage.getItem(
                `scroll:${pathname}`
            );

        if (saved) {

            window.scrollTo({
                top: Number(saved),
                behavior: "instant",
            });

        }

    }, [pathname]);

    return (
        <div className="page-container">
            <div className="icon-grid">
                {items.map((item) => (
                    <Link
                        href={
                            item.type === "species"
                                ? `/species/${item.name.replaceAll(" ", "_")}`
                                : `/${className}/${item.name.toLowerCase()}`
                        }
                        key={item.name}
                        onClick={() => {
                            sessionStorage.setItem(
                                `scroll:${pathname}`,
                                String(window.scrollY)
                            );
                        }}
                    >
                        <div className="card">

                            {item.hasWild && (
                                <div className="wild-badge">
                                    <Image
                                        src="/image/wild.png"
                                        alt="Wild observed"
                                        width={32}
                                        height={32}
                                    />
                                </div>
                            )}

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