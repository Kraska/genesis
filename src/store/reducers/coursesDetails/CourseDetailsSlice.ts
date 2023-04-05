import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { APIError } from "../../../api/APIError";
import { ICourseDetails } from "../../../models/ICourseDetails";

type CoursesDetailsSatate = {
  coursesMap: Record<string, ICourseDetails>;
  isLoading: boolean;
  error: APIError | null;
};

const initialState: CoursesDetailsSatate = {
  coursesMap: {},
  isLoading: false,
  error: null,
};

export const coursesDetailsSlice = createSlice({
  name: "coursesDetails",
  initialState,
  reducers: {
    fatching(state) {
      state.isLoading = true;
    },
    fatchingSuccess(state, action: PayloadAction<[string, ICourseDetails]>) {
      const [courseId, course] = action.payload;
      state.isLoading = false;
      state.error = null;
      state.coursesMap[courseId] = course;
    },
    fatchingError(state, action: PayloadAction<APIError>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const coursesDetailsReducer = coursesDetailsSlice.reducer;
