import createSingleDomElement from '../utils/createSingleDomElement';

export default class Popup {
  constructor() {
    this.domElement = this._createDomElement();
    this.title = this.domElement.querySelector('.popup__title');
    this.contentContainer = this.domElement.querySelector('.popup__content');
    this.responceContainer = createSingleDomElement('div', 'popup__responce');
    this.responceRender = this.responceRender.bind(this);
    this.overlay = this._createOverlay();
    this._escapeEventListener = this._escapeEventListener.bind(this);
  }

  open(title, content) {
    content.clear();
    while (this.contentContainer.firstChild) {
      this.contentContainer.removeChild(this.contentContainer.firstChild);
    }
    this.title.textContent = title;
    this.contentContainer.appendChild(content.domElement);
    this.domElement.classList.remove('element_disabled');
    this.overlay.classList.remove('element_disabled');
    document.addEventListener('keydown', this._escapeEventListener);
  }

  close() {
    this.domElement.classList.add('element_disabled');
    this.overlay.classList.add('element_disabled');
    document.removeEventListener('keydown', this._escapeEventListener);
  }

  _escapeEventListener(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  responceRender(data) {
    while (this.contentContainer.firstChild) {
      this.contentContainer.removeChild(this.contentContainer.firstChild);
    }
    const { title, responseElement } = data;
    this.title.textContent = title;
    this.responceContainer.appendChild(responseElement);
    this.contentContainer.appendChild(this.responceContainer);
  }

  _createDomElement() {
    const domElement = createSingleDomElement('div', ['popup', 'element_disabled'], [
      createSingleDomElement('div', 'popup__close'),
      createSingleDomElement('h6', 'popup__title'),
      createSingleDomElement('div', 'popup__content'),
    ]);
    domElement.querySelector('.popup__close').addEventListener('click', () => {
      this.close();
    });
    document.body.appendChild(domElement);
    return domElement;
  }

  _createOverlay() {
    const overlay = createSingleDomElement('div', ['overlay', 'element_disabled']);
    document.body.appendChild(overlay);
    overlay.addEventListener('click', () => {
      this.close();
    });
    return overlay;
  }
}
