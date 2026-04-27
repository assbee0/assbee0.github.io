import { getHeadingTag } from "@/lib/utils";

export function Heading({
    depth,
    children,
}: {
    depth: number;
    children: React.ReactNode;
}) {
    const Tag = getHeadingTag(depth);

    return (
        <Tag className={`heading level-${depth}`}>
            {children}
        </Tag>
    );
}