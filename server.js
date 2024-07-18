const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const packageDefination = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefination(packageDef);

const todoPackage = grpc.todoPackage;

const server = new grpc.Server();
server.bind("locahost:3000",grpc.ServerCredentials.createInsecure());

