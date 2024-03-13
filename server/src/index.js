import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import { usersRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";

import { User } from "./models/Users.js";
import { Recipe } from "./models/Recipes.js";

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/auth", usersRouter);
app.use("/recipes", recipesRouter);



mongoose
  .connect(
    "mongodb+srv://shrudex:493219@recipebook.b1ir6uj.mongodb.net/recipeBook"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(5000, () => {
  console.log("Server has started");
});
