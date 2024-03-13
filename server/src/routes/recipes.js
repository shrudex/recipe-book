import express from "express";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { Recipe } from "../models/Recipes.js";

const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

router.post("/create", async (req, res) => {
  const { name, ingredients, instructions, imageUrl, cookingTime, userOwner } =
    req.body;
  console.log(req.body);
  const newRecipe = new Recipe({
    name,
    ingredients,
    instructions,
    imageUrl,
    cookingTime,
    userOwner,
  });

  await newRecipe.save();
  res.json({
    message: "✅ Recipe created successfully!",
    color: "green",
    recipe: newRecipe,
  });
});

router.put("/save", async (req, res) => {
  const { userID, recipeID } = req.body;
  const recipes = await Recipe.findById(recipeID);
  const user = await User.findById(userID);

  user.savedRecipes.push(recipes);
  await user.save();
  res.json({ message: "✅ Recipe saved successfully", color: "green" });
});

router.get("/saved", async (req, res) => {
  const { userID } = req.body.userID;
  const user = await User.findById(userID);
  const savedRecipes = user.savedRecipes;
  res.json(savedRecipes);
});

router.get("/savedRecipe", async (req, res) => {
  const { userID, recipeID } = req.body;
  const user = await User.findById(userID);
  const savedRecipes = await Recipe.find({
    _id: { $in: user.savedRecipes },
  });

  res.json(savedRecipes);
});

export { router as recipesRouter };
