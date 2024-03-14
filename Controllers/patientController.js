const { ObjectId } = require("mongodb");
const getdb = require("../dbfunction");
const { get } = require("http");

var updatepatient=async(req,res)=>{
const id=new ObjectId(req.params.id);
    const {name,contact,disease,doctor}=req.body;
    const db=await getdb();
    try{
        const data=await db.collection("patient").updateOne(
            {_id:id},
            { $set: {name,contact,disease,doctor} }
            );
        res.json({status:true,msg:"record updated",data:data})
    }
    catch(err){
        res.json({status:false,error:err.message});
    }
};

var deletePatient=async(req,res)=>{
    const id=new ObjectId(req.params.id);
    const db=await getdb();
    try{
        const data=await db.collection("patient").deleteOne({_id: id});
        if(!data||data==null){
            res.json({status:false,msg:"data not found"});
        }
        else{
            res.json({status:true,data:data})
        }
    }
    catch(err){
        res.json({status:false,error:err.message});
    }
}

var addPatient=async(req,res)=>{
    const{name,disease,doctor,contact,date}=req.body;
    const db=await getdb();
    try{
        const PatientData=await db.collection("patient").insertOne({name,disease,doctor,contact,date});
        if(!PatientData||PatientData==null){
            res.json({status:false,msg:"data insertion failed"});
        }
        else{
            res.json({status:true,data:PatientData});
        }
    }
    catch(err){
        res.json({status:false,error:err.message});
    }
}

var searchPatient=async(req,res)=>{
    const id=new ObjectId(req.params.id);
    const db=await getdb();
    try{
        if(!id||id==null){
            res.json({status:false,msg:"id not found"})
        }
        else{
            const data=await db.collection("patient").findOne({_id:id});
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

module.exports={
    deletePatient,
    updatepatient,
    addPatient,
    searchPatient
}


