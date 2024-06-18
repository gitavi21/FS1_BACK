var http1s= require('http')
const debug = require("debug")("node-angular");
var exp1= require('./app')
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
const onListening = () => {
    const addr = ser1.address();
    const bind = typeof port === "string" ? "pipe " + port : "port " + port;
    debug("Listening on " + bind);
  };
  const port = normalizePort(process.env.PORT || "311");
  exp1.set('port',port)//telling exp port

const ser1 = http1s.createServer(exp1)
ser1.on("error", onError);//listener for onerror
ser1.on("listening", onListening);//listner for listening
ser1.listen(port)
//traditional way of responding

