const sliderButtonIconOpen = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
sliderButtonIconOpen.classList.add('main-menu__slider-button_icon');
sliderButtonIconOpen.setAttribute('viewBox', '0 0 24 24');
sliderButtonIconOpen.setAttribute('width', '24');
sliderButtonIconOpen.setAttribute('height', '24');
sliderButtonIconOpen.innerHTML = `
<rect x="4" y="8" width="16" height="2"/>
<rect x="4" y="14" width="16" height="2"/>
`;

const sliderButtonIconClose = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
sliderButtonIconClose.classList.add('main-menu__slider-button_icon');
sliderButtonIconClose.classList.add('element_disabled');
sliderButtonIconClose.setAttribute('viewBox', '0 0 24 24');
sliderButtonIconClose.setAttribute('width', '24');
sliderButtonIconClose.setAttribute('height', '24');
sliderButtonIconClose.innerHTML = `
<path d="M13.4142 12L18.7071 17.2929L17.2929 18.7071L11.2929 12.7071C10.9024 12.3166 10.9024 11.6834 11.2929 11.2929L17.2929 5.29289L18.7071 6.70711L13.4142 12Z" />
<path d="M10.8787 12L5.58577 17.2929L6.99999 18.7071L13 12.7071C13.3905 12.3166 13.3905 11.6834 13 11.2929L6.99999 5.29289L5.58577 6.70711L10.8787 12Z" />
`;

export { sliderButtonIconOpen, sliderButtonIconClose };
