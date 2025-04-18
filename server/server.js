/////////////////////////////
// CREATE NODE HTTP SERVER // 
/////////////////////////////

// imports

const app = require("./app");
const debug = require("debug")("node-angular");
const http = require("http");

// normalize port

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

// method to handle server errors

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// function for listening on port

const onListening = () => {
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

// set port in api interface

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// create server for handling HTTP requests
const server = http.createServer(app);

// start server on specific port

server.on("error", onError);
server.on("listening", onListening);
server.listen(port);