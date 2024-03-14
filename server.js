const express=require("express");
const authRouter = require("./Routes/authRouter");
const { swaggerUi, specs } = require("./swagger");
const server=express();

server.use(express.json());

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
server.use("/auth",authRouter);


server.listen(3525,()=>{
    console.log("server running at port no 3525");
});