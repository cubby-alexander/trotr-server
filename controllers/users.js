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

// Update
userRouter.put('/:id', async (req, res) => {
    const avatar = req.files.avatar;
    avatar.mv(`./uploads/${avatar.name}`);
    await cloudinary.uploader.upload(`./uploads/${avatar.name}`).then((result) => {
        req.body.avatar = result.secure_url;
    })
        .catch((error) => console.log(error));
    User.findByIdAndUpdate(req.params.id, req.body).then((updatedUser) => res.send(updatedUser))
        .catch((error) => res.send(error))
});

userRouter.put('/:id/domestic', async (req, res) => {
    await User.findById(req.params.id)
        .then((foundUser) => {
            foundUser.domestic = req.body;
            foundUser.save(() => {});
            res.send(foundUser);
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

// Show
userRouter.get('/:id', (req, res) => {

})

module.exports = userRouter;