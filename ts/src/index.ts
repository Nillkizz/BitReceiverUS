import { Menu } from "./menu"
import Alpine, { Alpine as AlpineType } from 'alpinejs'

declare global {
  var Alpine: AlpineType
}



(async () => {
  window.Alpine = Alpine;
  Alpine.start();

  const menu = new Menu();
  menu.render()
  menu.init()

})()