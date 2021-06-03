import './App.css';
import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import DisplayPersons from './components/DisplayPersons'
import personService from './services/persons'
import Notification from './components/Notification'
const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ errormessage, seterrorMessage ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(setPersons)
    }, [])

  const addname=(event) =>{
    event.preventDefault()
      const personexists=persons.find(person => person.name === newName);

      if (personexists) {
        
        if(window.confirm(newName+" already exists in the phonebook, Do you want to replace the phone number ?"))
{
    const name=persons.find((item) => item.name === newName);
const updatedperson={...name,number:newNumber}
  
    personService
    .updateNumber(updatedperson.id,updatedperson)
    .then(returnedPerson => {
      setPersons(persons.map(eachperson => eachperson.id !== returnedPerson.id ? eachperson : returnedPerson))
      setMessage(
        ` ${newName}'s number modified sucessfully`
      )
      setTimeout(() => {
        setMessage(null)
      }, 3000)
      setNewName('')
      setNewNumber('')
    }
      
      )
     
      .catch(error => {
        seterrorMessage(
          `${newName} data is  deleted from the server`
        )
        setTimeout(() => {
          seterrorMessage(null)
        }, 3000)
        setPersons(persons.filter(n => n.id !== updatedperson.id))
      })
  
}

      }
      else{
    const personObject = {
      name: newName,
      number:newNumber,
    }
    personService
    .addPerson(personObject)
    .then(pdetails => {
      setPersons(persons.concat(pdetails))
      setMessage(
        ` ${newName} data successfully added`
      )
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    })
    setNewName('')
    setNewNumber('')
   
  
};
    
  }
    const filterChange =(event =>{
        console.log(event.target.value)
        setNewFilter(event.target.value)
      })

  const nameChange =(event =>{
    console.log(event.target.value)
    setNewName(event.target.value)
  })

  const numberChange =(event =>{
    console.log(event.target.value)
    setNewNumber(event.target.value)
  })

  const removePerson =(pid,pname)=>
    {
      if(window.confirm("Delete "+pname +"?"))
      {
        personService.rPerson(pid).then(() => {
          setPersons(persons.filter(eachperson => eachperson.id !== pid));
          setMessage(
            ` ${pname} data successfully deleted`
          )
          setTimeout(() => {
            setMessage(null)
          }, 3000) 
        });
      }

    }
   
  return (
    <div>

      <h2>Phonebook</h2>
      <Notification message={message} errormessage={errormessage} />

      <Filter newFilter={newFilter} filterChange={filterChange}/>
      <h3>Add</h3>
      <PersonForm newName={newName} nameChange={nameChange} newNumber={newNumber} numberChange={numberChange} addname={addname}/>
     
      <h3>Numbers</h3>
       <DisplayPersons persons={persons} newFilter={newFilter} removePerson={removePerson}/>
    </div>
  )
}

export default App