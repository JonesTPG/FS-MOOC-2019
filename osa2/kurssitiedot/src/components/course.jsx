import React from "react";
import Header from "./header";
import Content from "./content";
import Total from "./total";

const Course = ({ course }) => {
  let totalExercises = course.parts.reduce(
    (accumulator, part) => accumulator + part.exercises,
    0
  );
  console.log(totalExercises);

  return (
    <>
      <div>
        <Header course={course.name} />

        <Content contents={course.parts} />

        <Total count={totalExercises} />
      </div>
    </>
  );
};

export default Course;
