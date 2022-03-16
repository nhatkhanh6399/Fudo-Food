import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import favoritesView from './views/favoritesView';
import paginationView from './views/paginationView';

import 'core-js/stable';
import 'regenerator-runtime';

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    resultsView.update(model.getSearchResultsPage());

    favoritesView.update(model.state.favorites);

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();

    if (!query) return;
    resultsView.renderSpinner();

    await model.loadSearchResults(query);

    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);

  recipeView.update(model.state.recipe);
};

const controlFavorite = function () {
  if (!model.state.recipe.isFavorite) model.addFavorite(model.state.recipe);
  else model.removeFavorite(model.state.recipe.id);

  console.log(model.state.favorites);
  recipeView.update(model.state.recipe);

  favoritesView.render(model.state.favorites);
};

const controlRenderFavorites = function () {
  favoritesView.render(model.state.favorites);
};

const init = function () {
  favoritesView.addHandlerRender(controlRenderFavorites);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerFavorite(controlFavorite);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
