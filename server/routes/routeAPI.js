const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/model')


function verifyToken(req,res,next){
  if(!req.headers.authorization){
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1] 
  if(token === 'null'){
    return res.status(401).send('Unauthorized request')
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload){
    return res.status(401).send('Unauthorized request')
  }
  req.userId = payload.subject
  next()
}

router.get('/',(req,res)=>{
    res.send('API')
})

router.post('/register',(req,res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser)=>{
        if(error){
            console.log(error)
        } else {
            let token = jwt.sign({subject: registeredUser._id}, 'secretKey')
            res.status(200).send({token})
        }
    })
})

router.post('/login', (req,res) => {
    let userData = req.body
    User.findOne({email:userData.email},(error, user)=>{
        if(error){
            console.log(error)
        }else{
            if(!user){
                res.status(401).send('Invailed email')
            } else 
            if (user.password !== userData.password){
                res.status(401).send('Invalid password')
            } else {
                let token = jwt.sign({subject: user._id},'secretKey')
                res.status(200).send({token})
            }
        }
    })
})

router.get('/events',(req,res) => {
    let events = [
        {
          "_id": "1",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "2",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "3",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "4",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "5",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "6",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        }
      ]
    res.json(events)
})

router.get('/special', verifyToken , (req, res) => {
    let specialEvents = [
      {
        "_id": "1",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "2",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "3",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "4",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "5",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "6",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      }
    ]
    res.json(specialEvents)
})

module.exports = router;
