import axios, { AxiosError } from "axios";
import { CourseDetails } from "../../../models/Course";
import { AppDispatch } from "../../store";
import { coursesDetailsSlice } from "./CourseDetailsSlice"; 
import { AppConfig } from "../../../config";


export const fetchCourseDetails = (courseId: string) => async(dispatch: AppDispatch) => {

    try {
        dispatch(coursesDetailsSlice.actions.fatching())
        const resp = await axios.get<CourseDetails>(
            `https://${AppConfig.API_HOST}/api/v1/core/preview-courses/${courseId}`, 
            {headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${AppConfig.API_TOKEN}`,
            }}
        );

        //console.log('resp.data', resp.data)

        dispatch(coursesDetailsSlice.actions.fatchingSuccess([courseId, resp.data]));
    } catch(e) {
        dispatch(coursesDetailsSlice.actions.fatchingError((e as AxiosError).message))
    }
};
