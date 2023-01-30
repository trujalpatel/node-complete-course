const mongoose = require('mongoose');
// const validator = require('validator');
mongoose.set("strictQuery", false);

mongoose.connect("mongodb://admin:password@127.0.0.1:27017/task-manager-api?authSource=admin");

// const User = mongoose.model("User", {
//     name: {
//         type: String, 
//         required: true,
//         trim: true,
//     },
//     age: {
//         type: Number,
//         default: 0,
//         validate(value){
//             if (value < 0) {
//                 throw Error('Please provide positive value for age!');
//             }
//         }
//     }, 
//     email: {
//         type: String, 
//         required: true,
//         lowercase: true,
//             validate(value){
//                 if (!validator.isEmail(value)) {
//                     throw Error('Please provide valid email address!');
//                 }
//             }
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         minLength: [7, 'Password must be greater than 6 characters'],
//         validate(value){
//             if(value.includes('password')){
//                 throw Error("Password can't contain word 'Password'")
//             }
//         }
//     } 
// });

// const me = new User({
//     name: "  Parth",
//     age: 20,
//     email: 'TEST@mailinator.com',
//     password: "test@123"
// })

// me.save().then(() => {
//     console.log(me);
// }).catch((error) =>{
//     console.log("inm",error);
// });

//  const Task = mongoose.model("Task", {
//         description: {
//             type: String,
//             trim: true,
//             required: true
//         },
//         completed: {
//             type: Boolean,
//             default: false
//         }
//     });
    
    // const me = new Task({
    //     description: "   This is a data!!",
    // })
    
    // me.save().then(() => {
    //     console.log(me);
    // }).catch((error) =>{
    //     console.log(error);
    // });