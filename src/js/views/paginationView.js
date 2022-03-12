import View from './View';

import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn-inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton(curPage, 'next');
    }

    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton(curPage, 'prev');
    }

    if (curPage < numPages) {
      return `${this._generateMarkupButton(
        curPage,
        'prev'
      )} ${this._generateMarkupButton(curPage, 'next')}`;
    }

    return '';
  }

  _generateMarkupButton(page, type) {
    if (type === 'prev') {
      return `
        <button class="btn-inline pagination-btn-prev" data-goto=${page - 1}>
          <svg class="icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${page - 1}</span>
        </button>
      `;
    }
    return `
      <button class="btn-inline pagination-btn-next" data-goto=${page + 1}>
        <span>Page ${page + 1}</span>
        <svg class="icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }
}

export default new PaginationView();
