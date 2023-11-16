import { type Item, ItemTypes, ItemHandlers } from './item';
export class GildedRose {
  items: Item[];

  constructor(items = [] as Item[]) {
    this.items = items;
  }

  updateQuality(): Item[] {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      switch (item.name) {
        case ItemTypes.SULFURAS:
          // this item is never updated
          break;
        case ItemTypes.AGED_BRIE:
          ItemHandlers.handleAgedBrie(item);
          break;
        case ItemTypes.BACKSTAGE_PASSES:
          ItemHandlers.handleBackstagePasses(item);
          break;
        case ItemTypes.CONJURED:
          ItemHandlers.handleConjured(item);
          break;
        default:
          ItemHandlers.handleDefault(item);
      }
    }

    return this.items;
  }
}
