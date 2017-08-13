const express = require("express")
const router = express.Router()
// router.set("view engine", "ejs")
const bodyParser = require('body-parser')
const db = require("../models")
//body-parser
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get("/", (req, res)=>{
  db.Teacher.findAll()
  .then(dataT =>{
    res.render("teachers", {data_teachers : dataT})
    // res.send(dataT)
  })
})

router.get("/add", (req, res)=>{
  res.render("teachers-add")
})
router.post("/add", (req, res)=>{
  db.Teacher.create({
    first_name : `${req.body.first_name}`,
    last_name : `${req.body.last_name} `,
    email : `${req.body.email}`,
    createdAt : new Date(),
    updatedAt : new Date()
  })
  .then(()=>{
    res.redirect("/teachers")
  })
})
router.get("/edit/:id", (req, res)=>{
  db.Teacher.findById(`${req.params.id}`)
  .then(row=>{
    res.render("teachers-edit", {data_teachers : row})
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
  db.Teacher.update(data, {where : {id : `${req.params.id}`}})
  .then(()=>{
    res.redirect("/teachers")
  })
})

router.get("/delete/:id", (req,res)=>{
  db.Teacher.destroy({where : {id : `${req.params.id}`}})
  .then(()=>{
    res.redirect("/teachers")
  })
})

module.exports = router
