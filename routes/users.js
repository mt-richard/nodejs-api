const express = require('express')
const { Route } = require('react-router-dom')
const route = express.Router()
const app =express()
const { users } = require('../models/index.js')
const { col } = require('sequelize')


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
});

route.delete('/delete/:id', async(req, res) => {
    const userid = req.params.id;
    const selecteduser = await users.findByPk(userid).then(
        user => {
            if (!user) {
                res.sendStatus(404)
            } else {
                user.destroy()
                res.send("User deleted.....")
            }
    })
});

route.put('/edit/:id', async(req, res) => {
    const userid = req.params.id;
    const { name, email, username, password} =req.body
    const getuser = await users.findByPk(userid)
        .then(user =>{
            if (!user) {
                res.sendStatus(404)
            } else {
                    user.name = name
                    user.email = email 
                    user.username = username
                    user.password = password
                    user.save()
                    res.send({"message":"User Update", "user": user})
                    // console.log({"message":"User Update", "user": user})
                    
            }
        })
    // res.send(getuser);
});



route.get('/:id', async(req, res) => {
    const userid = req.params.id;
    const getuser = await users.findByPk(userid)
    res.send(getuser);
});
// app.put('/:id', (req, res) => {
//     const id = req.params.id
//     const { name, email, password } = req.body;
//     User.findByPk(id)
//       .then(user => {
//         if (!user) {
//           res.sendStatus(404); 
//         } else {
//           user.name = name;
//           user.email = email;
//           user.password = password;
//           user.save()
//             .then(() => {
//               console.log(`User ${id} updated`);
//               res.sendStatus(204); 
//             })
//             .catch(err => {
//               console.error(err);
//               res.sendStatus(500); 
//             });
//         }
//       })
//       .catch(err => {
//         console.error(err);
//         res.sendStatus(500); 
//       });
//   });
  

module.exports = route