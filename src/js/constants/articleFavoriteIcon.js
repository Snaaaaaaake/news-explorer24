const articleFavoriteIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
articleFavoriteIcon.classList.add('article__svg-icon');
articleFavoriteIcon.setAttribute('viewBox', '0 0 24 24');
articleFavoriteIcon.setAttribute('width', '24');
articleFavoriteIcon.setAttribute('height', '24');
articleFavoriteIcon.innerHTML = '<path d="M11.3822 15.7137L6 19.9425V4L18 4V19.9425L12.6178 15.7137L12 15.2283L11.3822 15.7137Z"/>';
export default articleFavoriteIcon;
