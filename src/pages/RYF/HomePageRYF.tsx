import React from "react";
import { Preloader } from "../../components/Preloader";
import Courses from "./Courses";
import { Layout } from "../Layout";

// Render-as-You-Fetch
// https://dev.to/smitterhane/swap-out-useeffect-with-suspense-for-data-fetching-in-react-2leb
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
