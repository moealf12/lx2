const mongoose = require('mongoose');


const PostSchema = mongoose.Schema({
  username:{
    type:String,
    require:true
  }
  ,
  password:{
    type:String,
    require:true
  },
  email:{
    type:String,
    require:true
  },
  phone:{
    type:Number,
    require:true
  },
  age:{
    type:String,
    require:true
  },
  contry:{
    type:String,
    require:true
  },
  gen:{
    type:String,
    require:true
  },
  ip:{
    type:String,
    require:true
  },
  city:{
    type:String,
    require:true
  },
  country:{
    type:String,
    require:true
  },
  country_calling_code:{
    type:String,
    require:true
  },
  country_name:{
    type:String,
    require:true
  },
  currency:{
    type:String,
    require:true
  },
  languages:{
    type:String,
    require:true
  },
  region:{
    type:String,
    require:true
  },
  timezone:{
    type:String,
    require:true
  },
  instore:[
    {type:Object,exp:String}
  ],
  messages:[
    {type:Object,exp:String}
  ],
  cart:[
    {type:Object,exp:String}
  ],
  Views:[
    {type:Object,exp:String}
  ],
  Comments:[
    {type:Object,exp:String}
  ],
  token:{type:String,require:true},
  isSel:{type:Boolean,default:false},
    bids:[
    {type:Object,exp:String}
  ]
  


})

module.exports = mongoose.model('Posts',PostSchema)
