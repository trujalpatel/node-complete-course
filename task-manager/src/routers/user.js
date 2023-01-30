const express = require('express');
const router = new express.Router;
const User = require('../models/user');

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
      await  user.save();
      res.status(201).send(user);
    } catch(e){
        res.status(400).send(e.message);
    }
    // user.save().then(() => {
    //     res.status(201).send(user);
    // }).catch((e) => {
    //     res.status(400).send(e.message);
    // });

});

router.post('/users/login', async(req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
})
router.get('/users/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch(e){
        res.status(500).send(e.message);
    }
    // User.find().then((users) => {
    //     res.status(200).send(users);
    // }).catch((e) => {
    //     res.status(500).send(e.message);
    // });
});

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
      const user = await User.findById(_id);
      if(!user){
        return res.status(404).send();
      }
      res.send(user);
    }catch(e){
        res.status(500).send();
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

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedFieldToUpdate = ['name', 'age', 'email', 'password' ]
    const isEligibleForUpdate = updates.every((update) => allowedFieldToUpdate.includes(update));

    if(!isEligibleForUpdate){
        return res.status(404).send('Please provide valid field..!');
    }
    try {

       const user = await User.findById(req.params.id); 
       updates.forEach((key) => user[key] = req.body[key]);
       await user.save();
       
    //   const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators:true });
      if(!user){
        return res.status(404).send();
      }
      res.send(user);
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

router.delete('/users/:id', async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
         return res.status(404).send();
        } 
        res.send(user);
    }catch(e){
        res.status(400).send(e);
    }
});

module.exports = router