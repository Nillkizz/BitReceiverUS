import { Menu } from "./menu"
import { Receiver } from "./receiver"
import Alpine, { Alpine as AlpineType } from 'alpinejs'

declare global {
  var Alpine: AlpineType
}



(() => {
  const menu = new Menu();
  const receiver = new Receiver(menu)

  menu.init()
  menu.el.querySelector('.active_toggler').addEventListener('click', function () {
    this.outerHTML = `
    <button 
      class="active_toggler" 
      :class="{lgreen_bg: !sesState.enabled, red_bg: sesState.enabled}" 
      x-text="sesState.enabled ? 'Стоп' : 'Старт'" 
      @click = "sesState.enabled = !sesState.enabled" 
    />`;
    receiver.init();
  }, { once: true })

  Alpine.start();
})()