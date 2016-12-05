var express = require('express');
var router  = express.Router();

var Device = require('../models/device');
// var Type = require('../models/type');

// ROUTE :: GET --------------------------all projects
router.get('/', function(req, res){
  Device.find({}).exec()
  .then(function(allDevices){
    console.log(allDevices);
    res.json(allDevices);
  })
  .catch(function(err){
    console.log(err);
    res.status(500);
  })
});

// ROUTE :: CREATE ------------------------one project
router.post('/', function(req, res){
  console.log("req.body:" + req.body);
  Device.create(req.body)
  .then(function(device){
    console.log(device);
    res.json(device);
  })
  .catch(function(err){
    console.log(err);
    res.status(400);
  })
});

// // ROUTE :: GET ---------------------------one project
// router.get('/:pId', function(req, res){
//   Device.findById(req.params.pId).exec()
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
  Device.findOneAndUpdate({_id: req.body._id}, req.body, {new: true})
  .then(function(device){
    console.log(device);
    res.json(device);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500);
  })
});

router.delete('/:id', function(req, res){
  console.log(req.params.id);
  Device.remove({_id: req.params.id})
  .then(function(device){
    console.log(device);
    res.json(device);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500);
  })
});

module.exports = router;
