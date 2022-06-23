const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');



const MONGODB_URI = 'mongodb://localhost:27017';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
    title: 'Pizza Hawaiana',
    cuisine: 'Mediterranean'  
    })
  })
  .then((result) => {
    console.log(result.title)
  })
  .then(() => {
    return Recipe.insertMany(data)
  })
  .then((allRecipes) => {
    let allRecipesTitle = allRecipes.map((recipeTitle) => {
      return recipeTitle.title;
    })
    console.log(allRecipesTitle)
  })
  .then(() => {
    return Recipe.findOneAndUpdate( 
      {title: 'Rigatoni alla Genovese'},
      {duration: 100},
      {new: true}
    )
  })
  .then (() => {
    console.log('Succes')
  })
  .then (() => {
    return Recipe.deleteOne(
      {title:'Carrot Cake'},
    )
  })
  .then (() => {
    console.log('Succes')
  })

  .then (() => {
    mongoose.connection.close()
  })
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
