const { Post, User, MediaLibrary } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        //user queries
        users: async () => {
            return await User.find();
        },
        user: async (parent, { _id }) => {
            return await User.findOne({ _id });
        },
        userbyUsername: async (parent, { username }) => {
            return await User.findOne({ username });
        },
        //post queries
        posts: async () => {
            return await Post.find({}).sort({ createdAt: -1 });
        },
        post: async (parent, { _id }) => {
            return await Post.findMany({ _id });
        },
        postsbyUser: async (parent, { userId }) => {
            return await Post.find({ 'userId': {
                $in: userId
            }
        }).sort({ createdAt: -1 });
        },
        //mediaLibrary queries
        mediaLibrarys: async () => {
            return await MediaLibrary.find({});
        },
        mediaLibrary: async (parent, { _id }) => {
            return await MediaLibrary.findOne({ _id });
        },
    },
    Mutation: {
        //user mutations

        createUser: async (parent, { username, password, email}) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { username, password }) => {
            let user = await User.findOne({ username: username });

            if (!user) {
                throw AuthenticationError
            };

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError
            }

            const token = signToken(user);

            return { token, user };       
        },
        addFollowing: async (parent, { _id }, context) => {
            if (context.user) {
                const user = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    {
                        $push: { following: _id }
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
                return user;
            }
            throw AuthenticationError;
        },
        removeFollowing: async (parent, { _id }, context) => {
            if (context.user) {
                const user = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    {
                        $pull: { following: _id }
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
                return user;
            }
            throw AuthenticationError;
        },
        //updates password, description, email, username depeinging on whats provided
        updateUser: async (parent, args, context) => {

            if (context.user) {
                User.findByIdAndUpdate(
                    { _id: context.user._id },
                    {
                        $set: { args }
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
            }
        },

        //post mutations

        //creates new post taking in a body and uses logged in users token to update users post count
        createPost: async (parent, { body }, context) => {
            console.log("hello user", context.user);
            if (context.user) {
                const post = await Post.create({ 
                    userId: context.user._id, 
                    username: context.user.username,
                    body 
                });
                await User.findByIdAndUpdate(
                    { _id: context.user._id},
                    {
                        $inc: { postCount: 1 }
                    },
                );
    
                return post;
            }
            throw AuthenticationError;
        },

        //updates post using post _id and new body
        updatePost: async (parent, { _id, body }) => {
            return await Post.findByIdAndUpdate(
                {
                    _id: _id,
                },
                {
                    $set: { body }
                },
                {
                    new: true,
                    runValidators: true,
                })
        },

        //removes post with user token in Authorization header
        removePost: async (parent, { _id }, context) => {
            if (context.user) {
                const post = await Post.findOneAndDelete({ _id });

                await User.findByIdAndUpdate(
                    { _id: context.user._id},
                    {
                        $inc: { postCount: -1 }
                    }
                );
                return post;
            };
            throw AuthenticationError;
        }
    }
};

module.exports = resolvers;