import React from "react";
import { Preloader } from "../components/Preloader";
import { Layout } from "./Layout";
import useSWR from "swr";
import { getCourses } from "../api/rest/courses";
import { CoursesList } from "../components/CoursesList";

// Render-as-You-Fetch
// https://dev.to/smitterhane/swap-out-useeffect-with-suspense-for-data-fetching-in-react-2leb

const Courses: React.FC = () => {
  const { data, error } = useSWR(["courses"], getCourses, { suspense: true });
  if (error) throw new Error(error);
  return <CoursesList courses={Object.values(data || {})} />;
};

export const HomePageRAYF: React.FC = () => {
  return (
    <Layout>
      <>
        <h1 className="mb-5">
          Eliminate procrastination with your Personal Plan
        </h1>
        <React.Suspense fallback={<Preloader />}>
          <Courses />
        </React.Suspense>
      </>
    </Layout>
  );
};
