const express = require('express');
const router = express.Router();
const Post = require('../model/Post')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt');


router.patch('/user/:username',async (req,res)=>{
  try{
    const update = await Post.updateOne(
      {username:req.params.username},
      {$set:{username:req.body.username}}
    );
    res.json(update)
  }catch(err){
    res.json({mag:err})
  }
})



router.get('/item/bid/:username',async (req,res)=>{
  try{
    const update = await Post.updateOne(
      {username:req.params.username},
      {$push:{bids:req.body.bids}}
    );
    res.json(update)
  }catch(err){
    res.json({mag:err})
  }
})



  router.patch('/user/add/:username',async (req,res)=>{
    try{
      const update = await Post.updateOne(
        {username:req.params.username},
        {$push:{instore:req.body.instore}}
      );
      res.json(update)
    }catch(err){
      res.json({mag:err})
    }
  })

// find(views )
// obj.arr.
router.put('/user/add/views/:username',async (req,res)=>{
  try{
    const update = await Post.updateOne(
      {username:req.params.username},
      {$push:{Views:req.body.Views}}
    );
    res.json(update)
  }catch(err){
    res.json({mag:err})
  }
})


router.patch('/user/addcart/:username',async (req,res)=>{
  try{
    const update = await Post.updateOne(
      {username:req.params.username},
      {$push:{cart:req.body.cart}}
    );
    res.json(update)
  }catch(err){
    res.json({mag:err})
  }
})



router.patch('/user/message/:username',async (req,res)=>{
  try{
    const update = await Post.updateOne(
      {username:req.params.username},
      {$set:{token:req.body.token}}
    );
    res.json(update)
  }catch(err){
    res.json({mag:err})
  }
})




// bj.array[indexof(obj)]
router.patch('/user/messages/:username',async (req,res)=>{
  try{
    const update = await Post.updateOne(
      {username:req.params.username},
      {$push:{messages:req.body.messages}}
    );
    res.json(update)
  }catch(err){
    res.json({mag:err})
  }
})



router.get('/user/comments/:id',async (req,res)=>{
  try{

    const result = await Post.find({"username":req.params.id})
    res.send(result)
  }catch(err){
    res.json({msg:err})
  }

})


router.get('/user/auth/token/:id',async (req,res)=>{
  try{
    const result = await Post.find({"username":req.params.id})
    res.send(result)
  }catch(err){
    res.json({msg:err})
  }

})



router.get('/shop/item/view/:username/:id',async (req,res)=>{
  try{
    const result = await Post.find({"username":req.params.username})
    result.map(x=>{
      x.instore.map(r=>{
        (r.id == req.params.id) ? res.send(r):res.send('naah')
      })

    })
  }catch(err){
    res.json({msg:err})
  }

})


router.put('/user/comment/:username',async (req,res)=>{
  try{
    const update = await Post.updateOne(
      {username:req.params.username},
      {$push:{"Comments":req.body.comments}}
    );
    res.json(update)

  }catch(err){
    res.json({mag:err})
  }
})



router.get('/database',async (req,res)=>{
  try{
    const posts  = await Post.find()
    const kk = 'x'
    res.json({posts})
  }catch(err){
    res.json({"msg":err})
  }

})


router.get('/shop/:id',async (req,res)=>{
  try{

    const result = await Post.find({"username":req.params.id})
    res.send(result)
  }catch(err){
    res.json({msg:err})
  }

})

router.get('/login/:auth',async (req,res)=>{
  try{

    const result = await Post.find({"email":req.params.auth})
    res.send(result)
    console.log(result);
  }catch(err){
    res.json({msg:err})
  }

})



router.post('/home/login',async (req,res)=>{
  const hashed  = await bcrypt.hash(req.body.password,10)
  const post = new Post({
    username:req.body.username,
    password:hashed,
    email:req.body.email,
    phone:'0'+req.body.phone,
    instoer:req.body.instoer,
    cart:req.body.cart,
    age:req.body.age,
    contry:req.body.contry,
    gen:req.body.gen,
    ip:req.body.ip,
    city:req.body.city,
    country:req.body.country,
    country_calling_code:req.body.country_calling_code,
    country_name:req.body.country_name,
    currency:req.body.currency,
    languages:req.body.languages,
    region:req.body.region,
    timezone:req.body.timezone


  });
  try{

    const Savepost = await post.save()
    console.log(Savepost);
    const options = {
    pool: true,
    host: "smtp-relay.gmail.com",
    port: 465,
    secure: true, // use TLS
    auth: {
      user: "designerhubdev@gmail.com",
      pass: "DesHup1234"
    }
  }
    //let transporter = nodemailer.createTransport(options,null)//
    let transporter = nodemailer.createTransport({
      service:'Gmail',
      auth:{
        user:"designerhubdev@gmail.com",
        pass:"DesHup1234"
      }
    })

    // console.log(transporter);
    var currentdate = new Date();
  var datetime = "Last Sync: " + currentdate.getDate() + "/"
                  + (currentdate.getMonth()+1)  + "/"
                  + currentdate.getFullYear() + " @ "
                  + currentdate.getHours() + ":"
                  + currentdate.getMinutes() + ":"
                  + currentdate.getSeconds();
    var message = {
      from: "designerhubdev@gmail.com",
      to: `${req.body.email}`,
      subject: ' New Reg',
      text: `hey ${req.body.username}`,
      html: `<p> hey ${req.body.username} Its a thank you for dealing with Dishub  <br/> on ${datetime}</p>`

    };
    transporter.sendMail(message,(err,info)=>{
      console.log('err',err);
      console.log('info',info);
    })


    res.redirect('http://localhost:3000/');

  }catch(err){
    res.json({mes:err })
  }

});










router.post('/admin/SendMail/ac',(req,res)=>{
  const options = {
  pool: true,
  host: "smtp-relay.gmail.com",
  port: 465,
  secure: true, // use TLS
  auth: {
    user: "designerhubdev@gmail.com",
    pass: "DesHup1234"
  }
}
  //let transporter = nodemailer.createTransport(options,null)//
  let transporter = nodemailer.createTransport({
    service:'Gmail',
    auth:{
      user:"designerhubdev@gmail.com",
      pass:"DesHup1234"
    }
  })

  // console.log(transporter);
  var currentdate = new Date();
var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();
  var message = {
    from: "designerhubdev@gmail.com",
    to: "alfisalmohammed@gmail.com",
    subject: `Server Monks - approvel on Item ${req.body.fname}`,
    text: 'hello',
    html: `<p>Dear ${req.body.fname} Your Requist on the Item ${req.body.fname} is Aproved <br/> on ${datetime}</p>`
  };
  transporter.sendMail(message,(err,info)=>{
    console.log('err',err);
    console.log('info',info);
  })
  res.send({msg:'ok'})

})

module.exports = router
