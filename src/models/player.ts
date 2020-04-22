import { Card } from "./card";

export class Player {
  id: number;
  name: string;
  cards: Card[];
  currentAnswer: any;

  constructor(id, name, cards, currentAnswer) {
    this.id = id;
    this.name = name;
    this.cards = cards;
    this.currentAnswer = currentAnswer;
  }
}
