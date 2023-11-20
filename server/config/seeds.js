const db = require('./connection');
const { Post, User } = require('../models');
const cleanDB = require('./cleanDB');
const userSeeds = require('./userseed.json');

db.once('open', async () => {
    await cleanDB('User', 'users');
    await cleanDB('Post', 'posts');

    var users = await User.create(userSeeds);

    console.log('users seeded');

    const posts = await Post.insertMany([
        {
            userId: users[0]._id,
            username: users[0].username,
            body: 'Hello Im GHOSTDAD and this is the first post on the site!!',
        },
        {
            userId: users[0]._id,
            username: users[0].username,
            body: 'Another post by the magnificent GHOSTDAD!!!!!!!',
        },
        {
            userId: users[1]._id,
            username: users[1].username,
            body: 'Miho sweeps onto the scene~',
        },
        {
            userId: users[2]._id,
            username: users[2].username,
            body: 'Geez why did I marry this man... He cant even change a nappy',
        },
        {
            userId: users[3]._id,
            username: users[3].username,
            body: 'Gaa Gaa Goo Goo Im baby',
        },
    ]);

    console.log('posts seeded');

    process.exit();
});