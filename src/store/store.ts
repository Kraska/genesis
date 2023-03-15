import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { coursesReducer } from "./reducers/courses/CoursesSlice";

const rootReducer = combineReducers({
    coursesReducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];