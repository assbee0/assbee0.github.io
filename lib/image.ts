export const IMAGE_BASE_URL =
    "https://pub-b11a1f5c52684f09b114835aeaa27cd6.r2.dev";

export type ImageSize =
    | "thumb"
    | "medium"
    | "full";

export function getImageUrl(
    imageId: string,
    size: ImageSize = "medium"
) {
    const ext =
        size === "full"
            ? "jpg"
            : "webp";

    return `${IMAGE_BASE_URL}/${size}/${imageId}.${ext}`;
}

export function getObservationDate(
    observationId: string
) {
    const match =
        observationId.match(
            /_(\d{12})(?:_\d+)?$/
        );

    if (!match) return "";

    const datetime = match[1];

    const year = datetime.slice(0, 4);
    const month = datetime.slice(4, 6);
    const day = datetime.slice(6, 8);

    return `${year}-${month}-${day}`;
}