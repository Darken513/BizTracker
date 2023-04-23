export class Currency {
    img: string;
    label: string;
    value: number;
    nbr: string;
    constructor(img: string, label: string, value: number, nbr: string) {
      this.img = img;
      this.label = label;
      this.value = value;
      this.nbr = nbr;
    }
    copy(nbr: string) {
      return new Currency(this.img, this.label, this.value, nbr)
    }
}