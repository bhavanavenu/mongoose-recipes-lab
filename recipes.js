const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: [String],
  cousine: { type: String, required: true },
  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, default: Date.now }
});

const Recipe = mongoose.model("recipe", recipeSchema);

Recipe.create({
  title: "French Onion Soup"
})
  .then(Recipe => {
    console.log("Recipe has been created", Recipe);
  })
  .catch(err => {
    console.log("An error has occured");
  });


Recipe.insertMany(data)
  .then((data) => { console.log('The recipes are saved') })
  .catch((err) => { console.log('An error happened:', err) });

Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  .then((recipe) => { console.log('The recipe is updated') })
  .catch((err) => { console.log('An error happened:', err) });

Recipe.deleteOne({ title: "Carrot Cake" })
  .then((recipe) => { console.log('The recipe is deleted') })
  .catch((err) => { console.log('An error happened:', err) });


//mongoose.connection.close();
