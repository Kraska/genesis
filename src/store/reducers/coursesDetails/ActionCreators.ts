import { AppDispatch } from "../../store";
import { coursesDetailsSlice } from "./CourseDetailsSlice"; 
import { APIError } from "../../../api/APIError";
import { getCourseDetails } from "../../../api/rest/courses";


export const fetchCourseDetails = (courseId: string) => async(dispatch: AppDispatch) => {

    try {
        
        dispatch(coursesDetailsSlice.actions.fatching())
        const course = await getCourseDetails(courseId)
        dispatch(coursesDetailsSlice.actions.fatchingSuccess([courseId, course]));

    } catch(e) {
        dispatch(coursesDetailsSlice.actions.fatchingError(e as APIError))
    }
};
