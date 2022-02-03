import AlpineInstance from "alpinejs";
import "./style.sass";

export class Menu {
  html: string
  el: HTMLDivElement

  constructor() {
    this.el = document.createElement('div');
    this.html = require('./menu.html').default

  }

  init() {
    AlpineInstance.data('menu', () => {
      const data = {
        curent: 123,
      }
      return data;
    })
  }

  render() {
    this.el.id = "nillkizz_menu";
    this.el.innerHTML = this.html;
    document.body.appendChild(this.el);
  }
};