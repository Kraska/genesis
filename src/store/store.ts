import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { coursesReducer } from "./reducers/courses/CoursesSlice";
import { coursesDetailsReducer } from "./reducers/coursesDetails/CourseDetailsSlice";

const rootReducer = combineReducers({
    coursesReducer,
    coursesDetailsReducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];