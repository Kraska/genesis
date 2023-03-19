import React, { useEffect } from 'react';
import { Alert } from '../components/Alert';
import { CoursesList } from '../components/CoursesList';
import { Preloader } from '../components/Preloader';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchCourses } from '../store/reducers/courses/ActionCreators';
import { Layout } from './Layout';


export const HomePage: React.FC = () => {

    const { coursesMap, isLoading, error } = useAppSelector(state => state.coursesReducer)

    const dispatch = useAppDispatch();
    useEffect(() => { 
        !Object.values(coursesMap).length && 
        !isLoading && 
        dispatch(fetchCourses());
    }, []);

    return <Layout>
        <>
            <h1 className="mb-5">Eliminate procrastination with your Personal Plan</h1>
            {isLoading ?
                <Preloader /> :
                error ? <Alert error={error} /> :
                    <CoursesList courses={Object.values(coursesMap)} />   
            }
        </>
    </Layout>
}