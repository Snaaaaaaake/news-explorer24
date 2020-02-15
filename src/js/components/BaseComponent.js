export default class BaseComponent {
  constructor(parentElement) {
    this._domElement = this._createDomElement();
    parentElement.appendChild(this._domElement);
  }
}
