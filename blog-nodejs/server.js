const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();


//set express

const app = express();

app.use(cors());
app.use(express.json());

const Port = process.env.Port || 3000;
console.log("Starting server");
app.listen(Port, () => console.log(`Server running on port: ${Port}`));

//set routers

app.use('/post', require('./routers/postRouter'));




//set mongoose

console.log("Connecting to MongoDB");
mongoose.connect(process.env.MONGODB_URI, 
    { useNewUrlParser:true, useUnifiedTopology:true },
    (err) => {
    if(err) return console.error(err);
    console.log("MongoDB connection established");
})