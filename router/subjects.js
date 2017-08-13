const express = require("express")
const router = express.Router()
var db = require("../models")
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get("/", function(req, res){
  db.Subject.findAll({
    include:[db.Teacher]
  })
    .then(params => {
      // console.log(params);
      res.render("subjects", {data:params} )
  }).catch(function(err){console.log(err)})
})

//Tampilkan Form
router.get('/add', function(req, res){
  db.Subject.findAll({
    include:[db.Teacher]
  })
  .then(params => {
    res.render('form-subject', {data:params})
  })
});

//Proses Tambah Data / Post
router.post('/add', function(req, res){
  db.Subject.create({
    subject_name: req.body.subjectname,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  .then(() =>{
      res.redirect('/subjects')
  })
})

//Form Ganti Data
router.get('/edit/:id', function(req, res){
  db.Subject.findById(req.params.id)
  .then((params) =>{
    res.render('edit-subject', {data: params})
  })
})

//Update atau Ganti Data
router.post('/edit/:id', function(req, res){
  db.Subject.update({
    subject_name: `${req.body.subjectname}`,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    where: {
      id: `${req.params.id}`
    }
  })
  .then(()=>{
    res.redirect('/subjects')
  })
})
//Hapus Data
router.get('/delete/:id', function(req, res){
  db.Subject.destroy({where:{id:`${req.params.id}`}})
  .then(() =>{
    res.redirect('/subjects')
  })
})

router.get("/:id/enrolledstudents",function(req, res){
  db.Subject.findById(req.params.id)
  .then(subject =>{
    db.StudentSubject.findAll({
      include:[{all:true}],
      where:{
        SubjectId : req.params.id
      }
    }).then(param =>{
      // console.log(param +" ++++++++++++++++++++++++");
      res.render("sub-enrollStudents", {title : subject, data_students: param})
    })
  })
})

router.get('/givescore/:idst/:idsb', (req, res) => {
  db.Student.findAll({
    where: {
      id: req.params.idst
    }
  })
  .then(data_students => {
    db.Subject.findAll({
      where: {
        id: req.params.idsb
      }
    })
    .then(data_subjects => {
      res.render('subjects_givescore', {
        data_students: data_students,
        data_subjects: data_subjects
      })
    })
  })
})

router.post('/givescore/:idst/:idsb', (req, res) => {
  db.StudentSubject.update({
    score: req.body.score
  }, {
    where: {
      StudentId: req.params.idst
    }
  })
  .then(() => {
    res.redirect(`/subjects/${req.params.idsb}/enrolledstudents`)
  })
})


// router.get()


module.exports = router
