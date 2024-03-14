const { MongoClient } = require("mongodb");

const getdb=()=>{
    var pr=new Promise(async(resolve,reject)=>{
        var url="mongodb://localhost:27017";
        var client=new MongoClient(url);
        client=await client.connect();
        const dbName="ShubhClinic";
        const db=await client.db(dbName);
        resolve(db);
    })
    return pr;
}

module.exports=getdb;