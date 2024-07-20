const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDefination = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDefination);
const todoPackage = grpcObject.todoPackage;

var server = new grpc.Server();

 server.addService(todoPackage.Todo.service, {
  createTodo: createTodo,
  readTodos: readTodos,
  readTodosStream:readTodosStream
});

server.bindAsync(
  "0.0.0.0:3000",
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.log("Err in Proto Init");
    }
    console.log("Started-", "--", port);
  }
);

const todos = [];

function createTodo(call, callback) { 
  console.log(call.request);
  const item = {
    id: todos.length + 1,
    text: call.request.text,
  };
  todos.push(item);
  callback(null, item);
}

function readTodos(call,callback){
  callback(null,{"items":todos})
}

function readTodosStream(call,callback){
  todos.forEach(t=> call.write(t));
  call.end();
}
 