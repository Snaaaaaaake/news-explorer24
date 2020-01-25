const articleDeleteIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
articleDeleteIcon.classList.add('article__svg-icon_fill');
articleDeleteIcon.setAttribute('viewBox', '0 0 18 19');
articleDeleteIcon.setAttribute('width', '18');
articleDeleteIcon.setAttribute('height', '19');
articleDeleteIcon.innerHTML = '<path  d="M12 0H6V2H0V4H18V2H12V0ZM2 6V17C2 18.1046 2.89543 19 4 19H14C15.1046 19 16 18.1046 16 17V6H14V17H4V6H2ZM6 6L6 15H8L8 6H6ZM10 6V15H12V6H10Z"/>';
export default articleDeleteIcon;
