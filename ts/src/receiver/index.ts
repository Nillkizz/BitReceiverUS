import { OrderData } from './OrderData';
import { Menu, DataType, SessionStateType } from '../menu'

declare global {
  function accept_buy_deal(id: number): void
}


export class Receiver {
  menu: Menu
  state: DataType
  sesState: SessionStateType

  constructor(menu: Menu) {
    this.menu = menu;
    this.state = menu.data;
    this.sesState = menu.sesState;
  }

  init() {
    new MutationObserver(this.handleMutations.bind(this))
      .observe(document.getElementById('confirm_trade_table'), { childList: true });
  }

  validatePayment(payName: string, price: number): boolean {
    const isValidPayType: boolean = (
      this.state.config.paySystems.length === 0 ||
      this.state.config.paySystems.includes(payName) ||
      (!this.state.paySystems.includes(payName) && this.state.config.paySystems.includes('Другие'))
    )
    if (!isValidPayType) {
      console.log("Pay type is invalid");
      return false;
    }

    const isValidPrice: boolean = (
      this.state.config.min <= price &&
      this.state.config.max >= price &&
      this.state.config.maxAverall >= (this.state.state.curentAverall + price)
    );
    if (!isValidPrice) {
      console.log("Price is invalid");
      return false;
    }

    return true;
  }

  handleMutations(mutationList: MutationRecord[]) {
    if (!this.sesState.enabled) return;

    setTimeout(() => {
      for (const mutation of mutationList) {
        if (mutation.type !== "childList" || mutation.addedNodes.length === 0) return;
        this.handleOrders(mutation.addedNodes as NodeListOf<HTMLElement>);
      }
    }, this.state.config.delay)
  }

  handleOrders(nodes: NodeListOf<HTMLElement>) {
    for (const node of Array.from(nodes)) {
      switch (node.tagName) {
        case "TBODY": {
          const data = new OrderData(node);
          const id = data.id;
          console.log("Deal id:", id);

          if (this.sesState.buyedIds.includes(id)) {
            console.log('Has been bought');
            return; //  Has been bought
          }

          if (!this.validatePayment(data.sendPayName, data.sendPrice)) return;

          this.state.state.curentAverall += data.sendPrice;

          accept_buy_deal(parseInt(id))
          console.log('buyed', data)
          this.sesState.buyedIds.push(id)
          break;
        }
        default:
          console.log(`Node tag name: ${node.tagName}`);
      }
    }

  }
}
