import { ICourse } from "../../../models/ICourse";
import { AppDispatch } from "../../store";
import { coursesSlice } from "./CoursesSlice";
import { APIError } from "../../../api/APIError";
import { getCourses } from "../../../api/rest/courses";

export const fetchCourses = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(coursesSlice.actions.fatching());
    const data: Record<string, ICourse> = await getCourses();
    dispatch(coursesSlice.actions.fatchingSuccess(data));
  } catch (e) {
    dispatch(coursesSlice.actions.fatchingError(e as APIError));
  }
};
