import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { APIError } from "../../../api/APIError"
import { ICourse } from "../../../models/ICourse"


type CoursesSatate = {
    coursesMap: Record<string, ICourse>,
    isLoading: boolean,
    error: APIError | null,
}

const initialState: CoursesSatate = {
    coursesMap: {},
    isLoading: false,
    error: null,
}

export const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        fatching(state) {
            state.isLoading = true;
        },
        fatchingSuccess(
            state, 
            action: PayloadAction<Record<string, ICourse>>
        ) {
            state.isLoading = false;
            state.error = null;
            state.coursesMap = action.payload;
        },
        fatchingError(state, action: PayloadAction<APIError>) {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export const coursesReducer = coursesSlice.reducer;