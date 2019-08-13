import React from "react";
import Person from "./person";

const Persons = ({ dataList, filter, deleteContact }) => {
  const list = () =>
    dataList
      .filter(person =>
        person.name.toLowerCase().startsWith(filter.toLowerCase())
      )
      .map(person => (
        <Person key={person.name} data={person} deletePerson={deleteContact} />
      ));

  return <>{list()}</>;
};

export default Persons;
