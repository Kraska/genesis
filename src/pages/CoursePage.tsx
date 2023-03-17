import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Course } from '../components/Course';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { ICourseDetails } from '../models/Course';
import { fetchCourseDetails } from '../store/reducers/coursesDetails/ActionCreators';
import { Layout } from './Layout';


export const CoursePage: React.FC = () => {

    const { id } = useParams();
// console.log(id)
    const { coursesMap, isLoading, error } = useAppSelector(state => state.coursesDetailsReducer);

    const dispatch = useAppDispatch();
    useEffect(() => {
        id && !coursesMap[id] && !isLoading && dispatch(fetchCourseDetails(id));
    }, []);

    const course: ICourseDetails | null = id && coursesMap[id] ? coursesMap[id] : null;

    return <Layout>
        {course && <Course course={course} />}
    </Layout>
}