import React, { useState, useEffect } from "react";
import Filter from "./components/filter";
import Persons from "./components/persons";
import PersonService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    PersonService.getAll().then(persons => {
      setPersons(persons);
    });
  }, []);

  const deleteItem = id => {
    let personToBeDeleted = persons.find(person => person.id === id);
    let confirmed = window.confirm("Delete " + personToBeDeleted.name + "?");

    if (confirmed === true) {
      PersonService.deletePerson(id).then(deletedPerson => {
        setPersons(persons.filter(person => person.id !== id));
        console.log("person deleted: " + deletedPerson);
      });
    }
  };

  const addItem = event => {
    event.preventDefault();
    let person = persons.find(person => person.name === newName);
    if (person !== undefined) {
      let confirmed = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (confirmed === true) {
        const changedPerson = { ...person, number: newNumber };
        PersonService.update(changedPerson.id, changedPerson).then(
          returnedPerson => {
            setPersons(
              persons.map(person =>
                person.id !== returnedPerson.id ? person : returnedPerson
              )
            );
          }
        );
      }

      setNewName("");
      setNewNumber("");
      return;
    }

    PersonService.create({ name: newName, number: newNumber }).then(
      returnedPerson => {
        setPersons(persons.concat(returnedPerson));
      }
    );
    setNewName("");
    setNewNumber("");
  };

  const filterToApp = newFilter => {
    setFilter(newFilter);
  };

  const handleItemChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filterToApp={filterToApp} />

      <h2>Add a new</h2>

      <form onSubmit={addItem}>
        <div>
          name: <input value={newName} onChange={handleItemChange} />
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons dataList={persons} filter={filter} deleteContact={deleteItem} />
    </div>
  );
};

export default App;
