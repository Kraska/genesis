import { ICourseDetails, Lesson } from "../models/ICourse";


type Progress = {
    time: number,
    duration: number,
    persent: number,
}

export class ProgressStorage {

    private ls: Storage;
    private course: ICourseDetails;
    private lsKey: string;
    private progressMap: Record<string, Progress>;
    private timesMap: Record<string, number> = {};

    constructor(course: ICourseDetails) {
        this.ls = localStorage
        this.course = course
        this.lsKey = `progress_${course.id}`

        this.progressMap = course.lessons
            .reduce<Record<string, Progress>>((map, { id, duration }) => {
                map[id] = ({ duration, time: 0, persent: 0 })
                return map
            }, {})
    }

    private updateProgress(lessonId: string, time: number) {
        const progress = this.progressMap[lessonId]
        progress.time = time
        progress.persent = Math.round(time*100/progress.duration)
    }

    public load() {
        this.timesMap = JSON.parse(localStorage.getItem(this.lsKey) || "{}")

        Object.entries(this.timesMap)
            .forEach(([id, time]) => {
                // console.log('id, time', id, time)
                this.updateProgress(id, time)
            })
    }

    public save(lesson: Lesson, time: number) {

        this.timesMap[lesson.id] = time
        this.ls.setItem(this.lsKey, JSON.stringify(this.timesMap))

        this.updateProgress(lesson.id, time)
    }

    public getProgress(lesson: Lesson) {
        return this.progressMap[lesson.id]
    }

    public getCourseProgress() {
        const persentArray = Object.values(this.progressMap)
        const persentSum = persentArray
            .map(({ persent }) => persent)
            .reduce((sum, curr) => sum + curr, 0)

        return persentSum / persentArray.length
    }

    public getCurrentLesson() {
        return this.course.lessons
            .find(lesson => 
                lesson.status == 'unlocked' &&
                this.progressMap[lesson.id].persent < 1
            )
    }
}