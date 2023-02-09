const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user')

const userId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userId,
    name: 'patel',
    email: 'testdata@gmail.com',
    password: 'testdata@123',
    tokens: [{
        token: jwt.sign({_id:userId}, process.env.JWT_SECRET_KEY)
    }]
}

const setupDatabase = async () => {
    await User.deleteMany()
    await new User(userOne).save()
}

module.exports = {
    userId,
    userOne,
    setupDatabase
}