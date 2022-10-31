import React, { useState, useEffect } from 'react';
import RecipeList from "../components/RecipeList";
import '../css/app.css';
import uuidv4 from 'uuid/v4';
import RecipeEdit from './RecipeEdit';



export const RecipeContext = React.createContext()

const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes'

function App() {
    const [selectedRecipeId, setSelectedRecipeId] = useState()

    const [recipes, setRecipes] = useState(() => { 
      const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (recipeJSON == null) {
        return sampleRecipes
      } else {
        return JSON.parse(recipeJSON)
      }
    })

    const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId)

    useEffect(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
    }, [recipes])



    const recipeContextValue = {
      handleRecipeAdd,
      handleRecipeDelete,
      handleRecipeSelect,
      handleRecipeChange
    }

    function handleRecipeSelect(id) {
      setSelectedRecipeId(id)
    }


    function handleRecipeAdd() {
      const newRecipe = {
      id: uuidv4(),
      name: '',
      servings: 1,
      cookTime: '',
      instructions: '',
      ingredients: [
        { id: uuidv4(), name: '', amount: ''}
      ]
      }

      setSelectedRecipeId(newRecipe.id)
      setRecipes([...recipes, newRecipe])
    }

    function handleRecipeChange(id, recipe) {
      const newRecipes = [...recipes]
      const index = newRecipes.findIndex(r => r.id === id)
      newRecipes[index] = recipe
      setRecipes(newRecipes)
    }


    function handleRecipeDelete(id) {
      if (selectedRecipeId != null && selectedRecipeId === id) {
        setSelectedRecipeId(undefined)
      }
      setRecipes(recipes.filter(recipe => recipe.id !== id))
    }

  return (
      <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes} />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
      </RecipeContext.Provider>

  )
}


const sampleRecipes = [
  {
    id: 1,
    name: "Plain chicken",
    servings: 3,
    cookTime: "1:45",
    instructions:
      "1. Put salt on chicken\n2. Put chicken in oven\n3. Eat chicken",
    ingredients: [
      {
        id: 1,
        name: "chicken",
        amount: "2 pounds",
      },
      {
        id: 2,
        name: "salt",
        amount: "1 tbs",
      },
    ],
  },
  {
    id: 2,
    name: "Plain pork",
    servings: 5,
    cookTime: "0:45",
    instructions: "1. Put papirika on pork\n2. Put pork in oven\n3. Eat pork",
    ingredients: [
      {
        id: 1,
        name: "pork",
        amount: "3 pounds",
      },
      {
        id: 2,
        name: "paprika",
        amount: "2 tbs",
      },
    ],
  },
];

export default App;
