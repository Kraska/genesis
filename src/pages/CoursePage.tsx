import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Alert } from "../components/Alert";
import { Course } from "../components/Course";
import { Preloader } from "../components/Preloader";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { ICourseDetails } from "../models/ICourseDetails";
import { fetchCourseDetails } from "../store/reducers/coursesDetails/ActionCreators";
import { Layout } from "./Layout";

export const CoursePage: React.FC = () => {
  const { id } = useParams();

  const { coursesMap, isLoading, error } = useAppSelector(
    (state) => state.coursesDetailsReducer
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    id && !coursesMap[id] && !isLoading && dispatch(fetchCourseDetails(id));
  }, []);

  const course: ICourseDetails | null =
    id && coursesMap[id] ? coursesMap[id] : null;

  return (
    <Layout>
      {isLoading ? (
        <Preloader />
      ) : error ? (
        <Alert error={error} />
      ) : (
        course && <Course course={course} />
      )}
    </Layout>
  );
};
