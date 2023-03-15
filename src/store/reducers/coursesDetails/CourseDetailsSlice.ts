import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CourseDetails } from "../../../models/Course"


type CoursesDetailsSatate = {
    coursesMap: Record<string, CourseDetails>,
    isLoading: boolean,
    error: string,
}

const initialState: CoursesDetailsSatate = {
    coursesMap: {},
    isLoading: false,
    error: '',
}

export const coursesDetailsSlice = createSlice({
    name: 'coursesDetails',
    initialState,
    reducers: {
        fatching(state) {
            state.isLoading = true;
        },
        fatchingSuccess(
            state, 
            action: PayloadAction<[string, CourseDetails]>
        ) {
            const [ courseId, course ] = action.payload;
            state.isLoading = false;
            state.error = '';
            state.coursesMap[courseId] = course;
        },
        fatchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export const coursesDetailsReducer = coursesDetailsSlice.reducer;