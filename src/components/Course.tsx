import { Card, Col, Container, Row } from "react-bootstrap"
import { CourseDetails, Lesson } from "../models/Course"


type CourseProps = {
    course: CourseDetails
}

export const Course: React.FC<CourseProps> = ({ course }) => {

    console.log(course)

    const launchDate = new Date(course.launchDate).toLocaleDateString("en-US");
    const videoSrc = course.lessons[0].link


    return  <>
        <h1>{course.title}</h1>
        videoSrc = {videoSrc}
        <Container className='my-5'>
            <video controls autoPlay muted style={{ width: "100%" }}>
                <source src={videoSrc} />
            </video>

            <section className='my-3'>
                <div className="text-muted">
                <b>Skils:</b> {course.meta.skills.join(', ')}
                </div>
            </section>
            <section className='my-3'>
                <div className="text-muted">
                <b>Launch date:</b> {launchDate}
                </div>
            </section>

            <section className='my-5'>
                {course.description}    
            </section>

            <section>
                <Row>
                   {course.lessons.map(lesson => (<LessonPreview key={lesson.id} lesson={lesson} />))} 
                </Row>
            </section>
            
        </Container>
    </>;
}


type LessonPreviewProps = {
    lesson: Lesson,
}

const LessonPreview: React.FC<LessonPreviewProps> = ({ lesson }) => {
    
    // todo move to another place
    const imgUrl = `${lesson.previewImageLink}/lesson-${lesson.order}.webp`;

    const isLocked = lesson.status === 'locked';
    const className = isLocked ? 'my-3 opacity-50' : 'my-3';

    return <Col sx="12" md="4">
        <Card className={className}>
            <Card.Img variant="top" src={imgUrl} />
            <Card.Body>
                <Card.Title>{lesson.title}</Card.Title>
            </Card.Body>
        </Card>
    </Col>
}