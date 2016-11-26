var express = require('express');
var router  = express.Router();

var Type = require('../models/type');
var Control = require('../models/control');

// ROUTE :: GET --------------------------all projects
router.get('/', function(req, res){
  Type.find({}).exec()
  .then(function(allTypes){
    console.log(allTypes);
    res.json(allTypes);
  })
  .catch(function(err){
    console.log(err);
    res.status(500);
  })
});

// ROUTE :: CREATE ------------------------one project
router.post('/', function(req, res){
  console.log("req.body:" + req.body);
  Type.create(req.body)
  .then(function(type){
    console.log(type);
    res.json(type);
  })
  .catch(function(err){
    console.log(err);
    res.status(400);
  })
});

// // ROUTE :: GET ---------------------------one project
// router.get('/:pId', function(req, res){
//   Project.findById(req.params.pId).exec()
//   .then(function(project){
//     console.log(project);
//     res.json(project);
//   })
//   .catch(function(err){
//     console.log(err);
//     res.status(500);
//   })
// });

// ROUTE :: UPDATE ------------------------one project
router.put('/', function(req, res){
  Type.findOneAndUpdate({_id: req.body._id}, req.body, {new: true})
  .then(function(type){
    console.log(type);
    res.json(type);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500);
  })
});

router.delete('/:id', function(req, res){
  console.log(req.params.id);
  Type.remove({_id: req.params.id})
  .then(function(type){
    console.log(type);
    res.json(type);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500);
  })
});

module.exports = router;
