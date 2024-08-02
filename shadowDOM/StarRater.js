import './style.css';

class StarRater extends HTMLElement {
  constructor() {
    super()

    this.build();
  }

  build() {
    this.styleCss();

    this.appDiv();
  }

  styleCss() {
    const linkCss = document.createElement('link');
    linkCss.setAttribute('rel', 'stylesheet');
    linkCss.setAttribute('href', './teste.css');

    document.querySelector('head').appendChild(linkCss);
  }

  appDiv() {
    const app = document.getElementById('app');
    const appDiv = document.createElement('div');
    appDiv.classList.add('div-class');
    app.appendChild(appDiv);


    const titulo = document.createElement('h1');
    titulo.textContent = 'Olá Mundo!';

    const div = document.querySelector('.div-class');
    div.appendChild(titulo);

    return app;
  }
}

customElements.define('star-rater', StarRater)