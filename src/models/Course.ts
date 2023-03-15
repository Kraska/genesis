export type ICourse =  {
    id: string,
    title: string,
    tags: string[],
    launchDate: string,
    status: "launched" | "?",
    description: string,
    duration: number,
    lessonsCount: number,
    containsLockedLessons: boolean,
    previewImageLink: boolean,
    rating: number,
    meta: {
        slug: string,
        skills: string[],
        courseVideoPreview: {
            link: string,
            duration: number,
            previewImageLink: string
        }
    }
};

export type CoursePreview ={
    id: string,
    title: string,
    description: string,
    lessonsCount: number,
    imgLink: string,
    rating: number,
    skills: string[],
    link: string,
    courseVideoPreview: {
        link: string,
        duration: number,
        previewImageLink: string
    }
}

