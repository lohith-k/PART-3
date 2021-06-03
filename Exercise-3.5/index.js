const express = require('express')
const app = express()
app.use(express.json())

let persons= [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    },
  ]
 
  
  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })
  app.get('/info', (request, response) => {
      info=`<p>Phone has data of ${persons.length} persons</p>
      <p>${new Date}</p>
      `
    response.send(info)
  })
  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(eachperson => eachperson.id === id)
    if (person) {
        response.json(person)
      } 
      else {
        response.status(404).end()
      }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(eachperson => eachperson.id !== id)
  
    response.status(204).end()
  })

  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }

  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    
      const person = {
        name: body.name,
        number:body.number,
        id: generateId(),
      }
    
      persons = persons.concat(person)
    
      response.json(person)
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })