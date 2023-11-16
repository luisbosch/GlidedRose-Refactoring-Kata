export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export enum ItemTypes {
  SULFURAS = 'Sulfuras, Hand of Ragnaros',
  AGED_BRIE = 'Aged Brie',
  BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert',
  CONJURED = 'Conjured Mana Cake',
}

export const handleAgedBrie = (item: Item): void => {
  item.sellIn = item.sellIn - 1;
  if (item.quality < 50) {
    item.quality = item.quality + 1;
  }
  if (item.quality < 50) {
    if (item.sellIn < 0) {
      item.quality = item.quality + 1;
    }
  }
};

export const handleBackstagePasses = (item: Item): void => {
  if (item.quality < 50) {
    item.quality = item.quality + 1;
    if (item.sellIn < 11) {
      if (item.quality < 50) {
        item.quality = item.quality + 1;
      }
    }
    if (item.sellIn < 6) {
      if (item.quality < 50) {
        item.quality = item.quality + 1;
      }
    }
  }

  item.sellIn = item.sellIn - 1;

  if (item.sellIn < 0) {
    item.quality = item.quality - item.quality;
  }
};

const decreaseQualityHelper = (item: Item, rate: number): void => {
  if (item.quality > 0) {
    if (item.quality >= rate) {
      item.quality = item.quality - rate;
    } else {
      item.quality = 0;
    }
  }
};

export const handleConjured = (item: Item): void => {
  decreaseQualityHelper(item, 2);
  item.sellIn = item.sellIn - 1;
  if (item.sellIn < 0) {
    decreaseQualityHelper(item, 2);
  }
};

export const handleDefault = (item: Item): void => {
  decreaseQualityHelper(item, 1);
  item.sellIn = item.sellIn - 1;
  if (item.sellIn < 0) {
    decreaseQualityHelper(item, 1);
  }
};

export class GildedRose {
  items: Item[];

  constructor(items = [] as Item[]) {
    this.items = items;
  }

  updateQuality(): Item[] {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      switch (this.items[i].name) {
        case ItemTypes.SULFURAS:
          // this item is never updated
          break;
        case ItemTypes.AGED_BRIE:
          handleAgedBrie(item);
          break;
        case ItemTypes.BACKSTAGE_PASSES:
          handleBackstagePasses(item);
          break;
        case ItemTypes.CONJURED:
          handleConjured(item);
          break;
        default:
          handleDefault(item);
      }
    }

    return this.items;
  }
}
