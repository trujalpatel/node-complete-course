const express = require('express');
const router = new express.Router;
const Task = require('../models/task');
const auth = require('../middleware/auth');

router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body);

    const task = new Task({
        ...req.body,
        owner: req.user._id
    });

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

//GET tasks?completed=true
//GET tasks?limit=10&skip=10
//GET tasks?sortBY=createdBy:desc
router.get('/tasks/', auth,  async (req, res) => {
    const match  =  {};
    const sort = {};

    if(req.query.completed){
        match.completed = req.query.completed === 'true';
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try{
         await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit : parseInt(req.query.limit),
                skip : parseInt(req.query.skip),
                sort
            }
         });
        res.send(req.user.tasks)
    }catch(e){
        res.status(500).send(e.message);
    }
    // Task.find().then((tasks) => {
    //     res.status(200).send(tasks);
    // }).catch((e) => {
    //     res.status(500).send(e.message);
    // });
});

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try{
        // const task = await Task.findById(_id);

        const task = await Task.findOne({_id: _id, owner: req.user._id})
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

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedFieldToUpdate = ['description', 'completed' ];
    const isEligibleForUpdate = updates.every((update) => allowedFieldToUpdate.includes(update));
    if(!isEligibleForUpdate){
        return res.status(404).send('Please provide valid field..!');
    }
    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id}); 
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

router.delete('/tasks/:id', auth, async (req, res) => {
    try{
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id});
        if(!task){
         return res.status(404).send();
        } 
        res.send(task);
    }catch(e){
        res.status(400).send(e);
    }
});

module.exports = router