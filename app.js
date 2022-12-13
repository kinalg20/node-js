// var http = require("http");
const express = require('express');
const app = express();
app.use(express.json())
const mongoose = require('./config');
const authController = require('./functions');

const PORT = 3000;

app.post('/create', authController.userRegistration)
app.post('/login', authController.loginUser)
app.get('/user' , authController.getRegisteredData)


app.listen(PORT);