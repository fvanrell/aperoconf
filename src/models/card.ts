export class Card {
  rank: number;
  suit: number;
  color: number;
  shown: boolean;

  constructor(rank: number, suit: number, color: number, shown: boolean) {
    this.rank = rank;
    this.suit = suit;
    this.color = color;
    this.shown = shown;
  }
}
