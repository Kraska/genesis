import React from "react";
import { Route, Routes } from "react-router-dom";
import { AppRoute } from "./AppRoute";
import { CoursePage } from "./pages/CoursePage";
import { HomePageRAYF } from "./pages/HomePageRYF";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Routes>
      <Route path={AppRoute.HOME} element={<HomePageRAYF />} />
      <Route path={`${AppRoute.COURSES}/:id`} element={<CoursePage />} />
    </Routes>
  );
}

export default App;
