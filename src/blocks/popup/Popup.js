import elementsConstructor from '../../js/utils/elementsConstructor';

export default class Popup {
  constructor() {
    this._domElement = this._createDomElement();
    this._title = this._domElement.querySelector('.popup__title');
    this._contentContainer = this._domElement.querySelector('.popup__content');
    this._responceContainer = elementsConstructor('div', 'popup__responce');
    this._overlay = this._createOverlay();
    this._escapeEventListener = this._escapeEventListener.bind(this);
    this.responceRender = this.responceRender.bind(this);
  }

  open(title, content) {
    content.clear();
    while (this._contentContainer.firstChild) {
      this._contentContainer.removeChild(this._contentContainer.firstChild);
    }
    this._title.textContent = title;
    this._contentContainer.appendChild(content.domElement);
    this._domElement.classList.remove('element_disabled');
    this._overlay.classList.remove('element_disabled');
    document.addEventListener('keydown', this._escapeEventListener);
  }

  close() {
    this._domElement.classList.add('element_disabled');
    this._overlay.classList.add('element_disabled');
    document.removeEventListener('keydown', this._escapeEventListener);
  }

  _escapeEventListener(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  responceRender(data) {
    while (this._contentContainer.firstChild) {
      this._contentContainer.removeChild(this._contentContainer.firstChild);
    }
    const { title, responseElement } = data;
    this._title.textContent = title;
    this._responceContainer.appendChild(responseElement);
    this._contentContainer.appendChild(this._responceContainer);
  }

  _createDomElement() {
    const domElement = elementsConstructor('div', ['popup', 'element_disabled'], [
      elementsConstructor('div', 'popup__close'),
      elementsConstructor('h6', 'popup__title'),
      elementsConstructor('div', 'popup__content'),
    ]);
    domElement.querySelector('.popup__close').addEventListener('click', () => {
      this.close();
    });
    document.body.appendChild(domElement);
    return domElement;
  }

  _createOverlay() {
    const overlay = elementsConstructor('div', ['overlay', 'element_disabled']);
    document.body.appendChild(overlay);
    overlay.addEventListener('click', () => {
      this.close();
    });
    return overlay;
  }
}
