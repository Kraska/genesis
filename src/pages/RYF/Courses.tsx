import { getCourses } from "../../api/rest/courses";
import { CoursesList } from "../../components/CoursesList";
import { ICourse } from "../../models/ICourse";

let status = "pending";
let result: ICourse[];

const getData = fetchCourses();

const Courses: React.FC = () => {
  return <CoursesList courses={getData() || []} />;
};

function fetchCourses() {
  //todo return array instead of map
  const fetching = getCourses()
    .then((res) => Object.values(res))
    .then((success) => {
      status = "fulfilled";
      result = success;
    })
    .catch((error) => {
      status = "rejected";
      result = error;
    });

  return () => {
    if (status === "pending") {
      throw fetching; // Suspend(A way to tell React data is still fetching)
    } else if (status === "rejected") {
      throw result; // Result is an error
    } else if (status === "fulfilled") {
      return result; // Result is a fulfilled promise
    } else {
      throw new Error(`Wrong status "${status}"`);
    }
  };
}

export default Courses;
