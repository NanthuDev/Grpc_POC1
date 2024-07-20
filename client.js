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




client.readTodos({},(err,response)=>{
    console.log("Read from Server: ",JSON.stringify(response),err);
    response.items.forEach(item=>console.log(item))    

})


const call = client.readTodosStream();

call.on("data",(item)=>{
    console.log("Streamed item from the server:", item)    
})

call.on("end",e=>console.log("server done"));




