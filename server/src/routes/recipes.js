import express from "express";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { Recipe } from "../models/Recipes.js";
import { User } from "../models/Users.js";
const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

router.post("/create", async (req, res) => {
  const { name, ingredients, instructions, imageUrl, cookingTime, userOwner } =
    req.body;
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

router.get("/saved/:id", async (req, res) => {
  const userID = req.params.id;
  const user = await User.findById(userID);
  const savedRecipes = user.savedRecipes;
  res.json(savedRecipes);
});

router.get("/:id", async (req, res) => {
  const recipeID = req.params.id;
  const recipe = await Recipe.findById(recipeID);
  res.json(recipe);
});

export { router as recipesRouter };
