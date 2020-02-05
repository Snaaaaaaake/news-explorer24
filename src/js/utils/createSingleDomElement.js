function createSingleDomElement(tag, classs, content, attributes) {
  const element = document.createElement(tag);
  if (classs) {
    if (typeof classs === 'object' && classs.length) {
      classs.forEach((item) => {
        element.classList.add(item);
      });
    } else {
      element.classList.add(classs);
    }
  }
  if (content) {
    if (typeof content === 'string') {
      if (content.length > 0) {
        element.textContent = content;
      }
    } else if (content.length) {
      content.forEach((item) => {
        element.appendChild(item);
      });
    } else {
      element.appendChild(content);
    }
  }
  if (attributes) {
    if (attributes.length) {
      attributes.forEach((item) => {
        if (item.name === 'href') {
          element.setAttribute(item.name, encodeURI(item.value));
        } else {
          element.setAttribute(item.name, item.value);
        }
      });
    } else if (attributes.name === 'href') {
      element.setAttribute(attributes.name, encodeURI(attributes.value));
    } else {
      element.setAttribute(attributes.name, attributes.value);
    }
  }
  return element;
}
export default createSingleDomElement;
