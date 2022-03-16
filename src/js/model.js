import { API_URL, API_KEY, RESULTS_PER_PAGE } from './constants';
import { getData } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
  favorites: [],
};

const formatIngredients = ingredients => {
  return ingredients.map(ingredient => {
    return {
      name: ingredient.originalName,
      unit: ingredient.measures.metric.unitShort,
      amount: ingredient.measures.metric.amount,
    };
  });
};

const createRecipeObject = recipe => {
  return {
    id: recipe.id,
    title: recipe.title,
    image: recipe.image,
    likes: recipe.aggregateLikes,
    servings: recipe.servings,
    publisher: recipe.sourceName,
    sourceUrl: recipe.sourceUrl,
    cookingTime: recipe.readyInMinutes,
    summary: recipe.summary,
    ingredients: formatIngredients(recipe.extendedIngredients),
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await getData(`${API_URL}${id}/information?apiKey=${API_KEY}`);
    state.recipe = createRecipeObject(data);
    if (state.favorites.some(fav => fav.id === +id))
      state.recipe.isFavorite = true;
    else state.recipe.isFavorite = false;
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    const data = await getData(
      `${API_URL}complexSearch?query=${query}&number=100&apiKey=${API_KEY}`
    );

    console.log(data);

    state.search.results = data.results.map(recipe => {
      return { id: recipe.id, title: recipe.title, image: recipe.image };
    });

    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ingredient => {
    ingredient.amount =
      (ingredient.amount * newServings) / state.recipe.servings;
    // Math.round(
    //   ((ingredient.amount * newServings) / state.recipe.servings) * 10
    // ) / 10;
  });

  state.recipe.servings = newServings;
};

const persistFavorites = function () {
  localStorage.setItem('favorites', JSON.stringify(state.favorites));
};

export const addFavorite = function (recipe) {
  state.favorites.push(recipe);

  if (recipe.id === state.recipe.id) state.recipe.isFavorite = true;

  persistFavorites();
};

export const removeFavorite = function (id) {
  const index = state.favorites.findIndex(el => el.id === id);
  if (index > -1) state.favorites.splice(index, 1);

  if (state.recipe.id === id) state.recipe.isFavorite = false;

  persistFavorites();
};

const getFavorites = function () {
  const storage = localStorage.getItem('favorites');

  if (storage) state.favorites = JSON.parse(storage);
};
getFavorites();
