import { ICourse } from "../../../models/ICourse";
import { AppDispatch } from "../../store";
import { coursesSlice } from "./CoursesSlice";
import { APIError } from "../../../api/APIError";
import { getCoursesMap } from "../../../api/rest/courses";

export const fetchCourses = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(coursesSlice.actions.fatching());
    const data: Record<string, ICourse> = await getCoursesMap();
    dispatch(coursesSlice.actions.fatchingSuccess(data));
  } catch (e) {
    dispatch(coursesSlice.actions.fatchingError(e as APIError));
  }
};
