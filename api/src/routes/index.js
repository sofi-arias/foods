const { Router } = require('express');
const { Recipe, TypeDiet } = require('../db');
const { getALLRecipes } = require("../controllers/recipe")

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", async (req, res) => {

  const { name } = req.query;
  let allInfo = await getALLRecipes();
  
  if (name) {
      try {
      let filteredRecipe = await allInfo.filter((e) =>
          e.name.toLowerCase().includes(name.toLowerCase())
      );
      filteredRecipe.length
          ? res.status(200).send(filteredRecipe)
          : res.status(404).send("Não achamos receita com esse nome");
      } catch (error) {
      return res.status(400).send("Deu errado");
      }
  } else {
      res.send(allInfo);
  }
  });




router.get("/:id", async (req, res) => {

  try {
      const { id } = req.params;
      const recipesTotal = await getALLRecipes();
      if (id) {
          let recipeId = await recipesTotal.filter((r) => r.id == id);
          if(recipeId.length) res.status(200).json(recipeId)  
  } }catch (error) {
      res.status(404).send(error,"Não achamos essa receita");
  }
  
  
  
});


router.get("/", async (req, res) => {
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


router.post("/", async(req,res) => {
  let{ name, summary, healthscore, steps, diets, image, dishtypes } = req.body
  try {
      let recipeCreated = await Recipe.create({
          name,
          summary,
          healthscore,
          image: image?image:'https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_640.png',
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