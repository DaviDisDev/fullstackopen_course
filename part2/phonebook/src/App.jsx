import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import PersonService from './services/PersonService'




const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [persons, setPersons] = useState([])
  const [originalPersons, setOriginalPersons] = useState([]);

  useEffect(() => {

    PersonService
      .getAll()
      .then(response => {
        console.log(response)
        setPersons(response);
        setOriginalPersons(response);

      })
      .catch(error => {
        console.log(error)
      })

  }, [])
  const handleDelete = (id, name) => {

    if (confirm(`Delete ${name}?`) == true) {
      PersonService
        .deleteContact(id)
        .then(response => {
          setPersons([...persons.filter(person => person.id != id)])
        })
        .catch(error => {
          console.log(error)
        })
    }

  }
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
    const newID = (persons[persons.length - 1]["id"]) + 1


    const personObject = {
      name: newName,
      number: newNumber,
      id: newID
    }
    const found = persons.find(person => person.name === newName);

    if (found) {
      if (confirm(`${newName} is already added to phonebook,reeplace the old number with the new one?`)) {

        const changedNumber = { ...found, number: personObject["number"] }
        console.log(changedNumber)

        PersonService
          .update(found["id"], changedNumber)
          .then(returnedNote => {

            setPersons(persons.map(person => person.id !== returnedNote.id ? person : returnedNote))

          })

      } else {
        setNewName('')
        setNewNumber('')
      }

    } else {
      PersonService
        .create(personObject)
        .then(response => {
          setPersons([...persons.concat(response)])
          setOriginalPersons([...persons.concat(response)])

        })

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

      <Persons persons={persons} handleDelete={handleDelete} />
    </div>
  )
}

export default App