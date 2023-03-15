import React from 'react';
import { Link } from 'react-router-dom';
import { CoursePreview } from '../models/Course';

type CoursesListProps = {
    courses: CoursePreview[],
}

export const CoursesList: React.FC<CoursesListProps> = ({ courses }) => {
    
    return <ul>
        {courses.map(item => (<CourseItem key={item.id} course={item} />))}
    </ul>;
}


type CoursePreviewProps = {
    course: CoursePreview,
}
const CourseItem: React.FC<CoursePreviewProps> = ({ course }) => {
    
    return ( 
        <li>
            <Link to={course.link}>{course.title}</Link>
        </li>
    );
}