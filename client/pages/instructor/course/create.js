import React from "react";
import InstructorRoute from "../../../component/routes/InstructorRoute";
import { useState, useEffect } from "react";
import axios from "axios";
import { Select, Button } from "antd";
const { Option } = Select;
import CourseCreateForm from "../../../component/forms/CourseCreateForm";

const CourseCreate = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "9.99",
    uploading: false,
    paid: true,
    loading: false,
    imagePreview: "",
  });
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = () => {
    //
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <InstructorRoute>
      <h1 className="jumbotron text-center square">
        Instructor Course Create!
      </h1>

      <div className="pt-3 pb-3">
        <CourseCreateForm
          handleChange={handleChange}
          handleImage={handleImage}
          handleSubmit={handleSubmit}
          values={values}
          setValues={setValues}
        />
      </div>
    </InstructorRoute>
  );
};

export default CourseCreate;
