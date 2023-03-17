import { RefObject, useEffect, useRef, useState } from "react"
import { Button, Card, Col, Container, ProgressBar, Row } from "react-bootstrap"
import { ICourseDetails, Lesson } from "../models/Course"
import { ProgressStorage } from "../utils/ProgressStorage"
import { VideoPlayer } from "./VideoPlayer"


type CourseProps = {
    course: ICourseDetails
}

export const Course: React.FC<CourseProps> = ({ course }) => {

    // console.log(course)
    // const launchDate = new Date(course.launchDate).toLocaleDateString("en-US");

    const videoRef = useRef<VideoPlayer>(null);

    const initLesson = course.lessons
        .find(({ status }) => status === "unlocked")        
    const [ currentLesson, setCurrentLesson ] = useState(initLesson)

    const psRef = useRef<ProgressStorage>(new ProgressStorage(course))
    useEffect(() => { 
        psRef.current.load()
        const lesson = psRef.current.getCurrentLesson() 
        lesson && setCurrentLesson(lesson)
    }, [])

    const onOpenLesson = (lesson: Lesson) => {
        const time = videoRef.current?.getCurrentTime();
        time && onPause(time)
        setCurrentLesson(lesson)
    }

    const onPause = (time: number) => {        
        currentLesson &&
        psRef.current.save(currentLesson, time)
    }
    
    const currentTime = currentLesson ? 
        psRef.current.getProgress(currentLesson).time : 0;

    return  <>
        <h1>{course.title}</h1>
        <ProgressBar 
            style={{height: "6px"}} 
            variant="success"  
            now={psRef.current.getCourseProgress()} 
            />
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
                <div className="d-flex justify-content-between">
                    <h4>{currentLesson.title}</h4> 
                    <PIPBtn videoRef={videoRef} />
                </div>
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
                            progress={psRef.current.getProgress(lesson).persent}
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
                <ProgressBar style={{height: "4px"}} variant="success" now={progress} />
            </Card.Body>
        </Card>
    </Col>
}


type PIPBtnProps = {
    videoRef: RefObject<VideoPlayer>,
}
const PIPBtn: React.FC<PIPBtnProps> = ({ videoRef }) => {

    const initTitle = "Go to picture in picture"
    const [ disabled, setDisabled ] = useState(false)
    const [ title, setTitle ] = useState(initTitle) 

    useEffect(() => {

        videoRef.current?.addListener(
            'enterpictureinpicture',
            () => {
                setDisabled(true)
                setTitle("Now in picture in picture")
            }
        )
        videoRef.current?.addListener(
            'leavepictureinpicture',
            () => {
                setDisabled(false)
                setTitle(initTitle)
            }
        )

    }, [])

    return <Button 
        variant="outline-secondary"
        onClick={() => {videoRef.current?.switchPictureInPicture()}}
        disabled={disabled}
        >
        {title}
    </Button>
}
