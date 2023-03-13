var path = require('path');
var express = require('express');

var fs = require('fs')
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

var exphbs = require('express-handlebars');

var postData = require("./postData.json");
console.log("== postData:", postData);

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs.engine({
    defaultLayout: "home"
  }));
app.set('view engine', 'handlebars');
  
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res){
    console.log("title: ", postData[0]["title"]);
    
    var allScrollers = [];
    for(var i = 0; i < postData.length; i++){
        allScrollers.push({
            title: postData[i]["title"], 
            photoURL: "idk",
            description: postData[i]["title"],
            carbs: postData[i]["macroNutrientGrams"]["carbs"],
            fat: postData[i]["macroNutrientGrams"]["fats"],
            protein: postData[i]["macroNutrientGrams"]["protein"]
        })
    }
    console.log("==rendering home:", allScrollers);
    
    res.status(200).render('layouts/home', {scrollers: allScrollers});
});

class UserRequest {


  constructor(ingredient_input, nutrient_input, nutrient_amount, grams, compare_symbol) {
      this.ingredient_input = ingredient_input;
      this.nutrient_input = nutrient_input;
      this.nutrient_amount = nutrient_amount;
      this.get_grams = grams;
      this.compare_symbol = compare_symbol;
  }


  get ingredient_input() {
      return this._ingredient_input;
  }


  get nutrient_input() {
      return this._nutrient_input;
  }
 
  get nutrient_amount() {
      return this._nutrient_amount;
  }


  get grams() {
      return this._grams;
  }


  get compare_symbol() {
      return this._compare_symbol;
  }


  set ingredient_input(input) {
      this._ingredient_input = input;
  }


  set nutrient_input(input2) {
      this._nutrient_input = input2;
  }
 
  set nutrient_amount(amount) {
      this._nutrient_amount = amount;
  }


  set grams(input3) {
      this._grams = input3;
  }


  set compare_symbol(symbol) {
      this._compare_symbol = symbol;
  }


  user_input_found() {
      if ((this.ingredient_input === "") && (this.nutrient_input === "")) {
          return "There was nothing inputted from the user.";
      }
      else {
          let api_response = new APIResponse(this.ingredient_input, this.nutrient_input, this.nutrient_amount, this.grams, this.compare_symbol);
          api_response.check_search();


          let recipes = api_response.recipes_found;
          return recipes;
      }
  }


}


class APIResponse {


  constructor(ingredient_input, nutrient_input, nutrient_amount, grams, compare_symbol) {
      this.ingredient_input = ingredient_input;
      this.nutrient_input = nutrient_input;
      this.nutrient_amount = nutrient_amount;
      this.get_grams = grams;
      this.compare_symbol = compare_symbol;
      this.recipes_found = [];
      this.database_recipes = postData;
          
      
  }


  get ingredient_input() {
      return this._ingredient_input;
  }


  get nutrient_input() {
      return this._nutrient_input;
  }
 
  get nutrient_amount() {
      return this._nutrient_amount;
  }


  get grams() {
      return this._grams;
  }


  get compare_symbol() {
      return this._compare_symbol;
  }


  get recipes_found() {
      return this._recipes_found;
  }


  set ingredient_input(input4) {
      this._ingredient_input = input4
  }


  set nutrient_input(input5) {
      this._nutrient_input = input5;
  }
 
  set nutrient_amount(amount2) {
      this._nutrient_amount = amount2;
  }


  set grams(input6) {
      this._grams = input6;
  }


  set compare_symbol(symbol7) {
      this._compare_symbol = symbol7;
  }


  set recipes_found(recipes) {
      this._recipes_found = recipes;
  }


  check_search() {
      let recipes = [];


      if (this.nutrient_input === "") {
          recipes = this.ingredient_search(this.ingredient_input, this.database_recipes);
      } else if (this.ingredient_input === "") {
          recipes = this.nutrient_search(this.nutrient_input, this.nutrient_amount, this.unit, this.database_recipes);
      } else {
          recipes = this.complete_search(this.ingredient_input, this.nutrient_input);
      }
      this.recipes_found = recipes;
  }


  ingredient_search(ingredient, recipes_to_search) {
      user_recipes = []
      for (i = 0; i < recipes_to_search.length(); i++) {
          for (j = 0; j < recipes_to_search[i]["ingredients"]; j++) {
              if (ingredient === recipes_to_search[i]["ingredients"][j]) {
                  user_recipes.push(recipe)
              }  
             
          }
             


      }


      return user_recipes
  }


  nutrient_search(nutrient, user_amount, unit, recipes_to_search) {
      let user_recipes = []


      let nutrient_amt = ""

    console.log("==unit:", unit);
      if (unit === 'g' || ' g') {
          nutrient_amt = "macroNutrientGrams"
      } else {
          nutrient_amt = "macroNutrientPercentages"
      }
     console.log("==recipes_to_search", recipes_to_search);
     console.log("==nutrient_amt", nutrient_amt);
     console.log("==nutrient", nutrient);
     console.log("==result:", recipes_to_search[0][nutrient_amt][nutrient])

      for (var i = 0; i < recipes_to_search.length; i++) {
        let recipe = recipes_to_search[i];
          let compare_amount = recipes_to_search[i][nutrient_amt.toString()][nutrient.toString()];
          if (this.search_with_symbol(user_amount, compare_amount, this.compare_symbol) === true) {
              user_recipes.push(recipe);
          }
             
      }

      console.log("==user_recipes:", user_recipes);
      return user_recipes;
  }


  search_with_symbol(amount, compare_amount, symbol) {

    console.log("==symbol:", symbol);
    console.log("==amount:", amount);
    console.log("==compare_amount", compare_amount);
      if (symbol === '<') {
          if (amount < compare_amount) {
              return true
          } else {
              return false
          }
      } else if (symbol === '<=') {
          if (amount <= compare_amount) {
              return true
          } else {
              return false
          }
      } else if (symbol === '=') {
          if (amount === compare_amount) {
              return true
          } else {
              return false
          }
      } else if (symbol === '>') {
          if (amount > compare_amount) {
              return true
          } else {
              return false
          }
      } else if (symbol === '>=') {
          if (amount >= compare_amount) {
              return true
          } else {
              return false
          }
      } else {
          return false
      }
 
  }


  complete_search(ingredient, nutrient) {
      let new_recipes_to_search = this.ingredient_search(ingredient, this.database_recipes)
      let recipes_to_return = this.nutrient_search(nutrient, new_recipes_to_search)


      return recipes_to_return
  }


}


// rest of index.js code here for Port listening




// When I submit a form to "/response", the form will
// 1) process the data here
// 2) make a UserRequest & APIResponse
// 3) retrieve response from functions
// 4) redirect to /response
app.post("/response", function(req, res){


// 1) process the data here
  console.log(req.body)


  let ingredient = req.body.ingredient
  let nutrient = req.body.nutrient
  let nutrientAmount = req.body.nutrientAmount
  let unit = req.body.unit
  let symbol = req.body.symbol


  console.log("Ingredient is ", ingredient)
  console.log("Symbol is ", symbol)
  console.log("Nutrient is ", nutrient)
  console.log("Nutrient Amount is ", nutrientAmount)
  console.log("Unit is ", unit)


  // It is unclear how the Frontend will be implemented, so writing the code implementation in the Backend is not possible at the moment.
  let user_request = new UserRequest(ingredient, nutrient, nutrientAmount, unit, symbol)


  let response = user_request.user_input_found();
  console.log("==response", response)
  var sortedScrollers = [];
    for(var i = 0; i < response.length; i++){
        sortedScrollers.push({
            title: response[i]["title"], 
            photoURL: "idk",
            description: response[i]["title"],
            carbs: response[i]["macroNutrientGrams"]["carbs"],
            fat: response[i]["macroNutrientGrams"]["fats"],
            protein: response[i]["macroNutrientGrams"]["protein"]
        })
    }

  console.log("==sortedScrolers:", sortedScrollers);
  res.send(sortedScrollers);  
  

});

app.post("/reset", function(req, res){
    var allScrollers = [];
    for(var i = 0; i < postData.length; i++){
        allScrollers.push({
            title: postData[i]["title"], 
            photoURL: "idk",
            description: postData[i]["title"],
            carbs: postData[i]["macroNutrientGrams"]["carbs"],
            fat: postData[i]["macroNutrientGrams"]["fats"],
            protein: postData[i]["macroNutrientGrams"]["protein"]
        })
    }
    res.send(allScrollers);
});

app.post("/add", function(req, res){
    console.log(req.body);

    data = req.body;
   
    filepath = './postData.json'

    formatedScrollers = postData;
    formatedScrollers.push(data);
    console.log(formatedScrollers);
    fs.writeFile(filepath, JSON.stringify(formatedScrollers), err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    });

    var allScrollers = [];
    for(var i = 0; i < postData.length; i++){
        allScrollers.push({
            title: postData[i]["title"], 
            photoURL: "idk",
            description: postData[i]["title"],
            carbs: postData[i]["macroNutrientGrams"]["carbs"],
            fat: postData[i]["macroNutrientGrams"]["fats"],
            protein: postData[i]["macroNutrientGrams"]["protein"]
        })
    }
    
    res.send(allScrollers);

})
app.listen(port, function () {
  console.log("== Server is listening on port", port);
});

