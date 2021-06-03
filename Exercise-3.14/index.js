const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(express.static('build'))
const morgan = require('morgan')

app.use(cors())

require('dotenv').config()


const Person = require('./models/persons')

morgan.token('body', (request) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
  
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
    const maxId = Person.length > 0
      ? Math.max(...Person.map(n => n.id))
      : 0
    return maxId + 1
  }

  app.post('/api/persons', (request, response) => {
    const body = request.body
   
      
    if (!body.number || !body.name) {
        return response.status(400).json({ 
          error: ' name or number missing' 
        })
      }
      
      const person = new Person({
        name: body.name,
        number:body.number,
      })
      person.save().then(savedPerson => {
        response.json(savedPerson)
      })
  })
  
  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })