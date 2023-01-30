const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);


app.listen(port, () => {
    console.log(`server is up an running on ${port}`);
});

const bcrypt = require('bcryptjs');

const bcryptPassword = async () => {
    const password = 'test@123';
    const hashedPassword = await bcrypt.hash(password, 8);
    const isMatch = await bcrypt.compare(password, hashedPassword);

    console.log(isMatch);
    console.log(hashedPassword);
}

bcryptPassword();