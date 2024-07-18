const grpc = require("@grpc/grpc-js");

const protoLoader = require("@grpc/proto-loader");

const packageDefination = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDefination);

const todoPackage = grpcObject.todoPackage;

var server = new grpc.Server();

server.addService(todoPackage.Todo.service, {
  createTodo: createTodo,
  readTodos: readTodos,
});

server.bindAsync(
  "0.0.0.0:3000",
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if(err){
        console.log("Err in Proto Init")
    }
    console.log("Started-",'--',port)
  }
);
 

function createTodo(call, callback) {
  console.log(call);
}
function readTodos(call, callback) {}
