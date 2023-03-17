import { CourseDetails, Lesson } from "../models/Course";


export class ProgressStorage {

    private ls: Storage;
    private course: CourseDetails;
    private lsKey: string;
    private progressMap: Record<string, number> = {};

    constructor(course: CourseDetails) {
        this.ls = localStorage
        this.course = course
        this.lsKey = `progress_${course.id}`
    }

    public load() {
        this.progressMap = JSON.parse(localStorage.getItem(this.lsKey) || "{}")
    }

    public save(lesson: Lesson, time: number) {
        this.progressMap[lesson.id] = time
        this.ls.setItem(this.lsKey, JSON.stringify(this.progressMap))
    }

    public getProgress(lesson: Lesson) {
        return this.progressMap[lesson.id]
    }

    public getProgressPersent(lesson: Lesson) {
        return Math.round(this.progressMap[lesson.id]*100/lesson.duration)
    }

    public getCourseProgress() {

        const lessonsDuration = this.course.lessons
            .map(({ duration }) => duration)
            .reduce((sum, curr) => sum + curr, 0)

        const lessonsProgress = Object.values(this.progressMap)
            .reduce((sum, curr) => sum + curr, 0)
            
        return Math.round(lessonsProgress*100 / lessonsDuration)
    }
}