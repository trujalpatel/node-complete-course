const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if (value < 0) {
                throw Error('Please provide positive value for age!');
            }
        }
    }, 
    email: {
        type: String, 
        required: true,
        lowercase: true,
        unique: true,
            validate(value){
                if (!validator.isEmail(value)) {
                    throw Error('Please provide valid email address!');
                }
            }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: [7, 'Password must be greater than 6 characters'],
        validate(value){
            if(value.includes('password')){
                throw Error("Password can't contain word 'Password'")
            }
        }
    } 
});

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    if(!user){
        throw new Error('Invalid email address!!')
    }
    console.log(user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error("Password is not mathced!!")
    }
    return user;
}

userSchema.pre('save', async function(next) {
    const user = this;
     if(user.isModified('password')){
       user.password = await bcrypt.hash(user.password, 8);
     }
    next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;