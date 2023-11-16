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
            body: 'Hello Im GHOSTDAD and this is the first post on the site!!',
        },
        {
            userId: users[0]._id,
            body: 'Another post by the magnificent GHOSTDAD!!!!!!!',
        },
        {
            userId: users[1]._id,
            body: 'Miho sweeps onto the scene~',
        },
        {
            userId: users[0]._id,
            body: 'Geez why did I marry this man... He cant even change a nappy',
        },
        {
            userId: users[0]._id,
            body: 'Gaa Gaa Goo Goo Im baby',
        },
    ]);

    console.log('posts seeded');

    process.exit();
});