import React, { useEffect } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { useParams } from 'react-router-dom';
import { Course } from '../components/Course';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { CourseDetails } from '../models/Course';
import { fetchCourseDetails } from '../store/reducers/coursesDetails/ActionCreators';


export const CoursePage: React.FC = () => {

    const { id } = useParams();
// console.log(id)
    const { coursesMap, isLoading, error } = useAppSelector(state => state.coursesDetailsReducer);

    const dispatch = useAppDispatch();
    useEffect(() => {
        id && !coursesMap[id] && !isLoading && dispatch(fetchCourseDetails(id));
    }, []);

    const course: CourseDetails | null = id && coursesMap[id] ? coursesMap[id] : null;

    return <Container className='my-5'>
        {course && <Course course={course} />}
    </Container>
}