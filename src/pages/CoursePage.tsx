import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchCourses } from '../store/reducers/courses/ActionCreators';


export const CoursePage: React.FC = () => {

    const { id } = useParams();

    const { coursesMap, isLoading, error } = useAppSelector(state => state.coursesReducer);

    const dispatch = useAppDispatch();
    useEffect(() => {
        !coursesMap.length && !isLoading && dispatch(fetchCourses());
    }, []);

    const course = id && coursesMap[id]

    return <div>
        {course &&
        <>
            <p>{course.title}</p>
            <div>{course.description}</div>
        </>
        }
    </div>
}