import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import PersonService from './services/PersonService'
import Notification from './components/Notification'




const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [persons, setPersons] = useState([])
  const [originalPersons, setOriginalPersons] = useState([]);
  const [message, setmessage] = useState(null)
  const [classMessage, setClassMessage] = useState(null)

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
          setmessage(` ${name} has  removed from server`);
          setClassMessage('success');

          setTimeout(() => {
            setmessage(null);
            setClassMessage(null);
          }, 5000);
        })
        .catch(error => {
          setmessage(`The information of  ${name} has alredy removed from server`);
          setClassMessage('error');

          setTimeout(() => {
            setmessage(null);
            setClassMessage(null);
          }, 5000);
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

    setPersons([...found])

    setNewSearch(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }
    const found = persons.find(person => person.name === newName);

    if (found) {
      if (confirm(`${newName} is already added to phonebook,reeplace the old number with the new one?`)) {

        const changedNumber = { ...found, number: personObject["number"] }
        setNewName('')
        setNewNumber('')

        PersonService
          .update(found["id"], changedNumber)
          .then(returnedNote => {

            setPersons(persons.map(person => person.id !== returnedNote.id ? person : returnedNote))
            setmessage(`Update : ${newName}`);
            setClassMessage('success');
            setTimeout(() => {
              setmessage(null);
              setClassMessage(null);
            }, 5000);

          })
          .catch(error => {
            console.log(error)
            setmessage(error.message);
            setClassMessage('error');

            setTimeout(() => {
              setmessage(null);
              setClassMessage(null);
            }, 5000);
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
          setmessage(`Added : ${newName}`);
          setClassMessage('success');
        })
        .catch(error => {
          console.log(error)
          setmessage(error.message);
          setClassMessage('error');

        });

      setNewName('');
      setNewNumber('');

      setTimeout(() => {
        setmessage(null);
        setClassMessage(null);
      }, 5000);
    }

  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} classMessage={classMessage} />
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