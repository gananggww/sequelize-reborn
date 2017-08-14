const express = require("express")
const router = express.Router()
const session = require("express-session")

// router.set("view engine", "ejs")
const bodyParser = require('body-parser')
const db = require("../models")
//body-parser
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())
router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true } //if using https//:
  cookie: {} //development
}))


router.get("/", (req, res)=>{
    res.render("login", {eror : null})
})

router.post("/", (req, res)=>{
  db.User.findAll({where :{
    username : req.body.username,
    password : req.body.password
  }
})
.then(rows=>{
  req.session.username = rows[0].username
  req.session.role = rows[0].role
  // console.log(rows[0].role, "======================");
  // if(req.session.role == "headmaster"){
    // res.send(req.session.role)
    res.render("home", {sesi : req.session})

}).catch(err=>{
  let msg = "username atau pasword anda salah"
  res.render("login", {eror : msg })
})
})

router.get("/", (req, res)=>{
  req.session.destroy()
  res.redirect("/login")
})


module.exports = router