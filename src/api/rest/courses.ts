import { AxiosError } from "axios";
import { AppRoute } from "../../AppRoute";
import { AppConfig } from "../../config";
import { convertToAPIError } from "../APIError";
import { IAPICourse } from "../../models/IAPICourse";
import { ICourse } from "../../models/ICourse";
import makeRequest from "../makeRequest";
import { ICourseDetails } from "../../models/ICourseDetails";

export const getCourses = async(): Promise<Record<string, ICourse>> => {

    try {
        const url = `https://${AppConfig.API_HOST}/api/v1/core/preview-courses`
        const resp = await makeRequest<{courses: IAPICourse[]}>({ url })

        const data: Record<string, ICourse> = resp.data.courses
            .map(convert)
            .reduce<Record<string, ICourse>>(
                (map, item) => {map[item.id] = item; return map},
                {}
            );

        return data

    } catch(e) {
        throw convertToAPIError(e as AxiosError)
    }
}


export const getCourseDetails = async(courseId: string): Promise<ICourseDetails> => {

    try {
        const url = `https://${AppConfig.API_HOST}/api/v1/core/preview-courses/${courseId}`
        const resp = await makeRequest<ICourseDetails>({ url })
        return resp.data

    } catch(e) {
        throw convertToAPIError(e as AxiosError)
    }
}

const convert = (course: IAPICourse): ICourse => {
    
    const { 
        id, 
        title,
        description, 
        lessonsCount, 
        previewImageLink, 
        rating, 
        meta 
    } = course;

    const coursePreview = {
        id, 
        title,
        description, 
        lessonsCount, 
        rating, 
        link: `${AppRoute.COURSES}/${id}` ,
        imgLink: `${previewImageLink}/cover.webp`, 
        skills: meta.skills,
        courseVideoPreview: meta.courseVideoPreview
    }

    return coursePreview;
}