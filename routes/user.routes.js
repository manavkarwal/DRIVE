// routes/user.routes.js
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userModel = require('../models/user.models');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')




router.get("/register", (req, res) => {
  res.render("register");
});

router.post(
  "/register",
  body("email").trim().isEmail().isLength({ min: 13 }),
  body("password").trim().isLength({ min: 5 }),
  body("username").trim().isLength({ min: 3 }),
  async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(),message:'Invalid data' });
    }

    const {email, username, password}= req.body;

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
        email: email,
        username:username,
        password:hashPassword,
    })

    res.json(newUser)
   
  }
);



router.get("/login", (req, res) => {
  res.render("login");
});



router.post(
  "/login",
  body("password").trim().isLength({ min: 5 }),
  body("username").trim().isLength({ min: 3 }),
  async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(),message:'Invalid data' });
    }

    const { username, password}= req.body;

    const user = await userModel.findOne({
      username: username
    })

  

    if(!user) {
      return res.status(400).json({
        message: 'username or password is incorrect'
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
      return res.status(400).json({
        message: 'username or password is incorrect'
      })
    }


   
    try {
      const token = jwt.sign({
        userId: user._id,
        email:  user.email,
        username: user.username
      }, process.env.JWT_TOKEN
    )
  
    res.cookie('token', token , { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
  
    } catch (error) {
      console.log("bhai teri cookie nhi ban rahi")
    }
  res.send("logged in")
    
  }
);


module.exports = router;
