const express = require('express');
const userRouter = express.Router();
const cloudinary = require('cloudinary').v2;
const Trip = require('../models/Trip');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

userRouter.put('/:id/domestic', async (req, res) => {
    await User.findOneAndUpdate({_id: req.params.id}, {$set: {domestic: req.body}})
        .then((foundUser) => {
            jwt.sign({foundUser}, process.env.SECRET, (err, token) => {
                res.json({token, message: "Setup successful"})
            })
        })
        .catch((err) => console.log(err))
});

userRouter.put('/:id', async (req, res) => {
    await User.findOneAndUpdate({_id: req.params.id}, {$set: {domestic: req.body}})
        .then((foundUser) => {
            jwt.sign({foundUser}, process.env.SECRET, (err, token) => {
                res.json({token, message: "Setup successful"})
            })
        })
        .catch((err) => console.log(err))
});

userRouter.put('/:id/trip', async (req, res) => {
    try {
        console.log("Trip creation")
        const trip = await Trip.create({user: req.params.id, travel_legs: req.body.travel_legs});
        await trip.save();
        console.log("Saved and updating")
        const userById = await User.findById(req.params.id)
        userById.trips.push(trip);
        await userById.save()
            .then((updatedUser) => {
                console.log("Response initiated", updatedUser)
                jwt.sign({updatedUser}, process.env.SECRET, (err, token) => {
                    res.json({token, message: "Trip update successful"})
                })
            })
    } catch (e) {
        console.log(e)
    }
});

// Create
userRouter.post('/', async (req, res) => {
    const hashedPass = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    req.body.password = hashedPass;
    User.create(req.body)
        .then((newUser) => {
            jwt.sign({newUser}, process.env.SECRET, (err, token) => {
                res.json({token, message: "User creation successful"})
            })
        })
        .catch((error) => res.send(error));
});

userRouter.post('/login', async (req, res) => {
    console.log("Looking for user " + req.body.email)
    if (req.body.password) {
        await User.findOne({email: req.body.email})
            .then(foundUser => {
                if (foundUser === null) {
                    res.json({message: "User email or password incorrect."})
                } else {
                    const passwordsMatch = bcrypt.compareSync(req.body.password, foundUser.password);
                    if (passwordsMatch) {
                        console.log("Passwords match");
                        jwt.sign({foundUser}, process.env.SECRET, (err, token) => {
                            res.json({token, message: "Login successful"})
                        })
                    } else {
                        res.json({message: "User email or password incorrect."})
                    }
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
})

// Show
userRouter.get('/:id', (req, res) => {
    console.log("This is happening");
    User.findOne({_id: req.params.id}, (err, foundUser) => {
        jwt.sign({foundUser}, process.env.SECRET, (err, token) => {
            res.json({token, message: "Found user"})
        })
    })
})

module.exports = userRouter;
