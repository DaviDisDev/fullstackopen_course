import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'


const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [persons, setPersons] = useState([])
  const [originalPersons, setOriginalPersons] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
        setOriginalPersons(response.data);

      })
  }, [])

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    const found = originalPersons.filter(item => item.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))

    setPersons(found)

    setNewSearch(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
      id: 6
    }
    const found = persons.some(person => person.name === newName);

    if (found) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    } else {

      setPersons([...persons, personObject])
      setNewName('')
      setNewNumber('')
    }

  }
  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newSearch={newSearch} handleSearch={handleSearch} />

      <h2>add a new</h2>

      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}

      />

      <h2>Numbers</h2>

      <Persons persons={persons} />
    </div>
  )
}

export default App