import React, { useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { Link } from 'react-router-dom';
import { ICourse } from '../models/ICourse';
import { Paginator } from './Paginator';
import { VideoPlayer } from './VideoPlayer';

type CoursesListProps = {
    courses: ICourse[],
}

export const CoursesList: React.FC<CoursesListProps> = ({ courses }) => {
    const countOnPage = 9
    const [ page, setPage ] = useState(1)
    
    const items = courses.slice((page - 1)*countOnPage, page*countOnPage)

    return <>
        <Row>
            {items.map(item => (<CourseItem key={item.id} course={item} />))}
        </Row>
        <Container className='d-flex justify-content-center'>
            <Paginator 
                count={courses.length} 
                countOnPage={countOnPage}
                currentPage={page}
                onChangePage={setPage}
                />
        </Container>
    </>;
}


type CoursePreviewProps = {
    course: ICourse,
}
const CourseItem: React.FC<CoursePreviewProps> = ({ course }) => {
    
    return ( 
        <Col sx="12" lg="6" xl="4" className="mb-3">
            <Link to={course.link} style={{ textDecoration: 'none', color: "inherit" }}>
                <Card className="m-2" data-testid="course-card" style={{ textDecoration: "none"}}>
                    <Card.Img variant="top" src={course.imgLink} style={{paddingBottom: "40px"}} />
                    <VideoOverlay src={course.courseVideoPreview.link} />
                    <Card.Body>
                        <Card.Title>{course.title}</Card.Title>
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
            </Link>
        </Col>
    );
}


type VideoOverlayProps = {
    src: string
}
const VideoOverlay: React.FC<VideoOverlayProps> = ({ src }) => {

    const [ mouseOver, setMouseOver ] = useState(false)

    const className = mouseOver ? "" : "d-none"

    return <Card.ImgOverlay 
        onMouseOver={() => setMouseOver(true)} 
        onMouseLeave={() => setMouseOver(false)}
        >
        <VideoPlayer
            className={className}
            src={src}
            muted
            autoPlay
            style={{ width: "100%", top: 0, left:0, position: "absolute" }} 
        />
    </Card.ImgOverlay> 
}
