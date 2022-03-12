import View from './View';

import icons from '../../img/icons.svg';
import { Fraction } from 'fractional';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find that recipe. Please try another one!';
  _message = '';

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(event =>
      window.addEventListener(event, handler)
    );
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn-update-servings');
      if (!btn) return;

      const newServings = +btn.dataset.update;

      if (newServings > 0) handler(newServings);
    });
  }

  _generateMarkup() {
    return `
      <div class="recipe-img">
        <img src="${this._data.image}" alt="${this._data.title}" />
        <h2 class="recipe-title">${this._data.title}</h2>
      </div>
      <div class="recipe-details">
        <div class="recipe-info">
          <svg class="recipe-icon">
            <use href="${icons}#icon-like"></use>
          </svg>
          <span class="recipe-data recipe-data-likes">${this._data.likes}</span>
          <span class="recipe-text">likes</span>
        </div>
        
        <div class="recipe-info">
          <svg class="recipe-icon">
            <use href="${icons}#icon-time"></use>
          </svg>
          <span class="recipe-data recipe-data-minutes">${
            this._data.cookingTime
          }</span>
          <span class="recipe-text">minutes</span>
        </div>
        <div class="recipe-info">
          <svg class="recipe-icon">
            <use href="${icons}#icon-group"></use>
          </svg>
          <span class="recipe-data recipe-data-people">${
            this._data.servings
          }</span>
          <span class="recipe-text">servings</span>
          <div class="recipe-buttons">
            <button class="btn-small btn-update-servings" data-update=${
              this._data.servings - 1
            }>
              <svg class="icon">
                <use href="${icons}#icon-minus"></use>
              </svg>
            </button>
            <button class="btn-small btn-update-servings" data-update=${
              this._data.servings + 1
            }>
              <svg class="icon">
                <use href="${icons}#icon-plus"></use>
              </svg>
            </button>
          </div>
        </div>
        <button class="btn-round btn-favorite">
          <svg class="icon">
            <use href="${icons}#icon-heart-fill"></use>
          </svg>
        </button>
      </div>

      <div class="recipe-summary">
        <h3 class="heading">summary</h3>
        <p>
          ${this._data.summary}
        </p>
      </div>
      <div class="recipe-ingredients">
        <h3 class="heading">ingredients</h3>
        <ul class="ingredient-list">
          ${this._data.ingredients
            .map(ing => this._generateMarkupIngredients(ing))
            .join('')}
        </ul>
      </div>
    `;
  }

  _generateMarkupIngredients(ing) {
    return `
      <li class="ingredient-item">
        <div class="ingredient-quantity">${
          ing.amount ? new Fraction(ing.amount) : ''
        }</div>
        <div class="ingredient-name">
          <span class="ingredient-unit">${ing.unit}</span>
          ${ing.name}
        </div>
      </li>
    `;
  }
}

export default new RecipeView();
