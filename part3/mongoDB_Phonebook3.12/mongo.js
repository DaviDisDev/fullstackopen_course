const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const content = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://fullstack_helsinki:${password}@cluster0.ie6uhog.mongodb.net/phonebook-app?retryWrites=true`;

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  content: String,
  number: String
})

const Contact = mongoose.model('contact', contactSchema)

if(content && number ){

  const person = new Contact({
    content: content,
    number: number
  });

  person.save().then(result => {
    console.log('Added',result.content, result.number)
    mongoose.connection.close()
  })
}else{

  Contact.find({}).then(result => {
    result.forEach(contact => {
      console.log(contact)
    })
    mongoose.connection.close()
  })
}
