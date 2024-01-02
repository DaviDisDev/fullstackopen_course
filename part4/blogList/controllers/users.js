const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/users')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs');
    response.json(users);
  })
usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })
 try{
  const savedUser = await user.save() 

  response.json(savedUser)
 }catch(error){
  response.status(400).json({ error: error.message });
 }
   
  
})

module.exports = usersRouter