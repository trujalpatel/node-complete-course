require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.findByIdAndDelete(
//     '63d3cb0285b1f5138ba24fb9'
// ).then((task) => {
//     console.log(task);
//     return Task.countDocuments({completed: false});
// }).then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.log(e);    
// });


const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments ({completed: false});
    return count;
}

deleteTaskAndGetCount(
    '63d134207c69e709a3eeb083', 
    false
    ).then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
});