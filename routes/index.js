var express = require('express');
var router = express.Router();
const User = require('../models/users');
const Task = require('../models/tasks');
/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/tasks/:token', (req, res) => {
  User.findOne({ token: req.params.token })
    .populate('tasks').then(data => {
      if (data) {
        Task.find().then(() => {
          res.json({ Task: data })
        })
      } else {
        res.json({ result: false, error: 'User not found' });
      }
    });
});

router.post("/tasks/:newtasks/:token", (req, res) => {
  const newtask = new Task
    ({
      title: req.body.title,
      description: req.body.description,
      completed: false,

    });
  if (newtask.title) {
    newtask.save().then(data => {
      res.json({ result: true, Task: data })
      User.findOne({ token: req.params.token }).then((Userdoc) => {
        (Userdoc.tasks).push(data._id)
        Userdoc.save()
      })
    })

  } else {
    res.json({ result: false, error: "veuillez saisir le titre" })
  }
  console.log(Task)
});

router.put("/upDateTasks/:ObjectId", function (req, res, next) {
  const taskId = req.params.ObjectId;
  const title = req.body.title;
  const description = req.body.description;
  const completed = req.body.completed;

  if (!title || !description) {

    return res.json({ result: false, error: "Titre et description sont requis." }); // renvoie nul
  }
  // Recherche de la tâche par son ObjectId dans la base de données
  Task.findById(taskId).then(function (task) {
    // if (err) {
    //     return res.json({ result: false, error: "Erreur interne du serveur." });
    // }
    // Vérifier si la tâche existe
    if (!task) {
      return res.json({ result: false, error: "Tâche non trouvée." });
    }
    task.title = title;
    task.description = description;
    task.completed = completed !== undefined ? completed : task.completed;  // Si 'completed' n'est pas défini, on garde la valeur actuelle
    task.save().then(function (updatedTask) {
      // if (saveErr) {
      //     return res.json({ result: false, error: "Erreur lors de la mise à jour de la tâche." });
      // }

      // Si la mise à jour réussit, renvoyer un message de succès
      res.json({
        result: true,
        message: 'Tâche modifiée avec succès.',
        task: updatedTask // Renvoi des données de la tâche mise à jour
      });
    });
  });
});






router.delete("/tasks", (req, res) => {
  Task.deleteOne({ _id: req.body.Id }).then(deleteDoc => {
    if (deleteDoc.deletedCount > 0) {
      Task.find().then(data => {
        res.json({ result: true, Task: data })
        User.findOne({ token: req.body.token }).then((Userdoc) => {
          //User.tasks=Userdoc.tasks.filter(req.body.Id))
          console.log(Userdoc.tasks)
          Userdoc.tasks = Userdoc.tasks.filter((ObjectId) => String(ObjectId) !== String(req.body.Id))

          Userdoc.save()

        })
      });
    } else {
      res.json({ result: false, error: "id not found" });
    }
  });
});






module.exports = router;
