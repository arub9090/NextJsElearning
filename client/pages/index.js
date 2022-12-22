
import axios from "axios";
import { useEffect, useState } from "react";
import CourseCard from "../component/Cards/CourseCard";

function index() {

 const [courses, setCourses] = useState([]) 
 useEffect(() => {
  const fetchCourses= async()=>{
    const {data}= await axios.get("/api/courses");
    setCourses(data)
  }

  fetchCourses()

 }, [])
 
  return (
    <>
      <h1 className="jumbotron bg-primary squre text-center display-4">Welcome to Edemy!</h1>
      <div className="container-fluid">
        <div className="row pt-2">
          {courses.map((course) => (
            <div key={course._id} className="col-md-4">
              <CourseCard key={course._id} course={course} />
              {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default index;
