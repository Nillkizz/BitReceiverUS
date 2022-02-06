export class OrderData {
  el: HTMLElement
  dCols: HTMLElement[]

  constructor(node: HTMLElement) {
    this.el = node;
    this.dCols = Array.from(node.querySelectorAll('td'));
  }

  get status(): string {
    return this.dCols[0].textContent;
  }
  get id(): string {
    return /# (\d*)/.exec(this.dCols[1].textContent)[1];
  }
  get requisites(): string {
    return this.dCols[2].textContent.trim();
  }
  get comment(): string {
    return this.dCols[3].textContent;
  }
  get sendPrice(): number {
    return parseFloat(this.dCols[4].childNodes[0].textContent);
  }
  get sendPayName(): string {
    return this.dCols[4].querySelector('span').textContent;
  }
  get recPrice(): number {
    return parseFloat(this.dCols[5].childNodes[0].textContent);
  }
  get recPayName(): string {
    return this.dCols[5].childNodes[2].textContent;
  }
  get coursePrice(): number {
    return parseFloat(this.dCols[6].childNodes[0].textContent);
  }
  get courseCurrency(): string {
    return this.dCols[6].childNodes[2].textContent;
  }
  get date(): Date {
    return new Date(this.dCols[7].childNodes[0].textContent);
  }
  get toPayTime(): string {
    return this.dCols[7].querySelector('span').textContent;
  }

}