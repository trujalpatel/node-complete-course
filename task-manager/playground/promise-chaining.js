require('../src/db/mongoose');
const User = require('../src/models/user');

// User.findByIdAndUpdate('63d0ebd7c3364d6b5c7fd628', {
//     age: 24
// }).then((user) => {
//     console.log(user);
//     return User.countDocuments({age: 24});
// }).then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.log(e);    
// });

const updateUserAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age});
    const count = await User.countDocuments({age});
    return count;
}

updateUserAndGetCount(
    '63d38470d5417121a4ef7951', 
    32
    ).then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
});