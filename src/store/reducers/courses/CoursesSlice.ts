import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ICourse } from "../../../models/ICourse"


type CoursesSatate = {
    coursesMap: Record<string, ICourse>,
    isLoading: boolean,
    error: string,
}

const initialState: CoursesSatate = {
    coursesMap: {},
    isLoading: false,
    error: '',
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
            state.error = '';
            state.coursesMap = action.payload;
        },
        fatchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export const coursesReducer = coursesSlice.reducer;