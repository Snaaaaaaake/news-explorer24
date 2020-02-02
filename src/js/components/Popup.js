export default class Popup {
  constructor() {
    this.domElement = this._createDomElement();
    this.title = this.domElement.querySelector('.popup__title');
    this.contentContainer = this.domElement.querySelector('.popup__content');
    this.responceContainer = this._createResponceContainer();
    this.responceRender = this.responceRender.bind(this);
    this.overlay = this._createOverlay();
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
  }

  close() {
    this.domElement.classList.add('element_disabled');
    this.overlay.classList.add('element_disabled');
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
    const domElement = document.createElement('div');
    domElement.classList.add('popup');
    domElement.classList.add('element_disabled');
    domElement.innerHTML = `
      <div class="popup__close" title="Закрыть"></div>
      <h6 class="popup__title"></h6>
      <div class="popup__content"></div>
    `;
    domElement.querySelector('.popup__close').addEventListener('click', () => {
      this.close();
    });
    document.body.appendChild(domElement);
    return domElement;
  }

  _createOverlay() {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.classList.add('element_disabled');
    document.body.appendChild(overlay);
    overlay.addEventListener('click', () => {
      this.close();
    });
    return overlay;
  }

  _createResponceContainer() {
    const responceContainer = document.createElement('div');
    responceContainer.classList.add('popup__responce');
    return responceContainer;
  }
}
