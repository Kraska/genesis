export type IAPICourse = {
    id: string;
    title: string;
    tags: string[];
    launchDate: string;
    status: "launched" | "...";
    description: string;
    duration: number;
    lessonsCount: number;
    containsLockedLessons: boolean;
    previewImageLink: boolean;
    rating: number;
    meta: {
        slug: string;
        skills: string[];
        courseVideoPreview: {
            link: string;
            duration: number;
            previewImageLink: string;
        };
    };
};
