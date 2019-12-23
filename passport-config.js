const LocalStrategy = require('passport-local').Strategy


function initialize(passport){
  const  authname = (username,email,pass)=>{

  }
  passport.use(new LocalStrategy({usernameField:'email'}),
  authuser)
  passport.serializeUser((user,done)=>{ })
  passport.deserializeUser((id,done)=>{ })
}
