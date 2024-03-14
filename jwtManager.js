const jwt=require('jsonwebtoken');
const dotenv=require("dotenv");
dotenv.config();

class JWT{
    generateAccessToken(userid,type){
        return jwt.sign({userid,type},process.env.TOKEN_SECRET,{expiresIn:'30m'});
    }
    authenticateToken(req,callback){
        const authHeader=req.headers['authorization'];
        const token=authHeader && authHeader.split(' ')[1];
        if(token==null){
            callback({status:false,msg:"Token missing"});
        }
        else{
            jwt.verify(token,process.env.TOKEN_SECRET,(err,tokenData)=>{
                if(err){
                    callback({status:false,msg:"Invalid Token"});
                }
                else{
                    req.userid=tokenData.userid;
                    req.usertype=tokenData.type;
                    console.log(req.userid,req.usertype);
                    callback({status:true,code:200,type:req.usertype,id:req.userid});
                }
            });
        }
    }
}

module.exports = new JWT();


