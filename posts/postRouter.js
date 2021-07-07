const express = require('express');
const postDB = require('./postDb');
const router = express.Router();

router.get('/', (req, res) => {
  try{
    postDB.get().then(response => res.send(response))
  } catch{
    res.status(500).json({ message: 'an error has occurred'})
  }
});

router.get('/:id', validatePostId, (req, res) => {
  const id = req.params.id;
  try{
    postDB.getById(id). then(response => res.send(response))
  } catch {
    res.status(500).json({message: 'an error has occurred'})
  }
});

router.delete('/:id', validatePostId, (req, res) => {
  const id = req.params.id;
  try{
    postDB.remove(id).then(response => res.status(204).send({ success: response}))
  } catch{
    res.status(500).json({ message: 'an error has occurred'})
  }
});

router.put('/:id', validatePostId, validatePost, (req, res) => {
  const id = req.params.id;
  try{
    const postUpdate = {
      text: req.body.text
    } 
    postDB.update(id, postUpdate).then(response => res.status(204).json({ success: response})) 
  } catch{
    res.status(500).json({message: 'an error has occurred'})
  }
});

// custom middleware

function validatePostId(req, res, next) {
  const id = req.params.id;
  postDB.getById(id).then(response => {
    if(response){
      next()
    } else {
      res.status(400).json({message: 'invalid post id'})
    }
  })
}
function validatePost(req, res, next) {
  if (req.body.text){
    next();
  } else {
    res.status(400).json({message: 'missing required text'})
  }
}
module.exports = router;
