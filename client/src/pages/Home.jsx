import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Card from "../components/Card";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/recipes");
        const recipesWithUsernames = await Promise.all(
          response.data.map(async (recipe) => {
            try {
              const userResponse = await axios.post(
                "http://localhost:5000/auth/getUser",
                { userID: recipe.userOwner }
              );
              const username = userResponse.data.username;
              return { ...recipe, username };
            } catch (error) {
              console.error("Error fetching user:", error);
              return { ...recipe, username: null };
            }
          })
        );

        setRecipes(recipesWithUsernames);
        console.log(recipesWithUsernames);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="flex-col items-center justify-center py-6 w-full">
      <div className="">
        <h1 className="text-2xl font-semibold text-center leading-7 text-gray-900">
          All Recipes
        </h1>
      </div>
      <div className="w-full mt-4 mx-auto flex justify-center items-center px-4 md:px-28 lg:px-40 xl:px-96">
        <div className="flex flex-col gap-5">
          {recipes.map((recipe) => (
            <Card
              key={recipe._id}
              name={recipe.name}
              imageUrl={recipe.imageUrl}
              ingredients={recipe.ingredients}
              instructions={recipe.instructions}
              cookingTime={recipe.cookingTime}
              userName={recipe.username}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
