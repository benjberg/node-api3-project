const express = require('express');
const userDB = require('./userDb');
const postDB = require('../posts/postDb');
const router = express.Router();

router.post('/', validateUser, (req, res) => {
  try {
    const newUser= {
      name: req.body.name
    }
    userDB.insert(newUser).then( response => res.send(response))
  } catch {
    res.status(500).json({ message: 'am error has occurred'})
  }
});

router.post('/:id/posts', validateUser, validatePost, (req, res) => {
  const id = req.params.id;
  try{
    const newPost = {
      text: req.body.text,
      user_id: id
    } 
    postDB.insert(newPost).then(response => res.send(response))
  } catch{
    res.status(500).json({message: 'an error has occurred'})
  }
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
 const id = req.params.id;
 userDB.getById(id).then(res =>{
   if (res){
     next();
   } else {
     res.status(400).json({message: 'invalid user id'})
   }
 })
}

function validateUser(req, res, next) {
  if (req.body.name){
    next();
  } else {
    res.status(400).json({message: 'missiong required name field'})
  }
}

function validatePost(req, res, next) {
  if (req.body.text){
    next();
  } else {
    res.status(400).json({message: 'missing required text'})
  }
}

module.exports = router;
