const EventEmitter = require("events");

const Logger = require("./Logger");
const logger = new Logger();
logger.on("messageLogged", (args) => {
  console.log("Listener called");
  console.log(args);
});
logger.log("HALLO");
