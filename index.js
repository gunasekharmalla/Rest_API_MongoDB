require("dotenv").config();
const express = require("express");
const app = express();
const {v4: uuidv4} = require("uuid");
const mongoose = require("mongoose");
const User = require("./models/users");   
const port = 3000;

app.use(express.json()); 

/*
let users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "guna" },
    { id: 4, name: "sai" }
];
*/

/*

app.post("/users", (req, res) => {
    const {name, age} = req.body;
    if (!name || !age) {
        return res.status(400).json({ error: "Name and age are required" });
    }else{
        const newUser = { id: uuidv4(), name, age };
        users.push(newUser);
        res.status(201).json({
            message: "User created successfully",
            user: newUser
        });  
    }
})

*/

//let User = require("./models/User");

app.post("/users", async (req, res) => {
  try {
    const { name, age } = req.body;

    if (!name || !age) {
      return res.json({ error: "Please enter name & age" });
    }

    const newUser = new User({ name, age });
    await newUser.save();

    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.put("/users/:id", async (req,res)=>{
 const {id} = req.params
 const {name, age} = req.body
 if(!name || !age){
    return res.status(400).json({error: "Name and age are required"});
 }
 try{
    const updatedUser = await User.findByIdAndUpdate(id, {name, age}, {new: true})
    if(!updatedUser){
        return res.status(404).json({error: "User not found"});
    }
    res.json(updatedUser)
 }catch(err){
    res.status(500).json({error: err.message});
 }
})

/*
app.delete("/users/:name",(req, res)=>{
    const {uname} = req.params
    const initialLength = users.length;
    users = users.filter(user => user.name !== uname);
    if(users.length < initialLength){
        res.json({message: `User ${uname} deleted successfully`});
    }else{
        res.status(404).json({error: `User ${uname} not found`});
    }
})
*/
/*
app.get("/users/search",(req, res)=>{
    const {id} = req.query.id;
    const user = users.find(user => user.id === parseInt(id));
    if(user){
        res.json({message: `User with id ${id} found`, data: user});
    }else{
        res.status(404).json({error: `User with id ${id} not found`});
    }
})

*/

/*/ DELETE user by name
app.delete("/users/:name", async (req, res) => {
    const { name } = req.params;
    const initialLength = users.length;

    users = await User.deleteOne({name}) //users.filter(user => user.name !== name);

    if (users.length < initialLength) {
        res.json({ message: `User ${name} deleted successfully` });
    } else {
        res.status(404).json({ error: `User ${name} not found` });
    }
});
*/

app.delete("/users/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const result = await User.deleteOne({ name });

    if (result.deletedCount > 0) {
      res.json({ message: `✅ User ${name} deleted successfully` });
    } else {
      res.status(404).json({ error: `User ${name} not found` });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SEARCH user by id (query)
/*
app.get("/users/search",  async (req, res) => {
    const { id } = req.query;
    const user = await User.findById(id) //users.find(user => user.id === parseInt(id));

    if (user) {
        res.json({ message: `User with id ${id} found`, data: user });
    } else {
        res.status(404).json({ error: `User with id ${id} not found` });
    }
});
*/

app.get("/users/search", async (req, res)=>{
    const {name} = req.query; 
    try{
        const user = await User.findOne({name})
        res.json(user)
    }catch(err){
        res.status(500).json({error: err.message});
    }
})


app.get("/users", async (req, res) => {
     try{
        const users = await User.find(); 
        res.json(users);
     }catch(err){
        res.status(500).json({error: err.message});
     }
})


mongoose.connect("mongodb://127.0.0.1:27017/mydb") 
  .then(() => console.log(" MongoDB connected"))
  .catch(err => console.error(" MongoDB connection error:", err));



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
