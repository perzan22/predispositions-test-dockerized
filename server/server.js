const app = require("./app");
const debug = require("debug")("node-angular");
const http = require("http");

// Funkcja normalizująca port
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

// Funkcja zwracająca informacje o błędach
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

// Funkcja obsłlugjąca nasłuchiwanie na danym porcie
const onListening = () => {
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

// Normalizacja portu
const port = normalizePort(process.env.PORT || "3000");
// Ustawienie portu w interfejsie API
app.set("port", port);

// Utworzenie serwera odbierajacego żądania HTTP
const server = http.createServer(app);

// Nasłuchiwanie na porcie ustawionym przez funkcję normalizePort
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);