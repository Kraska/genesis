import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { AppRoute } from '../AppRoute';
import { CoursesList } from '../components/CoursesList';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { CoursePreview, ICourse } from '../models/Course';
import { fetchCourses } from '../store/reducers/courses/ActionCreators';


const convertCourseToPreview = (course: ICourse): CoursePreview => {
    
    const { 
        id, 
        title,
        description, 
        lessonsCount, 
        previewImageLink, 
        rating, 
        meta 
    } = course;

    const coursePreview = {
        id, 
        title,
        description, 
        lessonsCount, 
        rating, 
        link: `${AppRoute.COURSES}/${id}` ,
        imgLink: `${previewImageLink}/cover.webp`, 
        skills: meta.skills,
        courseVideoPreview: meta.courseVideoPreview
    }

    return coursePreview;
}

export const HomePage: React.FC = () => {

    const { coursesMap, isLoading, error } = useAppSelector(state => state.coursesReducer);

    const dispatch = useAppDispatch();
    useEffect(() => {
        !coursesMap.length && !isLoading && dispatch(fetchCourses());
    }, []);

    console.log("coursesMap = ", coursesMap)

    const courses=Object.values(coursesMap).map(item => convertCourseToPreview(item))

    return <Container className="my-5">
        <CoursesList courses={courses} />
    </Container>
}