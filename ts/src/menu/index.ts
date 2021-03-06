// UserScript
import AlpineInstance from "alpinejs";
import "./style.sass";

type ConfigType = {
  delay: number
  min: number
  max: number
  maxAverall: number
  paySystems: string[]
}

export type DataType = {
  paySystems: string[]
  state: {
    show: boolean
    edit: boolean
    curentAverall: number
  }
  initialConfig: Readonly<ConfigType>
  config: ConfigType
  tmp: {
    config: ConfigType
    curentAverall: number
  }
}

export type SessionStateType = {
  enabled: boolean
  buyedIds: string[]
  isDebug: boolean
}

export class Menu {
  html: string
  el: HTMLDivElement
  data: DataType
  sesState: SessionStateType


  constructor() {
    this.el = document.createElement('div');
    this.html = require('./menu.html').default
    this.sesState = AlpineInstance.reactive({
      enabled: true,
      buyedIds: [],
      isDebug: new URL(window.location.href).searchParams.get('_bit_debug') === '1'
    });

    if (this.sesState.isDebug) console.debug('%c Receiver Debug enabled.', 'background: #222; color: #bada55');

    const conf: ConfigType = {
      delay: 0,
      min: 0,
      max: 999999,
      maxAverall: 999999,
      paySystems: []
    };

    const data: DataType = {
      paySystems: ["Другие", "Сбербанк", "Tinkoff"],
      state: {
        // show: false,
        // edit: false,
        show: true,
        edit: true,
        curentAverall: 10,
      },
      initialConfig: { ...conf },
      config: { ...conf },
      tmp: {
        config: { ...conf },
        curentAverall: 0
      }
    }

    const savedState = window.localStorage.getItem('nillkizz_bot_receiver');
    if (savedState !== null) {
      Object.assign(data, JSON.parse(savedState));
      data.tmp.config = { ...data.config };
      data.tmp.curentAverall = data.state.curentAverall;
    }

    this.data = AlpineInstance.reactive(data);

  }

  init() {
    document.addEventListener('alpine:init', () => {
      AlpineInstance.data('menu', () => ({
        init() {
          this.$watch('data', (data: any) => {
            window.localStorage.setItem('nillkizz_bot_receiver', JSON.stringify(data));
          })
        },
        sesState: this.sesState,
        data: this.data,
        toggleEditor(state: boolean | undefined) {
          if (this.edit) {
            this.data.tmp.config = this.data.config;
          }
          if (typeof state === "boolean") this.data.state.edit = state
          else this.data.state.edit = !this.data.state.edit
        },

        saveConfig() {
          this.data.config = { ...this.data.tmp.config };
          this.data.state.curentAverall = this.data.tmp.curentAverall;

          this.toggleEditor(false)
        },

        curentConfig() {
          this.data.tmp.config = { ...this.data.config };
          this.data.tmp.curentAverall = this.data.state.curentAverall;
        },

        resetConfig() {
          this.data.tmp.config = { ...this.data.initialConfig };
          this.data.tmp.curentAverall = 0;
        }
      }))
    })
    this.render();
  }

  render() {
    this.el.innerHTML = this.html;
    document.body.appendChild(this.el);
  }
};