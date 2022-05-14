/**
 * SEARCH ALGORITHM 1
 * Here is all the logic to process a user request and return a list of corresponding recipes
 * This first algorithm has not pre-treatment of the data, the array data go throught too much
 * "for of" loops who'll only keep the corresponding recipes.
 */

export class Filter {
  //Search method in the first input of filter, menu of filter( name, descritption, ingredient)
  //data- array of recipes
  static search(request, igredientsSelected, appareilsSelected, ustensilesSelected, data) {
    let recipesMatched = [];
    if (request.length < 3) {
      recipesMatched = data;
    } else {
      for (let recipe of data) {
        if (recipe.name.toLowerCase().includes(request)) {
          recipesMatched.push(recipe);
          continue;
          // Check if a recipe match with the requested description
        } else if (recipe.description.toLowerCase().includes(request)) {
          recipesMatched.push(recipe);
          continue;
        }

        for (let ingr of recipe.ingredients) {
          //console.log(ingr);
          if (ingr.ingredient.toLowerCase().includes(request)) {
            recipesMatched.push(recipe);
            //console.log(recipesMatched);
            break;
          }
        }
      }

      let recipesMatchedIngredients = [];
      for (let recipe of recipesMatched) {
        let ingContained = false;
        let ingredientsAsString = recipe.ingredients.map((el) => el.ingredient);
        //console.log(igredientsSelected);
        ingContained = igredientsSelected.every((el) =>
          ingredientsAsString.includes(el)
        );

        let ustContained = false;
        for (let ustensilSel of ustensilesSelected) {
          for (let ust of recipe.ustensils) {
            if (ust === ustensilSel) {
              ustContained = true;
              break;
            } else {
              ustContained = false;
            }
          }
          if (!ustContained) {
            break;
          }
        }

        let applContained = false;
        for (let apareillSel of appareilsSelected) {
          if (recipe.appliance === apareillSel) {
            applContained = true;
          } else {
            applContained = false;
            break;
          }
        }

        if (ingContained && ustContained && applContained) {
          recipesMatchedIngredients.push(recipe);
        }
      }

      return recipesMatchedIngredients;
    }
  }
}