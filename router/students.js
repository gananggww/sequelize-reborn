const express = require("express")
const router = express.Router()
// router.set("view engine", "ejs")
const bodyParser = require('body-parser')
const db = require("../models")
//body-parser
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())


router.get("/", (req, res)=>{
  db.Student.findAll()
  .then(dataT =>{
    res.render("students", {data_students : dataT})
    // res.send(dataT)
  })
})

router.get("/add", (req, res)=>{
  res.render("students-add", {err: req.query.err})
})
router.post("/add", (req, res)=>{
  db.Student.create({
    first_name : `${req.body.first_name}`,
    last_name : `${req.body.last_name}`,
    email : `${req.body.email}`,
    createdAt : new Date(),
    updatedAt : new Date()
  })
  .then(()=>{
    res.redirect("/students")
  })
  .catch(err =>{
    res.send(err)
  })
})
router.get("/edit/:id", (req, res)=>{
  db.Student.findById(`${req.params.id}`)
  .then(row=>{
    res.render("students-edit", {data_students : row})
    // res.send(row)
  })
})
router.post("/edit/:id", (req, res)=>{
  let data = {
    first_name : `${req.body.first_name}`,
    last_name : `${req.body.last_name}`,
    email : `${req.body.email}`,
    createdAt : new Date(),
    updatedAt : new Date()
  }
  db.Student.update(data, {where : {id : `${req.params.id}`}})
  .then(()=>{
    res.redirect("/students")
  })
  .catch(err =>{
    res.send(err)
  })
})

router.get("/delete/:id", (req,res)=>{
  db.Student.destroy({where : {id : `${req.params.id}`}})
  .then(()=>{
    res.redirect("/students")
  })
})

module.exports = router
