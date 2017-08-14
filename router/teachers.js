const session = require('express-session')
const express = require("express")
const router = express.Router()
var db = require("../models")
const bodyParser = require('body-parser')



router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.use((req, res, next)=>{
     if(req.session.role == "headmaster"){
       next()

     }else {
       res.redirect("/")
     }
})


//Tampilkan Table Seluruh
router.get("/", function(req, res){
  db.Teacher.findAll({
    include:[db.Subject]
  })
    .then(params => {
      console.log(params);
      res.render("teachers", {data:params} )
  })
})

//Tampilkan Form
router.get('/add', function(req, res){
  db.Subject.findAll()
  .then(params =>{
    res.render('form-teacher', {data:params})
  })
});
//Proses Tambah Data / Post
router.post('/add', function(req, res){
  db.Teacher.create({
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    email:req.body.email,
    SubjectId:req.body.dropDown,
    createdAt: new Date(),
    updatedAt: new Date()

  })
  .then(() =>{
      res.redirect('/teachers')
  })
})
//Form Ganti Data
router.get('/edit/:id', function(req, res){
  db.Teacher.findById(req.params.id)
  .then(paramsTeacher =>{
    db.Subject.findAll()
      .then(paramsSubject =>{
          res.render('edit-teacher', {dataT: paramsTeacher, dataS : paramsSubject })
      })
    })
  })
//Update atau Ganti Data
router.post('/edit/:id', function(req, res){
  db.Teacher.update({
    first_name: `${req.body.firstname}`,
    last_name:`${req.body.lastname}`,
    email:`${req.body.email}`,
    SubjectId: `${req.body.dropDown}`,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    where: {
      id: `${req.params.id}`
    }
  })
  .then(()=>{
    res.redirect('/teachers')
  })
})
//Hapus Data
router.get('/delete/:id', function(req, res){
  db.Teacher.destroy({where:{id:`${req.params.id}`}})
  .then(() =>{
    res.redirect('/teachers')
  })
})

module.exports = router
