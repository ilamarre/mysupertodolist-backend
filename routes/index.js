var express = require('express');
var router = express.Router();
const User = require('../models/users');
const Task = require('../models/tasks');
/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/tasks/:token', (req, res) => {
  User.findOne({token : req.params.token}).then(data => {
    if (data) {}
  })
  const title = req.body.title;
  const description = req.body.description;
  const completed = req.body.completed;
  Task.find().then(data => {
    res.json({ Task: data })
  })
});

router.post("/tasks/:newtasks/:token", (req, res) => {
  const newtask = new Task
    ({
      title: req.body.title,
      description: req.body.description,
      completed: false
    });
  if (newtask.title) {
    newtask.save().then(data => {
      res.json({ result: true, Task: data })
    })
  } else {
    res.json({ result: false, error: "veuillez saisir le titre" })
  }
});

router.put("/tasks/:position", (req, res)=> {
 Task[req.params.position] = req.body.replacementParams;
 res.json({ Task: params });
});





router.delete("/tasks", (req, res) => {
  Task.deleteOne({ ObjectId: req.body.ObjectId }).then(deleteDoc =>{
    if (deleteDoc.deletedCount >0) {
            Task.find().then(data => {
            res.json({ result: true, Task: data });
          });
        } else {
          res.json({ result: false, error: "id not found" });
        }
      }); 
  });
  
 




module.exports = router;
