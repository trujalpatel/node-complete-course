const {MongoClient, ObjectId}  = require('mongodb');

const connectionUrl = process.env.MONGODB_URL;
const databaseName = 'task-manager';

MongoClient.connect(connectionUrl, {}, (error, client) => {
    if(error){
        console.log('Unable to connect to database.');
    }

    const db = client.db(databaseName);

    // db.collection('users').insertOne({
    //     name: 'XYZ00',
    //     age: 25
    // },(error, result) => {
    //     if(error){
    //         return console.log('Unable to insert data!!');
    //     }
    //     console.log(result);
    // });

    // db.collection('users').insertMany([
    //     {
    //     name: 'Ravi',
    //     age: 24,
    // },{
    //     name: 'Parth',
    //     age: 26,
    // }
    // ], (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert data!!');
    //     }
    //     console.log(result);
    // });

    // db.collection('tasks').insertMany([
    //     {
    //     description: 'This is a test data',
    //     completed: true,
    // },{
    //     description: 'This is a test2 data',
    //     completed: true,
    // },{
    //     description: 'This is a test23 data',
    //     completed: false,
    // }
    // ], (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert data!!');
    //     }
    //     console.log(result);
    // });

    // db.collection('tasks').findOne({ description:'This is a test data'}, (error,task) => {
    //     console.log(task);
    // })

    // db.collection('tasks').find({ completed: true}).toArray((error, tasks) => {
    //     console.log(tasks);
    // })

//   const updatePromise =  db.collection('users').updateOne({
//         _id: new ObjectId('63d0ebd7c3364d6b5c7fd628')
//     },{
//         $inc: {
//             age: 2
//         }
//     });

//     updatePromise.then((result) => {
//         console.log(result);
//     }).catch((error) => {
//         console.log(error);
//     })

//  const updateManyPromise = db.collection('tasks').updateMany({
//         completed: false
//     },{
//         $set: {
//             completed: true
//         }
//     });
//     updateManyPromise.then((result) => {
//         console.log(result);
//     }).catch((error) => {
//         console.log(error);
//     })

// const deleteManyPromise = db.collection('users').deleteMany({
//         age: 25
//     });
//     deleteManyPromise.then((result) => {
//         console.log(result);
//     }).catch((error) => {
//         console.log(error);
//     });

   db.collection('tasks').deleteOne({
        description: 'This is a test23 data'
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });
});