const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username:  {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    description: {
        type: String,
    },
    postCount: {
        type: Number,
        default: 0,
    },
    following: {
        //ID of people following main table, will be used to populate followers
        type: Array,
        default: [],
    },
    followers: {
        //ID of people you follow
        type: Array,
        default: [],
    },
    activated: {
        type: Boolean,
        required: true,
        default: false,
    }
    },
    { timestamps: true }
);


// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
    console.log(password);
    console.log(this.password);
    return bcrypt.compare(password, this.password);
};
  
const User = mongoose.model('User', userSchema);

module.exports = User;
  