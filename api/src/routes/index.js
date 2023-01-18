const { Router } = require('express');
const axios = require('axios');
const { Recipe, TypeDiet } = require('../db');
const e = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`);
    const apiInfo = await apiUrl.data.map(el => {
      return {
        id: el.id,
        title: el.title,      
        img: el.img,
        typeDiets: el.diets.map((d)=>{
            return { name: d};
        }), // array con tipos de dietas
        spoonacularScore: el.spoonacularScore, //puntuacion
        dishTypes: el.dishTypes.map((d) => {
            return { name: d} ;
        }), // tipo de plato
        summary: el.summary, // resumen del plato
        healthScore: el.healthScore, // que tan saludable es
        analyzedInstructions : el.analyzedInstructions, // paso a paso de como se hace
      };
    });
    return apiInfo;
  }
const getDbInfo = async () => {
    return await Recipe.findAll({
        include: {
            model: TypeDiet,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
};
  
const getAllRecipes = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}

router.get('/recipes', async (req, res) => {
    const name = req.query.name;
    let recipesTotal = await getAllRecipes();
    // includes(name) --> name es lo que le paso por el query
    //el.name.toLowerCase() es la parte de la api walter y .includes(name.toLowerCase()) es para comparar como una busqueda más global.
    if (name) {
      let recipeName = await recipesTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
      recipeName.length ? res.status(200).send(recipeName) : res.status(404).send('No está la receta');
    } else {
      res.status(200).send(recipesTotal)
    }
});

 
  
  
 
  module.exports = router;