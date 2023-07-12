const jwt = require("jsonwebtoken");

const generateToken = async (user,api_secret)=>{
    const accessToken = jwt.sign(
        { userId: user._id, email: user.email,role:user.role,isplayer:true,userRefAccount:user.userRefAccount},
        api_secret,{ expiresIn:'2h'}
      );
      return accessToken;
}
module.exports = generateToken;