const express = require('express')
const { Route } = require('react-router-dom')
const route = express.Router()
const app =express()
const { users } = require('../models/index.js')

route.get('/', async(req, res) =>{
    const alluser = await users.findAll();
    res.json(alluser)
});
route.post('/add', async(req, res) =>{
    const  data= {
        name:req.body.name, 
        email:req.body.email, 
        username:req.body.username, 
        password:req.body.password } 
    const user = await users.create(data);
    res.json(user)
})

module.exports = route