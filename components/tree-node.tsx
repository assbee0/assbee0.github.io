import { Heading } from "./heading";
import { IconGrid } from "./icon-grid";
import { formatScientificName } from "@/lib/utils";
import { formatSubgenusScientificName } from "@/lib/utils";
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
            {(node.type === "genus" || node.type === "species") ? (
                <i>{formattedName}</i>
            ) : node.type === "subgenus" ? (
                <i>{formatSubgenusScientificName(node.name)}</i>
            ) : (
                formattedName
            )}
        </>
    );
}

export function TreeNode({
    node,
    depth = 0,
    className,
    lang,
}: {
    node: any;
    className: string;
    depth?: number;
    lang: Lang;
}) {
    const isClass = !!node.class;

    if (isClass) {
        return (
            <div className="node-block">
                {node.children?.map((child: any) => (
                    <TreeNode
                        key={child.name}
                        node={child}
                        className={className}
                        depth={depth + 1}
                        lang={lang}
                    />
                ))}
            </div>
        );
    }

    const hasIconChildren = !!node["icon-children"];

    if (hasIconChildren) {
        return (
            <div className="node-block">
                {node.name && (
                    <Heading depth={depth}>
                        {renderName(node, lang)}
                    </Heading>
                )}
                <IconGrid items={node["icon-children"]} className={className} lang={lang} />
            </div>
        );
    } else {
        return (
            <div className="node-block">
                {node.name && (
                    <Heading depth={depth}>
                        {renderName(node, lang)}
                    </Heading>
                )}

                {node.children?.map((child: any) => (
                    <TreeNode
                        key={child.name}
                        node={child}
                        className={className}
                        depth={depth + 1}
                        lang={lang}
                    />
                ))}
            </div>
        );
    }
}