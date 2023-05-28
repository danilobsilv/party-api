const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());


// DB connection
const connect = require("./db/connect.js");
connect()

// Routes
const routes = require("./routes/router")
app.use("/api", routes);



app.listen(3333, function(){
      console.log("Server Online!\nListening on http://localhost:3333");
})