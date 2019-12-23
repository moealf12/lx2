const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var path = require('path');
const Home = require('./roots/Home')
const app = express();
app.use(cors())
// import route
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/',Home);
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const Post = require('./model/Post');


// pro //


const PORT = process.env.PORT || 5000





mongoose.connect('mongodb+srv://moe:Aa7788000@moe-pxfnp.gcp.mongodb.net/test?retryWrites=true&w=majority'
,{ useUnifiedTopology: true },
()=>{
  console.log('Server is up')
})






app.listen(PORT,()=>console.log(`app is up on PORT ${PORT}`));
