import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/Personform'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum,setNewNum] = useState('')
  const [filter, setFilter] = useState('')
  const [showPersons,setShowPersons]= useState(true)
  const [changeMessage, setChangeMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
 
  const addName=(event) => {
    event.preventDefault()

    if (persons.some(person => person["name"].toLowerCase() === newName.toLowerCase())){
      const change=persons.find(person => person["name"].toLowerCase() === newName.toLowerCase())
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        personService
          .update(change.id,{ ...change, number: newNum })
          .then(updated => {
            console.log(updated)
            setChangeMessage(
              `Changed ${updated.name}'s number`
            )
            setTimeout(() => {
              setChangeMessage(null)
            }, 2500)
            setPersons(persons.map(person => person.id === updated.id ? updated : person))
        })
      }
      setNewName('')
      setNewNum('')
      return
    }


    const person ={
      name: newName,
      number: newNum,
      id: persons[persons.length-1].id +1
    }
    personService
      .create(person)
      .then(returnedPerson =>{
        console.log(returnedPerson)
        setChangeMessage(
          `Added ${person.name}`
        )
        setTimeout(() => {
          setChangeMessage(null)
        }, 2500)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNum('')
      })

  }


  const handleRemoveOf = person => {
    const removeable=person.id
    if(window.confirm(`Delete ${person.name}`))
    personService
      .remove(removeable)
      .then(() =>{
        setChangeMessage(
          `Removed ${person.name}`
        )
        setTimeout(() => {
          setChangeMessage(null)
        }, 2500)
        setPersons(persons.filter(person => person.id !== removeable))
      })

    
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }
  const handleFilter= (event) => {
    setFilter(event.target.value)
    setShowPersons(false)
  }
  const filterPersons = showPersons ? persons : persons.filter(person => person.name.toLowerCase().includes(filter)=== true)

  const Person = ({person,handleRemove}) => {
    return (
      <p>{person.name} {person.number} <button onClick={handleRemove}>Delete</button></p>
    )
  }
   return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={changeMessage} />
      <Filter value={filter} onChange={handleFilter} />
      <h3>Add new name</h3>
      <PersonForm addName={addName} newName={newName} newNum={newNum} handleNameChange={handleNameChange} handleNumChange={handleNumChange}/>
      <h3>Numbers</h3>
      {filterPersons.map(person =>
        <Person 
          key={person.id} 
          person={person} 
          handleRemove={() => handleRemoveOf(person)}
        />
      )}
    </div>
  )

}

export default App
