const express = require("express")
const router = express.Router()

router.use((req, res, next)=>{
     if(req.session.role == "teacher" || req.session.role == "academic" || req.session.role == "headmaster"){
       next()
     }else{
      //  res.sendStatus(401)
       res.redirect("/home")
     }
})


router.get("/", (req, res)=>{
  res.render("home")
})

module.exports = router;
