const jwt = require("jsonwebtoken");

const generateToken = async (user,api_secret)=>{
    const accessToken = jwt.sign(
        { userId: user._id, email: user.email,company_id: user.companyId,role:user.role,isplayer:false},
        api_secret,{ expiresIn:'2d'}
      );
      return accessToken;
}
module.exports = generateToken;