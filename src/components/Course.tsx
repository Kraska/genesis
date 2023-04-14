import { useEffect, useRef, useState } from "react";
import { Card, Col, Container, ProgressBar, Row } from "react-bootstrap";
import { Lesson } from "../models/Lesson";
import { ICourseDetails } from "../models/ICourseDetails";
import { ProgressStorage } from "../utils/ProgressStorage";
import { VideoPlayer } from "./VideoPlayer";

type CourseProps = {
  course: ICourseDetails;
};

export const Course: React.FC<CourseProps> = ({ course }) => {
  const initLesson = course.lessons.find(({ status }) => status === "unlocked");
  const [currentLesson, setCurrentLesson] = useState(initLesson);

  const progressItems = course.lessons.map(({ id, duration }) => ({
    id,
    duration,
  }));
  const psRef = useRef<ProgressStorage>(
    new ProgressStorage(course.id, progressItems)
  );
  useEffect(() => {
    const progressItem = psRef.current.getCurrentItem();
    progressItem &&
      setCurrentLesson(course.lessons.find(({ id }) => id === progressItem.id));
  }, [course.lessons]);

  const onUpdateTime = (time: number) => {
    currentLesson && psRef.current.saveItemProgress(currentLesson.id, time);
  };

  const currentTime = currentLesson
    ? psRef.current.getItemProgress(currentLesson.id).time
    : 0;

  return (
    <>
      <h1>{course.title}</h1>
      <ProgressBar
        style={{ height: "6px" }}
        variant="success"
        now={psRef.current.getProgress().persent}
      />
      {/* videoSrc = {videoSrc} */}
      <Container className="my-5">
        {currentLesson && (
          <>
            <VideoPlayer
              src={currentLesson.link}
              muted
              autoPlay
              title={currentLesson.title}
              currentTime={currentTime || 0}
              onUpdateTime={onUpdateTime}
              controls
              style={{ width: "100%" }}
            />
          </>
        )}

        <section className="my-5">{course.description}</section>

        <section>
          <Row>
            {course.lessons.map((lesson) => (
              <LessonPreview
                key={lesson.id}
                lesson={lesson}
                onOpen={setCurrentLesson}
                progress={psRef.current.getItemProgress(lesson.id).persent}
              />
            ))}
          </Row>
        </section>
      </Container>
    </>
  );
};

type LessonPreviewProps = {
  lesson: Lesson;
  onOpen: (lesson: Lesson) => void;
  progress?: number;
};

const LessonPreview: React.FC<LessonPreviewProps> = ({
  lesson,
  onOpen,
  progress,
}) => {
  // todo move to another place
  const imgUrl = `${lesson.previewImageLink}/lesson-${lesson.order}.webp`;

  const onClick = () => {
    lesson.status === "unlocked" && onOpen(lesson);
  };

  const isLocked = lesson.status === "locked";
  const className = isLocked ? "my-3 opacity-50" : "my-3";

  return (
    <Col sx="12" md="4">
      <Card
        className={className}
        onClick={onClick}
        style={{ cursor: "pointer" }}
      >
        <Card.Img variant="top" src={imgUrl} />
        <Card.Body>
          <Card.Title>{lesson.title}</Card.Title>
          <ProgressBar
            style={{ height: "4px" }}
            variant="success"
            now={progress}
          />
        </Card.Body>
      </Card>
    </Col>
  );
};
