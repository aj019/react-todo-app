const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');


router.get('/todos', (req,res) => {
    Todo.find({},'action')
        .then(data => res.json(data));
        
});

router.post('/todos', (req,res) => {
    if(req.body.action){
        Todo.create(req.body)
            .then(data => res.json(data))
    } else {
        res.json({
            error: "The input field is empty"
        })
    }
});

router.delete('/todos/:id', (req, res, next) => {
    Todo.findOneAndDelete({"_id": req.params.id})
      .then(data => res.json(data))
      .catch(next)
  })  

module.exports = router;