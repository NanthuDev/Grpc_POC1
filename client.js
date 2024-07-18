const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDefination = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDefination);
const todoPackage = grpcObject.todoPackage;


const text = process.argv[2];


const client = new todoPackage.Todo("localhost:3000",grpc.credentials.createInsecure());

client.createTodo({
    "id":-1,
    "text":text
},(err,response)=>{
    console.log("Response from Server: ",JSON.stringify(response),err)    
})