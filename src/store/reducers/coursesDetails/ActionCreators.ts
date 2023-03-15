import axios, { AxiosError } from "axios";
import { CourseDetails } from "../../../models/Course";
import { AppDispatch } from "../../store";
import { coursesDetailsSlice } from "./CourseDetailsSlice"; 


export const fetchCourseDetails = (courseId: string) => async(dispatch: AppDispatch) => {

    // const token = "";
    const host = "31423469-5d4d-43c6-bb86-b4bcf588022a.mock.pstmn.io";
    try {
        dispatch(coursesDetailsSlice.actions.fatching())
        const resp = await axios.get<CourseDetails>(
            `https://${host}/api/v1/core/preview-courses/${courseId}`, 
            {headers: { 
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${}`,
            }}
        );

        //console.log('resp.data', resp.data)

        dispatch(coursesDetailsSlice.actions.fatchingSuccess([courseId, resp.data]));
    } catch(e) {
        dispatch(coursesDetailsSlice.actions.fatchingError((e as AxiosError).message))
    }
};
