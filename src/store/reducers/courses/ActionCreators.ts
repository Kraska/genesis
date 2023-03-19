import axios, { AxiosError } from "axios";
import { AppRoute } from "../../../AppRoute";
import { AppConfig } from "../../../config";
import { ICourse } from "../../../models/ICourse";
import { IAPICourse } from "../../../models/IAPICourse";
import { AppDispatch } from "../../store";
import { coursesSlice } from "./CoursesSlice"; 
import { convertToAPIError } from "../../../models/APIError";


export const fetchCourses = () => async(dispatch: AppDispatch) => {

    try {
        // console.log('fetchCourses')
        dispatch(coursesSlice.actions.fatching())
        const resp = await axios.get<{courses: IAPICourse[]}>(
            `https://${AppConfig.API_HOST}/api/v1/core/preview-courses1`, 
            {headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${AppConfig.API_TOKEN}`,
            }}
        );

        // console.log('resp.data', resp.data.courses)
        const data: Record<string, ICourse> = resp.data.courses
            .map(convert)
            .reduce<Record<string, ICourse>>(
                (map, item) => {map[item.id] = item; return map},
                {}
            );

        dispatch(coursesSlice.actions.fatchingSuccess(data));
    } catch(e) {
        const error = convertToAPIError(e as AxiosError)
        // const error = { message: "", code: 'ERR_NETWORK'};
        dispatch(coursesSlice.actions.fatchingError(error))
    }
};


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