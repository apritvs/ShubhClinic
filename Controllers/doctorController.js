//doctor registration api

const getdb = require("../dbfunction");

var doctorSignUp=async(req,res)=>{
    const {name,specialization,contact,username,password,type}=req.body;
    const db=await getdb();
    try{
        const user=await db.collection("user").insertOne({username,password,type});
        const userData=await db.collection("doctor").insertOne({name,specialization,contact});
        if(!userData||userData==null){
            res.json({status:false,msg:"insertion failed"});
        }
        else{
            res.json({status:true,msg:"document saved Successfully"});
        }
    }
    catch(err){
        res.json({status:false,error:err.message});
    }
}

module.exports={
    doctorSignUp
}