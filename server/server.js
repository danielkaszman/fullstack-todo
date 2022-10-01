const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const todosRoutes = require("./Routes/Todos");
const userRoutes = require("./Routes/Users");

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(
  session({
    secret: "randomTitok",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 12,
    },
  })
);

mongoose.connect(
  "mongodb://localhost/tododb",
  () => {
    console.log("Connected to DB!");
  },
  (error) => console.log(error)
);

app.use("/todos", todosRoutes);

app.use("/user", userRoutes);

app.listen(3001, () => {
  console.log("Server is running...");
});
