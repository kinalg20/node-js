const Product = require('./product');
const mongoose = require('./config');
const express = require('express');
const app = express();
app.use(express.json())
const jwt = require("jsonwebtoken");

const userRegistration =
    (req, res) => {

        if (req.body.password != req.body.confirmPassword) {
            res.json({
                message: 'Password not Matched'
            })
        }

        else {
            var newUser = new Product({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password
            })
            newUser.save()
                .then((doc) => {
                    console.log('res', doc);
                    res.status(201).json({
                        message: 'Registered',
                        results: doc
                    });
                })

                .catch((error) => {
                    console.log('res', error);
                    res.json({
                        message: error,
                    })
                    // Object.keys(error.keyPattern).forEach((key) => {
                    //     console.log(key);
                    //     res.json({
                    //         message: key + ' is Already exist',
                    //     })
                    // })
                })
        }
    }


const getRegisteredData =
    (req, res) => {
        var detailsModel = mongoose.model("NewModel");
        detailsModel.find({})
        .then((doc) => {
            console.log(doc);
            res.json({
                message: 'All Data Fetched',
                results: doc
            })
        })

        .catch((error)=>{
            res.json({
                message: error
            })
        })
        console.log(detailsModel);
    }

const loginUser =
    (req, res) => {
        console.log(req.body);
        var detailsModel = mongoose.model("NewModel");
        console.log(detailsModel);
        detailsModel.findOne({ email: req.body.email, password: req.body.password })
        .then((doc) => {
            console.log(doc);
            if(doc){
                let token = jwt.sign({ name: doc.first_name + doc.last_name }, 'verySecretValue')
                res.json({
                    message: 'Logged in Successfully',
                    token: token
                })
            }

            else {
                res.json({
                    message: 'Email or Password incorrect',
                })
            }
        })
        
        .catch((error) => {
            console.log(error);
        })

    }



module.exports = {
    userRegistration,
    getRegisteredData,
    loginUser
}