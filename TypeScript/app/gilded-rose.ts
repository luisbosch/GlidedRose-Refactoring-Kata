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

export const handleBackstagePasses = (item: Item) => {
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
        default:
          if (this.items[i].quality > 0) {
            if (this.items[i].name === 'Conjured Mana Cake' && this.items[i].quality >= 2) {
              this.items[i].quality = this.items[i].quality - 2;
            } else {
              this.items[i].quality = this.items[i].quality - 1;
            }
          }

          this.items[i].sellIn = this.items[i].sellIn - 1;

          if (this.items[i].sellIn < 0) {
            if (this.items[i].name !== ItemTypes.AGED_BRIE) {
              if (this.items[i].quality > 0) {
                if (this.items[i].name === 'Conjured Mana Cake' && this.items[i].quality >= 2) {
                  this.items[i].quality = this.items[i].quality - 2;
                } else {
                  this.items[i].quality = this.items[i].quality - 1;
                }
              }
            }
          }
      }
    }

    return this.items;
  }
}
