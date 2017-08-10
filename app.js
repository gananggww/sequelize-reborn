const express = require("express")
const app = express()
app.set("view engine", "ejs")

let teachers = require("./router/teachers")
// let subjects = require("./router/subjects")
let students = require("./router/students")


// app.use("/", Home)
// app.use("/subjects", subjects)
app.use("/teachers", teachers)
app.use("/students", students)


app.listen(3001, ()=>{
  console.log("program running on port 3001");
})
