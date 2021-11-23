const router = require('express').Router();
const { registerValidationSchema } = require('../validation');
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.post('/register', async (req, res) => {

  //VALIDATING THE DATA BEFORE WE MAKE A USER
  const { error } = registerValidationSchema.validate(req.body);

  if (error) {
    return res.send({ error: error.details[0].message });
  } 

  //CHECK IF EMAIL IS UNIQUE
  const emailExists = await User.findOne( { email: req.body.email } );

  if (emailExists) {
    return res.send({ error: 'Email already exists' })
  }

  //CHECK IF USERNAME IS UNIQUE
  const usernameExists = await User.findOne( { email: req.body.username } );

  if (usernameExists) {
    return res.send({ error: 'Username already exists' })
  }

  //HASH PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password.initialPassword, salt);

  //CREATE A NEW USER
  const user = new User({
    name: {
      firstName: req.body.name.firstName,
      lastName: req.body.name.lastName,
    },
    username: req.body.username,
    email: req.body.email,
    password: 'hashedPassword'
  });

  try {
    const savedUser = await user.save();
    res.send('User saved');
  } catch(err) {
    res.send({ 'error': 'Error saving to DB' })
  };
});

router.post('/login', (req, res) => {
  return res.send(req.body);
});

module.exports = router;