import View from './View';

import icons from '../../img/icons.svg';

class PreviewView extends View {
  _parentElement = '';

  _generateMarkup() {
    const id = +window.location.hash.slice(1);

    return `
      <li class="preview">
        <a href="#${this._data.id}" class="preview-link ${
      this._data.id == id ? 'preview-link-active' : ''
    }">
          <div class="preview-img">
            <img src="${this._data.image}" alt="${this._data.title}" />
          </div>
          <div class="preview-info">
            <h4 class="preview-title">${this._data.title}</h4>
          </div>
        </a>
      </li>
    `;
  }
}

export default new PreviewView();
