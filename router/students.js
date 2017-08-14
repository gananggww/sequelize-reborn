const session = require('express-session')
const express = require("express")
const router = express.Router()
// router.set("view engine", "ejs")
const bodyParser = require('body-parser')
const db = require("../models")
//body-parser
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.use((req, res, next)=>{
     if(req.session.role == "teacher" || req.session.role == "academic" || req.session.role == "headmaster"){
       next()
     }else{
      //  res.sendStatus(401)
       res.redirect("/")
     }
})


router.get("/", (req, res)=>{
  db.Student.findAll()
  .then(dataT =>{
    res.render("students", {data_students : dataT})
    // res.send(dataT)
  })
})

router.get("/add", (req, res)=>{
  res.render("students-add" , {err: req.query.err})
})

router.post("/add", (req, res)=>{
  db.Student.create({
    first_name : `${req.body.first_name}`,
    last_name : `${req.body.last_name}`,
    full_name : `${req.body.first_name} ${req.body.last_name}`,
    email : `${req.body.email}`,
    createdAt : new Date(),
    updatedAt : new Date()
  })
  .then(()=>{
    res.redirect("/students")
  })
  .catch(err =>{
    let err_msg = err.errors[0].message
    // cara object
    res.render("students-add", {err: err_msg})

    // cara ngambil pake datanya pake routing dengan
    // res.redirect(`/students/add?err=${err_msg}`)
  })
})
router.get("/edit/:id", (req, res)=>{
  db.Student.findById(`${req.params.id}`)
  .then(row=>{
    res.render("students-edit", {data_students : row, err: null})
    // res.send(row)
  })
})
router.post("/edit/:id", (req, res)=>{
  db.Student.findById(`${req.params.id}`)
  .then(row =>{
    let data = {
      first_name : `${req.body.first_name}`,
      last_name : `${req.body.last_name}`,
      full_name : `${req.body.first_name} ${req.body.last_name}`,
      email : `${req.body.email}`,
      createdAt : new Date(),
      updatedAt : new Date()
    }
    db.Student.update(data, {where : {id : `${req.params.id}`}})
    .then(()=>{
      res.redirect("/students")
    })
    .catch(err =>{
      let err_msg = err.errors[0].message
      res.render("students-edit", {data_students : row, err : err_msg})
    })
  })
})
router.get("/delete/:id", (req,res)=>{
  db.Student.destroy({where : {id : `${req.params.id}`}})
  .then(()=>{
    db.StudentSubject.destroy({where : {SubjectId : `${req.params.id}`}})
    res.redirect("/students")
  })
})


//form - add Subject Kontak
router.get('/addSubject/:id', (req, res) => {
  db.Student.findById(req.params.id)
  .then(data_students => {
    db.Subject.findAll()
    .then(data_subjects => {
      res.render('form-student-subject', {
        data_students : data_students,
        data_subjects : data_subjects,
        eror : null
      })
    })
  })
});

router.post("/addSubject/:id", function(req, res){
  db.StudentSubject.create({
    StudentId: req.params.id,
    SubjectId: req.body.SubjectId
  }).then(() =>{
    res.redirect("/students")
  }).catch(err=>{
    let eror = err.errors[0].message;
    if(eror == "StudentId must be unique")
    {
      db.Student.findById(req.params.id)
      .then(data_students => {
        db.Subject.findAll()
        .then(data_subjects => {
          res.render('form-student-subject', {
            data_students : data_students,
            data_subjects : data_subjects,
            eror : "apapapasii maumu input dua kali, cape deh!"
          })
        })
      })
    }
  })
})


module.exports = router
