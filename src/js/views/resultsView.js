import View from './View';

import icons from '../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage =
    'We could not find any recipes for your query. Please try another one!';
  _message = '';

  _generateMarkup() {
    return this._data.map(this._generatePreview).join('');
  }

  _generatePreview(result) {
    const id = +window.location.hash.slice(1);

    return `
      <li class="preview">
        <a href="#${result.id}" class="preview-link ${
      result.id == id ? 'preview-link-active' : ''
    }">
          <div class="preview-img">
            <img src="${result.image}" alt="${result.title}" />
          </div>
          <div class="preview-info">
            <h4 class="preview-title">${result.title}</h4>
          </div>
        </a>
      </li>
    `;
  }
}

export default new ResultsView();
