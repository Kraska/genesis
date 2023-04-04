
export type ProgressItem = {
    id: string,
    duration: number,
}

export type Progress = {
    time: number,
    duration: number,
    persent: number,
}


export class ProgressStorage {

    private ls: Storage
    private items: ProgressItem[]
    private lsKey: string
    private progressMap: Record<string, Progress>
    private timesMap: Record<string, number> = {}

    constructor(
        id: string,
        items: ProgressItem[],
        keyPrefix: string = 'progress_'
    ) {
        this.ls = localStorage
        this.items = items
        this.lsKey = keyPrefix + id

        this.progressMap = items
            .reduce<Record<string, Progress>>((map, { id, duration }) => {
                map[id] = ({ duration, time: 0, persent: 0 })
                return map
            }, {})

        this.load()
    }

    private load(): void {
        this.timesMap = JSON.parse(localStorage.getItem(this.lsKey) || "{}")

        Object.entries(this.timesMap)
            .forEach(([id, time]) => this.updateItemProgress(id, time))
    }

    private updateItemProgress(lessonId: string, time: number): void {
        const progress = this.progressMap[lessonId]
        progress.time = time
        progress.persent = Math.round(time*100/progress.duration)
    }

    public saveItemProgress(itemId: string, time: number): void {
        this.timesMap[itemId] = time
        this.updateItemProgress(itemId, time)
        this.ls.setItem(this.lsKey, JSON.stringify(this.timesMap))
    }

    public getItemProgress(itemId: string): Progress {
        return this.progressMap[itemId]
    }

    public getProgress(): Progress {
        const progress = Object.values(this.progressMap)
            .reduce(( common, { time, duration }) => {
                common.time += time
                common.duration += duration
                return common
            }, { time: 0, duration: 0, persent: 0 })

        progress.persent = Math.round(progress.time*100/progress.duration)

        return progress
    }

    public getCurrentItem(excludedIds: string[] = []): ProgressItem | null {
        return this.items
            .find(({ id }) => !excludedIds.includes(id) && 
                this.progressMap[id].persent < 100) || null
    }
}