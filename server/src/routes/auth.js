const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.NODE_JWT || "ThisIsMySecretJWT";
const fetchuser = require('../middleware/fetchuser');

// ROUTER 1 : Creating new User along wih auth-token
router.post('/createuser', [
  body('name', "Enter name ").isLength({ min: 3 }),
  body('email', "Enter email").isEmail(),
  body('password', "password is not long enough").isLength({ min: 5 }),
], async (req, res) => {
  console.log(req.body);

let success=false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success,errors: errors.array() });
  }
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({success, error: "Sorry a user with this email already exists" })
    }

    const salt = await bcrypt.genSalt(10);
    const secretPassword = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secretPassword,
      role:req.body.role
    })
    const data = {
      user: {
        id: user.id,
        role:user.role
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    success=true;
    res.json({ success,authToken });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})


// ROUTER 2: Authenticate user to login 

router.post("/login", [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
  body('role','select mode').notEmpty()
], async (req, res) => {

  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password ,role } = req.body;
  try {

    let user = await User.findOne({ email: req.body.email  })
    if (!user) {
      success = false
      return res.status(400).json({ error: "Incorrect Credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false
      return res.status(400).json({ success,error: "Incorrect Credentials" });

    }
    const data = {
      user: {
        id: user.id,
        role:user.role
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success,authToken });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }


})


// // ROUTER 3 : To fetch all users
router.post('/getuser', fetchuser, async (req, res) => {

  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }

})

module.exports = router