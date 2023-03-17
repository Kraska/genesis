import { useEffect, useRef, useState } from "react"
import { Card, Col, Container, ProgressBar, Row } from "react-bootstrap"
import { CourseDetails, Lesson } from "../models/Course"
import { VideoPlayer } from "./VideoPlayer"


type CourseProps = {
    course: CourseDetails
}

export const Course: React.FC<CourseProps> = ({ course }) => {

    // console.log(course)
    // const launchDate = new Date(course.launchDate).toLocaleDateString("en-US");

    const progressStorageKey = `progress_${course.id}`

    const progressRef = useRef<Record<string, number>>({})
    useEffect(() => {
        const progressMap = JSON.parse(localStorage.getItem(progressStorageKey) || "{}");
        progressRef.current = progressMap
    }, []);

    const videoRef = useRef<VideoPlayer>(null);

    const initLesson = course.lessons
        .find(({ status }) => status === "unlocked")        
    const [ currentLesson, setCurrentLesson ] = useState(initLesson)

    const onOpenLesson = (lesson: Lesson) => {
        const time = videoRef.current?.getCurrentTime();
        time && onPause(time)
        setCurrentLesson(lesson)
    }

    const onPause = (time: number) => {
        progressRef.current[currentLesson!.id] = time
        localStorage.setItem(progressStorageKey, JSON.stringify(progressRef.current));
    }
    
    const currentTime = currentLesson ? progressRef.current[currentLesson.id] : 0;

    return  <>
        <h1>{course.title}</h1>
        {/* videoSrc = {videoSrc} */}
        <Container className='my-5'>
            {currentLesson && <>
                <VideoPlayer
                    id={currentLesson.id}
                    src={currentLesson.link}
                    autoPlay
                    onPause={onPause}
                    currentTime={currentTime || 0}
                    controls 
                    style={{ width: "100%" }} 
                    ref={videoRef}
                />
                <h4>{currentLesson.title}</h4>
            </>}
            
            {/* <section className='my-3'>
                <div className="text-muted">
                <b>Skils:</b> {course.meta.skills.join(', ')}
                </div>
            </section>
            <section className='my-3'>
                <div className="text-muted">
                <b>Launch date:</b> {launchDate}
                </div>
            </section> */}

            <section className='my-5'>
                {course.description}    
            </section>

            <section>
                <Row>
                    {course.lessons.map(lesson => 
                        (<LessonPreview 
                            key={lesson.id} 
                            lesson={lesson} 
                            onOpen={onOpenLesson} 
                            progress={progressRef.current[lesson.id]}
                            />))
                    } 
                </Row>
            </section>
            
        </Container>
    </>;
}


type LessonPreviewProps = {
    lesson: Lesson,
    onOpen: (lesson: Lesson) => void, 
    progress?: number
}

const LessonPreview: React.FC<LessonPreviewProps> = ({ lesson, onOpen, progress }) => {
    
    // todo move to another place
    const imgUrl = `${lesson.previewImageLink}/lesson-${lesson.order}.webp`;

    const onClick = () => {
        lesson.status == "unlocked" && onOpen(lesson)
    }

    const isLocked = lesson.status === 'locked';
    const className = isLocked ? 'my-3 opacity-50' : 'my-3';

    return <Col sx="12" md="4">
        <Card className={className} onClick={onClick}>
            <Card.Img variant="top" src={imgUrl} />
            <Card.Body>
                <Card.Title>{lesson.title}</Card.Title>
                <LessonProgress lesson={lesson} progress={progress} />
            </Card.Body>
        </Card>
    </Col>
}



type LessonProgressProps = {
    lesson: Lesson,
    progress?: number
}
const LessonProgress: React.FC<LessonProgressProps> = ({ lesson, progress =0 }) => {
    const now = Math.round(progress*100/lesson.duration)
    // console.log('progress', progress, lesson.duration, now)
    return <ProgressBar style={{height: "4px"}} variant="success" now={now} />
}