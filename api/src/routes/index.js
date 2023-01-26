const { Router } = require('express');
const { Recipe, TypeDiet } = require('../db');
const { getALLRecipes } = require("../controllers/recipe")

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get("/recipes", async (req, res) => {

  const { name } = req.query;
  let allInfo = await getALLRecipes();
  
  if (name) {
      try {
      let filteredRecipe = await allInfo.filter((e) =>
          e.name.toLowerCase().includes(name.toLowerCase())
      );
      filteredRecipe.length
          ? res.status(200).send(filteredRecipe)
          : res.status(404).send("No pudimos encontrar una receta con ese nombre");
      } catch (error) {
      return res.status(400).send("Error");
      }
  } else {
      res.send(allInfo);
  }
  });




router.get("/recipes/:id", async (req, res) => {

  try {
      const { id } = req.params;
      const recipesTotal = await getALLRecipes();
      if (id) {
          let recipeId = await recipesTotal.filter((r) => r.id == id);
          if(recipeId.length) res.status(200).json(recipeId)  
  } }catch (error) {
      res.status(404).send(error,"No pudimos encontrar esta receta");
  }
  
  
  
});


router.get("/diets", async (req, res) => {
  let types = [
      "gluten free",
      "dairy free",
      "paleolithic",
      "lacto ovo vegetarian",
      "primal",
      "whole 30",
      "fodmap friendly",
      "ketogenic",
      "pescatarian",
      "vegan"
  ]
  types.forEach(async (e)=> {
      await TypeDiet.findOrCreate({
          where: { name: e }
      })
  });
  let result = await TypeDiet.findAll()
  return res.send(result)
});


router.post("/recipes", async(req,res) => {
  let{ name, summary, healthscore, steps, diets, image, dishtypes } = req.body
  try {
      let recipeCreated = await Recipe.create({
          name,
          summary,
          healthscore,
          image: image?image:'https://as1.ftcdn.net/v2/jpg/00/72/21/26/1000_F_72212653_QvOxnmRuncbq0MRCKem7h4kU3BNwCCJT.jpg',
          steps,
          dishtypes
      });
      
      const typediet = await TypeDiet.findAll({
          where: {name: diets}
      });
      await recipeCreated.addTypeDiet(typediet)
      res.status(200).send(recipeCreated)
  } catch (error) {
      res.status(404).send(error)
  }
})


module.exports = router;