const express = require("express")
const router = express.Router()
const bodyParser = require('body-parser')
const db = require("../models")
const salt = require("../helpers/crypto")

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get("/", (req, res)=>{
  res.render("signup")
})
router.post("/", (req, res)=>{
  db.User.create({
    username : `${req.body.username}`,
    password : `${req.body.password}`,
    role : `${req.body.role}`,
    // salt : salt.random(8),
    createdAt : new Date(),
    updatedAt : new Date()
  })
  .then(()=>{
    res.redirect("/")
  })
  .catch(err=>{
    let err_msg = err.errors[0].message
    res.render("signup")
  })
})


module.exports = router
