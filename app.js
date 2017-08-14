const session = require('express-session')
const express = require("express")
const app = express()
app.set("view engine", "ejs")

let home = require("./router/home")
let login = require("./router/login")
let teachers = require("./router/teachers")
let subjects = require("./router/subjects")
let students = require("./router/students")


app.use("/", login)
app.use("/home", home)
app.use("/subjects", subjects)
app.use("/teachers", teachers)
app.use("/students", students)


// app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true } //if using https//:
  cookie: {} //development
}))




app.listen(3001, ()=>{
  console.log("program running on port 3001");
})
