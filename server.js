//Importing Require Packages
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Sudo Env Vriables
const DBURI = 'mongodb://localhost/attendance';

//Importing Data Models
const User = require('./models/user.model');
const Entry = require('./models/entry.model');

//Setting Up Express Server With MiddileWares
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Establishing Database Connection
mongoose.connect(DBURI, () => {
    console.log("Connected to DB");
}, (e) => {
    console.error(e)
})

//Defining Server Routes
app.get('/', (req, res) => {
    res.status(200).send("Hello from Attendace");
});

app.get('/users', async(req,res) => {
    const data = await User.find();
    res.status(200).json(data);
});

app.post('/users', async (req, res) => {
    const user_data = req.body
    user_data.password = bcrypt.hashSync(user_data.password,8);
    if (!user_data.email) {
        res.status(401).send("Email is Required");
    }
    else {
        const newUser = await User.create(user_data);
        res.status(200).json(newUser);
    }
});

app.delete('/users/:id', async(req,res) => {
    const deleted = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(deleted);
});

app.post('/entry', async(req,res) => {
    const access_code = req.body.access_code;
    const foundUser = await User.findOne({"access_code":access_code});
    if(!foundUser){
        res.status(200).send("this Access Code is un-regestird");
    }
    else{
        const entry_data = {
            in_time:Date.now(),
            user:foundUser._id
        }
        const newEntry = await Entry.create(entry_data);
        res.status(200).json(newEntry);
    }
});

//Starting Server
app.listen(5000, console.log("Server Started"));