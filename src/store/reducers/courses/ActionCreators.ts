import axios, { AxiosError } from "axios";
import { AppRoute } from "../../../AppRoute";
import { AppConfig } from "../../../config";
import { ICourse, IAPICourse } from "../../../models/ICourse";
import { AppDispatch } from "../../store";
import { coursesSlice } from "./CoursesSlice"; 


export const fetchCourses = () => async(dispatch: AppDispatch) => {

    try {
        // console.log('fetchCourses')
        dispatch(coursesSlice.actions.fatching())
        const resp = await axios.get<{courses: IAPICourse[]}>(
            `https://${AppConfig.API_HOST}/api/v1/core/preview-courses`, 
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
        dispatch(coursesSlice.actions.fatchingError((e as AxiosError).message))
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