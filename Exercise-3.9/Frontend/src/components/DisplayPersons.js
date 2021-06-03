import React from 'react'



 const DisplayPersons =({persons,newFilter,removePerson})=>{
  
    return(
      <div>
        
         {  persons.filter(eachperson => eachperson.name.toLowerCase().includes(newFilter.toLowerCase()))
                .map(eachperson => 
         
          <p key={eachperson.name} >{eachperson.name} {eachperson.number} <button onClick={() => removePerson(eachperson.id, eachperson.name)}>Delete</button></p>)}
        </div>
    )
    }
    export default DisplayPersons