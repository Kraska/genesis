import React, { useEffect } from 'react';
import { CoursesList } from '../components/CoursesList';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchCourses } from '../store/reducers/courses/ActionCreators';
import { Layout } from './Layout';




export const HomePage: React.FC = () => {

    const { coursesMap, isLoading, error } = useAppSelector(state => state.coursesReducer);

    const dispatch = useAppDispatch();
    useEffect(() => {
        !coursesMap.length && !isLoading && dispatch(fetchCourses());
    }, []);

    // console.log("coursesMap = ", coursesMap)

    return <Layout>
        <>
            <h1 className="mb-5">Eliminate procrastination with your Personal Plan</h1>
            <CoursesList courses={Object.values(coursesMap)} />
        </>
    </Layout>
}