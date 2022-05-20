/**
 * SEARCH ALGORITHM 1
 * Here is all the logic to process a user request and return a list of corresponding recipes
 */

export class Filter {
  //data- array of recipes
  static search(request, igredientsSelected, appareilsSelected, ustensilesSelected, data) {
    let recipesMatched = [];
    if (request.length < 3) {
      recipesMatched = data;
    } else {

      const matchSearcWord = recipe => recipe.name.toLowerCase().includes(request) ||
        recipe.description.toLowerCase().includes(request) ||
        recipe.ingredients.some(ingr => ingr.ingredient.toLowerCase().includes(request));
      recipesMatched = data.filter(matchSearcWord);
    }

    // verification of the tag
    let recipesMatchedTags = [];
    if (igredientsSelected.length > 0 || appareilsSelected.length > 0 || ustensilesSelected.length > 0) {

      recipesMatched.forEach(recipe => {
        //ingredientsAsString- un array of the strings
        let ingredientsAsString = recipe.ingredients.map((el) => el.ingredient.toLowerCase());
        let ingContained = igredientsSelected.every((el) =>
          ingredientsAsString.includes(el)
        );

        let appContained = appareilsSelected.every((el) =>
          recipe.appliance.toLowerCase() === el
        );

        let ustensileAsString = recipe.ustensils.map((el) => el.toLowerCase());
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