const express = require('express');
const router = new express.Router;
const User = require('../models/user');
const auth = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');

router.post('/users', async (req, res) => {
    
    try {
      const user = new User(req.body);
      const token = await user.generateAuthToken();
      res.status(201).send({user, token});
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
        const token = await user.generateAuthToken();
        res.send({user, token});
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
})

router.post('/users/logout', auth, async(req, res) =>{
    try {
        req.user.tokens = req.user.tokens.filter((key) => {
            return key.token !== req.token;
        });
        await req.user.save()
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/users/logoutAll', auth, async(req, res) =>{
    try {
        req.user.tokens = [];
        await req.user.save()
        res.send('LogoutAll successfull');
    } catch (error) {
        res.status(500).send(error);
    }
});

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

router.get('/users/me', auth, async (req, res) => {
   res.send(req.user);
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

// router.patch('/users/:id', async (req, res) => {
//     const updates = Object.keys(req.body);
//     const allowedFieldToUpdate = ['name', 'age', 'email', 'password' ]
//     const isEligibleForUpdate = updates.every((update) => allowedFieldToUpdate.includes(update));

//     if(!isEligibleForUpdate){
//         return res.status(404).send('Please provide valid field..!');
//     }
//     try {

//        const user = await User.findById(req.params.id); 
//        updates.forEach((key) => user[key] = req.body[key]);
//        await user.save();
       
//     //   const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators:true });
//       if(!user){
//         return res.status(404).send();
//       }
//       res.send(user);
//     }catch(e){
//         res.status(400).send(e.message);
//     }
//     // User.findById(_id).then((user) => {
//     //     if(!user){
//     //       return res.status(404).send();
//     //     }
//     //     res.send(user);
//     // }).catch((e) => {
//     //     console.log(e);
//     //     res.status(500).send();
//     // });

// });

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedFieldToUpdate = ['name', 'age', 'email', 'password' ]
    const isEligibleForUpdate = updates.every((update) => allowedFieldToUpdate.includes(update));

    if(!isEligibleForUpdate){
        return res.status(404).send('Please provide valid field..!');
    }
    try {
       updates.forEach((key) => req.user[key] = req.body[key]);
       await req.user.save();

       res.send(req.user);
    }catch(e){
        res.status(400).send(e.message);
    }
});

router.delete('/users/me', auth, async (req, res) => {
    try{
        await req.user.remove(); 
        res.send(req.user);
    }catch(e){
        res.status(400).send(e);
    }
});

// router.delete('/users/id', auth, async (req, res) => {
//     try{
//         const user = await User.findByIdAndDelete(req.params.id);
//         if(!user){
//          return res.status(404).send();
//         }
//         res.send(req.user);
//     }catch(e){
//         res.status(400).send(e);
//     }
// });

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload image (jpg|jpeg|png) files'))
        }

        cb(undefined, true)  
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar') , async(req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
    req.user.avatar = buffer
    await req.user.save()
    res.send()
},(error, req, res, next) => {
    res.status(400).send({ error: error.message })
});

router.delete('/users/me/avatar', auth, async (req, res) => {
    try{
        req.user.avatar = undefined
        await req.user.save()
        res.send(req.user);
    }catch(e){
        res.status(400).send(e);
    }
});

router.get('/users/:id/avatar', async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user || !user.avatar){
            throw new Error('No user or avatar found!!s');
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    }catch(e){
        res.status(400).send(e);
    }
});


module.exports = router