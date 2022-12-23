import React from "react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import SingleCourseJumbotron from "../../component/Cards/SingleCourseJumbotron";
import PreviewModal from "../../component/modal/PreviewModal";
import SingleCourseLessons from "../../component/Cards/SingleCourseLessons";
import AuthContext from "../../context/AuthContext";

const SingleCourse = ({ course }) => {
  // state
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState({});
  // context
  const {
    state: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    if (user && course) checkEnrollment();
  }, [user, course]);

  const checkEnrollment = async () => {
    const { data } = await axios.get(`/api/check-enrollment/${course._id}`);
    console.log("CHECK ENROLLMENT", data);
    setEnrolled(data);
  };

  const router = useRouter();
  const { slug } = router.query;

  const handlePaidEnrollment = () => {
    console.log("handle paid enrollment");
  };

  const handleFreeEnrollment = () => {
    console.log("handle free enrollment");
  };


  return (
    <>
      <SingleCourseJumbotron
       course={course}
       showModal={showModal}
       setShowModal={setShowModal}
       preview={preview}
       setPreview={setPreview}
       user={user}
       loading={loading}
       handlePaidEnrollment={handlePaidEnrollment}
       handleFreeEnrollment={handleFreeEnrollment}
       enrolled={enrolled}
       setEnrolled={setEnrolled} 
      />

      <PreviewModal
        showModal={showModal}
        setShowModal={setShowModal}
        preview={preview}
      />
      {course.lessons && (
        <SingleCourseLessons
          lessons={course.lessons}
          setPreview={setPreview}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};

export async function getServerSideProps({ query }) {
  const { data } = await axios.get(`${process.env.API}/course/${query.slug}`);
  return {
    props: {
      course: data,
    },
  };
}

export default SingleCourse;
