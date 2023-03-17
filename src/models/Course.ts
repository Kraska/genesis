export type IAPICourse =  {
    id: string,
    title: string,
    tags: string[],
    launchDate: string,
    status: "launched" | "...",
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

export type ICourse ={
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


export type Lesson =  {
    id: string,
    title: string,
    duration: number,
    order: number,
    type: "video" | "text",
    status: "unlocked" | "locked",
    link: string, //"https://wisey.app/videos/lack-of-motivation-how-to-overcome-it/lesson-1/AppleHLS1/lesson-1.m3u8",
    previewImageLink: string, //"https://wisey.app/assets/images/web/lessons-covers/lack-of-motivation-how-to-overcome-it/lesson-1",
    meta: null | {}
}


export type CourseDetails = IAPICourse & {
    containsLockedLessons?: boolean, 
    previewImageLink?: boolean,
    lessons: Lesson[]
}

