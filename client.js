const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDefination = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDefination);
const todoPackage = grpcObject.todoPackage;


const client = new todoPackage.Todo("localhost:3000");