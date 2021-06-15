require('dotenv').config();

const express = require('express');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const cors = require("cors");
const app = express();
const mongoose = require('mongoose');
const DATABASE_URL = process.env.DATABASE_URL;
const secret = process.env.SECRET;


// Middleware
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false
}))


mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', () => console.log('Database failed to connect'));
db.on('connected', () => console.log('Connected to Trotr MongoDB'));
db.on('disconnected', () => console.log('Connection to Trotr MongoDB ended'));

// Mount Middleware
app.use(fileUpload({createParentPath: true}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routers * Controllers
const userController = require('./controllers/users');
app.use('/user', userController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Trotr server running on port ' + PORT);
})