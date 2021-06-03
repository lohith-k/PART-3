
import React from 'react'

const PersonForm=({newName,numberChange,newNumber,nameChange,addname})=>{
    return(
      <div>
           <form onSubmit={addname}>
        <div>
          Name: <input type="text" value={newName} onChange={nameChange} required/>
        </div>
        <div>
          Number: <input value={newNumber} onChange={numberChange} required/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      </div>
    )
  }

export default PersonForm