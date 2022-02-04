import { Menu } from "./menu"
import Alpine, { Alpine as AlpineType } from 'alpinejs'

declare global {
  var Alpine: AlpineType
  interface Window {
    menu: Menu
  }
}



(() => {
  const menu = new Menu();
  menu.init()

  window.menu = menu;


  Alpine.start();
})()