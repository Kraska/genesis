import axios, { AxiosError } from "axios";
// import { AppConfig } from "config";
import { ICourse } from "../../../models/Course";
import { AppDispatch } from "../../store";
import { coursesSlice } from "./CoursesSlice"; 


export const fetchCourses = () => async(dispatch: AppDispatch) => {

    // const token = "";
    const host = "31423469-5d4d-43c6-bb86-b4bcf588022a.mock.pstmn.io";
    try {
        // console.log('fetchCourses')
        dispatch(coursesSlice.actions.fatching())
        const resp = await axios.get<{courses: ICourse[]}>(
            `https://${host}/api/v1/core/preview-courses`, 
            {headers: { 
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${}`,
            }}
        );

        // console.log('resp.data', resp.data.courses)
        const data: Record<string, ICourse> = resp.data.courses
            .reduce<Record<string, ICourse>>(
                (map, item) => {map[item.id] = item; return map},
                {}
            );

        dispatch(coursesSlice.actions.fatchingSuccess(data));
    } catch(e) {
        dispatch(coursesSlice.actions.fatchingError((e as AxiosError).message))
    }
};
