import React from 'react';
import { Card } from 'react-bootstrap';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { Link } from 'react-router-dom';
import { ICourse } from '../models/Course';

type CoursesListProps = {
    courses: ICourse[],
}

export const CoursesList: React.FC<CoursesListProps> = ({ courses }) => {
    
    return <Row>
        {courses.map(item => (<CourseItem key={item.id} course={item} />))}
    </Row>;
}


type CoursePreviewProps = {
    course: ICourse,
}
const CourseItem: React.FC<CoursePreviewProps> = ({ course }) => {
    
    return ( 
        <Col sx="12" md="4" className="mb-3">
            <Card className="m-2">
                <Card.Img variant="top" src={course.imgLink} />
                <Card.Body>
                    <Card.Title>
                        <Link to={course.link}>{course.title}</Link>
                    </Card.Title>
                    <Card.Text>{course.description}</Card.Text>
                    <small >
                        <b>Skils</b>: {course.skills && course.skills.join(', ')}
                    </small>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">
                        Rating: {course.rating}, 
                        Lessons: {course.lessonsCount}
                    </small>
                </Card.Footer>
            </Card>
        </Col>
    );
}