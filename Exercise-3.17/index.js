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
  app.get('/api/persons/:id', (request, response,next) => {
    Person.findById(request.params.id)
    .then(person => {
      person ? response.json(person) : response.status(404).end()
    })
    .catch(error => next(error))
  })

  app.delete('/api/persons/:id', (request, response,next) => {
    Person.findByIdAndRemove(request.params.id)
    .then(result=>{response.status(204).end()})
    .catch(error => next(error))

    
  })

  
  app.post('/api/persons', (request, response,next) => {
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
      .catch(error => next(error))

  })
  app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
  
    const person ={
      name: body.name,
      number:body.number,
    }
  
    Person.findByIdAndUpdate(request.params.id, person, { new: true })
      .then(updatedperson => {
        response.json(updatedperson)
      })
      .catch(error => next(error))
  })
  const unknownEndpoint = (req, res) => {
    res.status(404).json({ error: 'requested page cannot be found' })
  }
  app.use(unknownEndpoint)
  
  const errorHandler = (error, req, res, next) => {
    console.error('Error:', error.message)
  
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'malformatted id' })
   
    }
  
    next(error)
  }

  app.use(errorHandler)


  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })