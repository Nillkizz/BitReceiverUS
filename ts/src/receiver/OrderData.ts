export class OrderData {
  el: HTMLElement
  dCols: HTMLElement[]
  status: string
  id: string
  requisites: string
  comment: string
  sendPrice: number
  sendPayName: string
  recPrice: number
  recPayName: string
  coursePrice: number
  courseCurrency: string
  date: Date
  toPayTime: string

  constructor(node: HTMLElement) {
    this.el = node;
    this.dCols = Array.from(node.querySelectorAll('td'));
    // this.status = this.dCols[0].textContent;
    this.id = /# (\d*)/.exec(this.dCols[1].textContent)[1];
    // this.requisites = this.dCols[2].textContent.trim();
    // this.comment = this.dCols[3].textContent;
    this.sendPrice = parseFloat(this.dCols[4].childNodes[0].textContent);
    this.sendPayName = this.dCols[4].querySelector('span').textContent;
    // this.recPrice = parseFloat(this.dCols[5].childNodes[0].textContent);
    // this.recPayName = this.dCols[5].childNodes[2].textContent;
    // this.coursePrice = parseFloat(this.dCols[6].childNodes[0].textContent);
    // this.courseCurrency = this.dCols[6].childNodes[2].textContent;
    // this.date = new Date(this.dCols[7].childNodes[0].textContent);
    // this.toPayTime = this.dCols[7].querySelector('span').textContent;
  }
}