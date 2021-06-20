const express = require('express');
const userRouter = express.Router();
const cloudinary = require('cloudinary').v2;
const User = require('../models/User');
const bcrypt = require('bcrypt');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// Delete
userRouter.delete('/:id', async (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(res => console.log(res))
        .catch(err => console.log(err))
})

// Update
userRouter.put('/:id/avatar', async (req, res) => {
    if (req.files !== null) {
        const avatar = req.files.avatar;
        avatar.mv(`./uploads/${avatar.name}`);
        await cloudinary.uploader.upload(`./uploads/${avatar.name}`)
            .then((result) => {
                req.body.avatar = result.secure_url;
                console.log("secure url received and set", result, req.body)
            })
            .catch((error) => console.log(error));
    }
    User.findOneAndUpdate({_id: req.params.id}, req.body)
        .then((updatedUser) => {
            console.log(updatedUser, "this is happening");
            res.send(updatedUser)
        })
        .catch((error) => console.log(error));
});

userRouter.put('/:id', async (req, res) => {
    await User.findOneAndUpdate({_id: req.params.id}, {$set: req.body})
        .then((updatedUser) => {
            console.log(updatedUser);
            res.send(updatedUser);
        })
        .catch((err) => console.log(err))
});

userRouter.put('/:id/trip', async (req, res) => {
    await User.findById(req.params.id)
        .then(foundUser => {
        foundUser.trips.push(req.body)

    })
        .catch(error => console.log(error))
});

// Create
userRouter.post('/', async (req, res) => {
    console.log(req.body);
    User.create(req.body)
        .then((newUser) => res.send(newUser))
        .catch((error) => res.send(error));
});

userRouter.post('/login', (req, res) => {
    console.log(req.body, "find user");
    User.findOne({email: req.body.email, password: req.body.password}, (err, foundUser) => {
        res.send(foundUser)
    })
})

// Show
userRouter.get('/:id', (req, res) => {
    User.findOne({_id: req.params.id}, (err, foundUser) => {
        res.send(foundUser)
    })
})

module.exports = userRouter;