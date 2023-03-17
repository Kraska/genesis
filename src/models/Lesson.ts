

export type Lesson = {
    id: string;
    title: string;
    duration: number;
    order: number;
    type: "video" | "text";
    status: "unlocked" | "locked";
    link: string;
    previewImageLink: string;
    meta: null | {};
};
