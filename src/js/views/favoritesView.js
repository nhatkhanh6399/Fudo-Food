import View from './View';
import previewView from './previewView';

class FavoritesView extends View {
  _parentElement = document.querySelector('.favorites');
  _errorMessage = 'No favorites yet. Find a recipe and add it to favorites ;)';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data.map(fav => previewView.render(fav, false)).join('');
  }

  // _generateMarkup() {
  //   return this._data.map(this._generatePreview).join('');
  // }

  // _generatePreview(result) {
  //   const id = +window.location.hash.slice(1);

  //   return `
  //     <li class="preview">
  //       <a href="#${result.id}" class="preview-link ${
  //     result.id == id ? 'preview-link-active' : ''
  //   }">
  //         <div class="preview-img">
  //           <img src="${result.image}" alt="${result.title}" />
  //         </div>
  //         <div class="preview-info">
  //           <h4 class="preview-title">${result.title}</h4>
  //         </div>
  //       </a>
  //     </li>
  //   `;
  // }
}

export default new FavoritesView();
