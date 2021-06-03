const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(express.static('build'))

app.use(cors())

require('dotenv').config()


const Person = require('./models/persons')


  
  app.get('/api/persons', (request, response) => {
    Person.find({}).then(eachperson => {
      response.json(eachperson)})
  })
  app.get('/info', (request, response) => {
      info=`<p>Phone has data of ${Person.length} persons</p>
      <p>${new Date}</p>
      `
    response.send(info)
  })
  app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
    .then(person => {
      person ? response.json(person) : response.status(404).end()
    })
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
    function personExists(username) {
        return persons.some(function(el) {
          return el.name === username;
        }); 
      }
    if (!body.number || !body.name) {
        return response.status(400).json({ 
          error: ' name or number missing' 
        })
      }
        if (personExists(body.name)) {         
        return response.status(400).json({ 
          error: 'Name already exists, choose any unique name' 
        })
      }
      const person = {
        name: body.name,
        number:body.number,
        id: generateId(),
      }

      persons = persons.concat(person)
    
      response.json(person)
  })
  
  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })