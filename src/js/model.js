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
};

const formatIngredients = ingredients => {
  return ingredients.map(ingredient => {
    return {
      name: ingredient.originalName,
      unit: ingredient.measures.metric.unitShort,
      amount: ingredient.amount,
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
    console.log(state.recipe);
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
