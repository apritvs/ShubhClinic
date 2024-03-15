
const getdb = require("../dbfunction");
const JWT=require("../jwtManager");
const { swaggerUi, specs } = require("../swagger");
const router=require("express").Router();
const receptionInfo=require("../Controllers/receptionController");
const doctorInfo=require("../Controllers/doctorController");
const patientInfo=require("../Controllers/patientController");
const { ObjectId } = require("mongodb");



//doctor SignUp api
router.post("/savedoctor",doctorInfo.doctorSignUp);


//doctor login api
router.post("/doctorlogin",async(req,res)=>{
    const {username,password,type}=req.body;
    try{
    if(type=="doctor"){
        const db=await getdb();
        const data=db.collection("user").findOne({$and:[{username,password,type}]})
        if(!data||data==null){
            res.json({status:false,msg:"data not found"});
        }
        else{
            const token=JWT.generateAccessToken(data._id,data.type)
            res.json({status:true,msg:"login successfull",token:token})
        }
    }
    else{
        res.json({status:false,msg:"invalid type"});
    }
}
catch(err){
    res.json({status:false,error:err.message});
}
})




router.post("/receptionlogin",async(req,res)=>{
        const {username,password,type}=req.body;
        const db=await getdb();
        try{
            if(type=="reception"){
                const data=await db.collection("user").findOne({$and:[{username,password,type}]});
                if(!data||data==null){
                    res.json({status:false,msg:"data not found"});
                }
                else{
                    const token=JWT.generateAccessToken(data._id,data.type);
                    res.json({status:true,msg:"login successfull",token});
                }
            }
            else{
                res.json({status:false,msg:"invalid type"})
            }
        }
        catch(err){
            res.json({status:false,error:err.message});
        }
    })

  
    router.get("/searchpatient/:id",patientInfo.searchPatient);
    router.get("/searchreception/:id",receptionInfo.searchReception);
    router.get("/searchallreception",receptionInfo.searchAllReception);

router.use((req,res,next)=>{
    JWT.authenticateToken(req,(result)=>{
        console.log(result);
        if(result.status){
            
            next();
        }
        else{
            res.json(result);
        }
    })
    });
  router.delete("/deleteReception/:id",receptionInfo.deleteReception);
    router.delete("/deletepatient/:id",patientInfo.deletePatient);
router.post("/savereception",receptionInfo.saveReception);
router.post("/addpatient",patientInfo.addPatient);
    
router.put("/updateReception/:id",async(req,res)=>{
        const {contact,name}=req.body;
        const db=await getdb();
        const id=req.params.id;
        try{
            const data=await db.collection("reception").updateOne(
                { _id: new ObjectId(id) }, 
                { $set: { name:name,contact:contact } }       
             )
             res.json({status:true,data:data});
        }
        catch(err){
            res.json({status:false,error:err.message});
        }
    })

router.put("/updatereception/:id",receptionInfo.updateReception);

router.post("/savepatient",async(req,res)=>{
        const {name,disease,doctor,contact}=req.body;
        const db=await getdb();
        try{
            const userData=await db.collection("patient").insertOne({name,disease,doctor,contact});
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
    })

router.delete("/deletePatient/:id",async(req,res)=>{
        const id=req.params.id;
        
            const db=await getdb();
            try{
                const data=await db.collection("patient").deleteOne({_id: new ObjectId(id)});
                if(!data||data==null){
                    res.json({status:false,msg:"data not found"});
                }
                else{
                    res.json({status:true,data:data,msg:"document deleted successfully"});
                }
            }
            catch(err){
                res.json({status:false,error:err.message});
            }
    })

router.delete("/deleteReception/:id",async(req,res)=>{
        const id=req.params.id;
        const db=await getdb();
        try{
            const data=await db.collection("reception").deleteOne({_id: new ObjectId(id)});
            if(!data||data==null){
                res.json({status:false,msg:"data not found"});
            }
            else{
                res.json({status:true,data:data,msg:"document deleted successfully"});
            }
        }
        catch(err){
            res.json({status:false,error:err.message});
        }
});

router.put("/updatepatient/:id",async(req,res)=>{
    const id=req.params.id;
    const {name,contact,disease,doctor}=req.body;
    const db=await getdb();
    try{
        const data=await db.collection("patient").updateOne(
            {_id:new ObjectId(id)},
            { $set: {name,contact,disease,doctor} }
            );
        res.json({status:true,msg:"record updated",data:data})
    }
    catch(err){
        res.json({status:false,error:err.message});
    }
});


module.exports=router;
