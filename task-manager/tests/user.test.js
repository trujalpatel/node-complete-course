const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { userId, userOne, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase);
beforeEach( async () => {
    await User.deleteMany();
    await new User(userOne).save();
});

test('Should signUp a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Trujal',
        email: 'test@mailinator.com',
        password: 'test@123'
    }).expect(201);

    // Assert the database was changed correctly
    const findUser = await User.findById(response.body.user._id);
    expect(findUser).not.toBeNull();

    // Assertion about the response
    expect(response.body).toMatchObject({
        user:{
            name: 'Trujal',
            email: 'test@mailinator.com',
        },
        token: findUser.tokens[0].token
    })
    expect(userOne.password).not.toBe('test@123');
});

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);

    const user = await User.findById(userId);
    expect(response.body.token).toBe(user.tokens[1].token);
})

test('Should not login non existent user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'test123'
    }).expect(400);
})

test('Should get profile for user', async () => {
    await request(app).get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
})  

test('Should get profile for unauthenticated user', async () => {
    await request(app).get('/users/me')
        .send()
        .expect(401);
})  

test('Should delete account for user', async () => {
    await request(app).delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    const user = await User.findById(userId);
    expect(user).toBeNull();
}) 

test('Should delete account for unauthenticated user', async () => {
    await request(app).delete('/users/me')
        .send()
        .expect(401);
}) 

test('Should upload avatar image', async () => {
    await request(app).post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .attach('avatar', 'tests/fixtures/nature-field.jpg')
        .expect(200);

        const user = await User.findById(userId);
        expect(user.avatar).toEqual(expect.any(Buffer));
});

test('Should update valid user fields', async () => {
    await request(app).patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'patel'
        })
        .expect(200);

        const user = await User.findById(userId);
        expect(user.name).toEqual('patel');
}); 

test('Should not update invalid user fields', async () => {
    await request(app).patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            address: 'jhalod'
        })
        .expect(400);
}); 

