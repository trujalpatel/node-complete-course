const app = require('./app');

const multer = require('multer');
// app.use((req, res, next) => {
//     console(req.method, req.path);
//     next();
// });

// app.use((req, res, next) => {
//     res.status(503).send('Site is in maintainance mode....Please try after sometime!!')
//     next();
// });

app.listen(port, () => {
    console.log(`server is up an running on ${port}`);
});

// const bcrypt = require('bcryptjs');

// const bcryptPassword = async () => {
//     const password = 'test@123';
//     const hashedPassword = await bcrypt.hash(password, 8);
//     const isMatch = await bcrypt.compare(password, hashedPassword);
// }

// bcryptPassword();

// const jwt = require('jsonwebtoken');

// const jwtToken = async () => {
//     const token = await jwt.sign({_id: '15156dsad'}, 'tesingjsonwebtoken');
//     // console.log(token);
//     const verifyToken = jwt.verify(token, 'tesingjsonwebtoken');
//     // console.log(verifyToken);
// }

// jwtToken();

const Task = require('./models/task');
const User = require('./models/user');

const main = async () => {
    // const task = await Task.findById('63d8f338a4f42b15d2114fc2');
    // await task.populate('owner');
    // console.log(task.owner);

    // const user = await User.findById('63d8f1c0b0b087cd3500350a');
    // await user.populate('tasks');
    // console.log(user.tasks);
};

main();