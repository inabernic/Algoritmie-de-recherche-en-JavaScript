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
      //recipesMatched = va avoir la liste des recetettes filtré, qui von inclure ou un nom, ou une descript, ou un ingredient
      recipesMatched = data.filter(recipe => recipe.name.toLowerCase().includes(request) ||
        recipe.description.toLowerCase().includes(request) ||
        recipe.ingredients.some(ingr => ingr.ingredient.toLowerCase().includes(request))
      );
    }

    // verification par tag
    let recipesMatchedTags = [];
    if (igredientsSelected.length > 0 || appareilsSelected.length > 0 || ustensilesSelected.length > 0) {

      recipesMatched.forEach(recipe => {
        //ingredientsAsString- un array of the strings
        let ingredientsAsString = recipe.ingredients.map((el) => el.ingredient.toLowerCase());
        //console.log(igredientsSelected);
        let ingContained = igredientsSelected.every((el) =>
          ingredientsAsString.includes(el)
        );

        let appContained = appareilsSelected.every((el) =>
          recipe.appliance.toLowerCase() === el
        );

        //ingredientsAsString- un array of the strings
        let ustensileAsString = recipe.ustensils.map((el) => el.toLowerCase());
        //console.log(igredientsSelected);
        let ustContained = ustensilesSelected.every((el) =>
          ustensileAsString.includes(el)
        );

        if (ingContained && ustContained && appContained) {
          recipesMatchedTags.push(recipe);
        }
      });
    } else {
      recipesMatchedTags = recipesMatched;
    }
    return recipesMatchedTags;
  }

  //function for serach in the Dropdowns( search in the list of Ingr, in the list of App, in the list of Ust)
  static searchText(word, setOfItems) {
    let setFoundItems = new Set();
    setOfItems.forEach(item => {
      if (item.includes(word)) {
        setFoundItems.add(item);
      }
    });
    return setFoundItems;
  }
}