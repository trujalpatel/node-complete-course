const express = require('express');
const router = new express.Router;
const Task = require('../models/task');

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try{
        await task.save();
        res.status(201).send(task); 
    }catch(e){
        res.status(400).send(e.message);
    }
    // task.save().then(() => {
    //     res.send(task);
    // }).catch((e) => {
    //     res.status(400).send(e.message);
    // });

});

router.get('/tasks/', async (req, res) => {

    try{
        const task = await Task.find();
        res.status(200).send(task);
    }catch(e){
        res.status(500).send(e.message);
    }
    // Task.find().then((tasks) => {
    //     res.status(200).send(tasks);
    // }).catch((e) => {
    //     res.status(500).send(e.message);
    // });
});

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    try{
        const task = await Task.findById(_id);
        if(!task){
            return res.status(404).send();
          }
          res.send(task);
    }catch(e){
        res.status(500).send();
    }
    // Task.findById(_id).then((task) => {
    //     if(!task){
    //       return res.status(404).send();
    //     }
    //     res.send(task);
    // }).catch((e) => {
    //     console.log(e);
    //     res.status(500).send();
    // });

});

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedFieldToUpdate = ['description', 'completed' ];
    const isEligibleForUpdate = updates.every((update) => allowedFieldToUpdate.includes(update));
    if(!isEligibleForUpdate){
        return res.status(404).send('Please provide valid field..!');
    }
    try {
        const task = await Task.findById(req.params.id); 
        updates.forEach((key) => task[key] = req.body[key]);
        await task.save();

    //   const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators:true });
      if(!task){
        return res.status(404).send();
      }
      res.send(task);
    }catch(e){
        res.status(400).send(e.message);
    }
    // User.findById(_id).then((user) => {
    //     if(!user){
    //       return res.status(404).send();
    //     }
    //     res.send(user);
    // }).catch((e) => {
    //     console.log(e);
    //     res.status(500).send();
    // });

});

router.delete('/tasks/:id', async (req, res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task){
         return res.status(404).send();
        } 
        res.send(task);
    }catch(e){
        res.status(400).send(e);
    }
});

module.exports = router