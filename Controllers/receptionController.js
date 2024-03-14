
const { ObjectId ,MongoClient} = require("mongodb");
const getdb = require("../dbfunction");

var saveReception=async(req,res)=>{
    const {username,password,name,contact,type}=req.body;
    const db=await getdb();
    try{
        const recept=await db.collection("user").insertOne({username,password,type});
            if(!recept||recept==null){
                    res.json({status:false,msg:"invalid data"});
            }
            else{
                const data=await db.collection("reception").insertOne({name,contact});
                        if(!data||data==null){
                            res.json({status:false,msg:"insertion failed"});
                        }
                        else{
                            res.json({status:true,msg:"record inserted successfully",data:data});
                        }
            }
        }
        catch(err){
            res.json({status:false,error:err.message});
        }
    };

var deleteReception=async(req,res)=>{
    const idval=req.params.id;
    const db=await getdb();
    try{
        if(!id||id==null){
            res.json({status:false,msg:"null id not allowed"});
        }
        else{
            const data=await db.collection("reception").deleteOne({_id: new ObjectId(idval)});
                if(!data||data==null){
                    res.json({status:false,msg:"data not found"});
                }
                else{
                    res.json({status:true,msg:"document deleted successfully",data:data});
                }
        }
    }
    catch(err){
        res.json({status:false,error:err.message});
    }
}

var updateReception=async(req,res)=>{
    const {name,contact,id}=req.body;
    const db=await getdb();
    try{
    const data=await db.collection("reception").updateOne(
        {_id: new ObjectId()},
        {$set:{name,contact}}
        );
    if(!data||data==null){
        res.json({status:false,msg:'data not found'});
    }
    else{
        res.json({status:true,data:data});
    }
}
catch(err){
    res.json({status:false,error:err.message});
}
}

var searchReception=async(req,res)=>{
    const id=new ObjectId(req.params.id);
    const db=await getdb();
    try{
        if(!id||id==null){
            res.json({status:false,msg:"id not found"});
        }
        else{
            const data=await db.collection("reception").findOne({_id:id});
            if(!data||data==null){
                res.json({status:false,msg:"data not found"});
            }
            else{
                res.json({status:true,data:data});
            }
        }
    }
    catch(err){
        res.json({status:false,error:err.message});
    }
}

var searchAllReception=async(req,res)=>{
    const db=await getdb();
    try{
        const data=await db.collection("reception").find({}).toArray();
        if(!data||data==null){
            res.json({status:false,msg:"data not found"});
        }
        else{
            res.json({status:true,data:data});
        }
    }
    catch(err){
        res.json({status:false,error:err.message});
    }
}

module.exports={
    saveReception,
    deleteReception,
    updateReception,
    searchReception,
    searchAllReception
}
    
