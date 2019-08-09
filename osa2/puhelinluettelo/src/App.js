import React, { useState } from "react";
import Filter from "./components/filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "0504043908" }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const addItem = event => {
    event.preventDefault();

    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
      return;
    }
    setPersons(persons.concat({ name: newName, number: newNumber }));
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

  const items = () =>
    persons.map(person => (
      <p key={person.name}>
        {person.name} {person.number}
      </p>
    ));

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
      {items()}
    </div>
  );
};

export default App;
