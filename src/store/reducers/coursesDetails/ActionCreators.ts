import axios, { AxiosError } from "axios";
import { ICourseDetails } from "../../../models/ICourseDetails";
import { AppDispatch } from "../../store";
import { coursesDetailsSlice } from "./CourseDetailsSlice"; 
import { AppConfig } from "../../../config";
import { convertToAPIError } from "../../../models/APIError";


export const fetchCourseDetails = (courseId: string) => async(dispatch: AppDispatch) => {

    try {
        dispatch(coursesDetailsSlice.actions.fatching())
        const resp = await axios.get<ICourseDetails>(
            `https://${AppConfig.API_HOST}/api/v1/core/preview-courses/${courseId}`, 
            {headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${AppConfig.API_TOKEN}`,
            }}
        );

        //console.log('resp.data', resp.data)

        dispatch(coursesDetailsSlice.actions.fatchingSuccess([courseId, resp.data]));
    } catch(e) {
        const error = convertToAPIError(e as AxiosError)
        // const error = { message: "", code: 'ERR_NETWORK'};
        dispatch(coursesDetailsSlice.actions.fatchingError(error))
    }
};
