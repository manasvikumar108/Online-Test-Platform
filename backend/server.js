const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());


mongoose.connect("mongodb://127.0.0.1:27017/OnlineTestPlatform", { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const userSchema = new mongoose.Schema({
    name: {type:String,required:true},
    username: {type:String,required:true},
    password: {type:String,required:true}
});
const Users = mongoose.model('Users', userSchema, 'Users');
app.post("/register", async (req, res) => {
    try {
        const { name, username, password } = req.body;
        const users = new Users({ name, username, password });
        await users.save();
        console.log('User registered:', users);
        res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Users.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        console.log('User logged in:', user);
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});






app.listen(2000, ()=>{
    console.log("Server started on port 2000");
})
