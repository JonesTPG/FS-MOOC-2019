import React from "react";
import Header from "./header";
import Content from "./content";
import Total from "./total";

const Course = ({ course }) => {
  return (
    <>
      <div>
        <Header course={course.name} />

        <Content contents={course.parts} />

        <Total
          total={
            course.parts[0].exercises +
            course.parts[1].exercises +
            course.parts[2].exercises
          }
        />
      </div>
    </>
  );
};

export default Course;
