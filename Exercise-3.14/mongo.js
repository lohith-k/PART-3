const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}
const [ , , password, name, number] = process.argv


const url =
  `mongodb+srv://lohith:${password}@cluster0.pc0qg.mongodb.net/notebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const addPerson = () => {
    const person = new Person({
      name,
      number
    })
person.save().then(result => {
  console.log(`added ${name} number ${number} to phonebook`)
  mongoose.connection.close()
})
}

const displayPersons=()=>{
Person.find({}).then(result => {
    console.log("Phonebook:")
    result.forEach(eachperson => {
      
      console.log(eachperson.name +" "+eachperson.number)
    })
    mongoose.connection.close()
  })
}
(name && number) ? addPerson() : displayPersons()
