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

const handleAgedBrie = (item: Item): void => {
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

const handleBackstagePasses = (item: Item): void => {
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

const handleConjured = (item: Item): void => {
  decreaseQualityHelper(item, 2);
  item.sellIn = item.sellIn - 1;
  if (item.sellIn < 0) {
    decreaseQualityHelper(item, 2);
  }
};

const handleDefault = (item: Item): void => {
  decreaseQualityHelper(item, 1);
  item.sellIn = item.sellIn - 1;
  if (item.sellIn < 0) {
    decreaseQualityHelper(item, 1);
  }
};

export const ItemHandlers = {
  handleAgedBrie,
  handleBackstagePasses,
  handleConjured,
  handleDefault
};
