import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
    describe('Regular item', () => {
      it('should lower sellIn by 1 and quality by 1', () => {
        const gildedRose = new GildedRose([new Item('regular', 10, 8)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toBe('regular');
        expect(items[0].sellIn).toBe(9);
        expect(items[0].quality).toBe(7);
      });
      it('should lower quality by 2 if sell date has passed', () => {
        const gildedRose = new GildedRose([new Item('regular', 0, 8)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toBe('regular');
        expect(items[0].sellIn).toBe(-1);
        expect(items[0].quality).toBe(6);
      });
      it('quality shouldnt be negative', () => {
        const gildedRose = new GildedRose([new Item('regular', 10, 0), new Item('regular', 0, 0)]);
        const items = gildedRose.updateQuality();

        expect(items[0].name).toBe('regular');
        expect(items[0].sellIn).toBe(9);
        expect(items[0].quality).toBe(0);

        expect(items[1].name).toBe('regular');
        expect(items[1].sellIn).toBe(-1);
        expect(items[1].quality).toBe(0);
      });
    });

    describe('Aged Brie', () => {
      it('should lower sellIn by 1 and increase quality by 1', () => {
        const gildedRose = new GildedRose([new Item('Aged Brie', 10, 8)]);
        const items = gildedRose.updateQuality();

        expect(items[0].name).toBe('Aged Brie');
        expect(items[0].sellIn).toBe(9);
        expect(items[0].quality).toBe(9);

      });
      it('should increase quality by 2 after sellin is less than 0', () => {
        const gildedRose = new GildedRose([new Item('Aged Brie', -1, 8)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toBe('Aged Brie');
        expect(items[0].sellIn).toBe(-2);
        expect(items[0].quality).toBe(10);

      });
      it('quality should be 50 or less', () => {
        const gildedRose = new GildedRose([new Item('Aged Brie', 10, 50)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toBe('Aged Brie');
        expect(items[0].sellIn).toBe(9);
        expect(items[0].quality).toBe(50);
      });
    });

    describe('Sulfuras, Hand of Ragnaros', () => {
      it('should keep selling and quality the same', () => {
        const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 10, 8)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toBe('Sulfuras, Hand of Ragnaros');
        expect(items[0].sellIn).toBe(10);
        expect(items[0].quality).toBe(8);
      });
    });

    describe('Backstage passes to a TAFKAL80ETC concert', () => {
      it('should lower quality by 1 when sellin is more than 10', () => {
        const gildedRose = new GildedRose([
          new Item('Backstage passes to a TAFKAL80ETC concert', 15, 8),
          new Item('Backstage passes to a TAFKAL80ETC concert', 11, 8),
        ]);
        const items = gildedRose.updateQuality();

        expect(items[0].name).toBe('Backstage passes to a TAFKAL80ETC concert');
        expect(items[0].sellIn).toBe(14);
        expect(items[0].quality).toBe(9);

        expect(items[1].name).toBe('Backstage passes to a TAFKAL80ETC concert');
        expect(items[1].sellIn).toBe(10);
        expect(items[1].quality).toBe(9);
      });
      it('should lower quality by 2 when sellin between 10 days and 6 days', () => {
        const gildedRose = new GildedRose([
          new Item('Backstage passes to a TAFKAL80ETC concert', 10, 8),
          new Item('Backstage passes to a TAFKAL80ETC concert', 6, 8),
        ]);
        const items = gildedRose.updateQuality();

        expect(items[0].name).toBe('Backstage passes to a TAFKAL80ETC concert');
        expect(items[0].sellIn).toBe(9);
        expect(items[0].quality).toBe(10);

        expect(items[1].name).toBe('Backstage passes to a TAFKAL80ETC concert');
        expect(items[1].sellIn).toBe(5);
        expect(items[1].quality).toBe(10);
      });
      it('should lower quality by 3 when sellin between 5 days and 1 days', () => {
        const gildedRose = new GildedRose([
          new Item('Backstage passes to a TAFKAL80ETC concert', 5, 8),
          new Item('Backstage passes to a TAFKAL80ETC concert', 1, 8),
        ]);
        const items = gildedRose.updateQuality();

        expect(items[0].name).toBe('Backstage passes to a TAFKAL80ETC concert');
        expect(items[0].sellIn).toBe(4);
        expect(items[0].quality).toBe(11);

        expect(items[1].name).toBe('Backstage passes to a TAFKAL80ETC concert');
        expect(items[1].sellIn).toBe(0);
        expect(items[1].quality).toBe(11);
      });
      it('should lower quality by 3 when sellin between 5 days and 1 days', () => {
        const gildedRose = new GildedRose([
          new Item('Backstage passes to a TAFKAL80ETC concert', 0, 8),
          new Item('Backstage passes to a TAFKAL80ETC concert', -1, 8),
        ]);
        const items = gildedRose.updateQuality();

        expect(items[0].name).toBe('Backstage passes to a TAFKAL80ETC concert');
        expect(items[0].sellIn).toBe(-1);
        expect(items[0].quality).toBe(0);

        expect(items[1].name).toBe('Backstage passes to a TAFKAL80ETC concert');
        expect(items[1].sellIn).toBe(-2);
        expect(items[1].quality).toBe(0);
      });
    });
    describe('Conjured Mana Cake', () => {
      it('quality should degrade twice as fast as normal items', () => {
        const gildedRose = new GildedRose([
          new Item('Conjured Mana Cake', 1, 8),
          new Item('Conjured Mana Cake', 0, 8),
          new Item('Conjured Mana Cake', -1, 8),
        ]);
        const items = gildedRose.updateQuality();

        expect(items[0].name).toBe('Conjured Mana Cake');
        expect(items[0].sellIn).toBe(0);
        expect(items[0].quality).toBe(6);

        expect(items[1].name).toBe('Conjured Mana Cake');
        expect(items[1].sellIn).toBe(-1);
        expect(items[1].quality).toBe(4);

        expect(items[2].name).toBe('Conjured Mana Cake');
        expect(items[2].sellIn).toBe(-2);
        expect(items[2].quality).toBe(4);

      });
      it('quality should not be less than 0', () => {
        const gildedRose = new GildedRose([
          new Item('Conjured Mana Cake', 10, 1),
          new Item('Conjured Mana Cake', 10, 0),
          new Item('Conjured Mana Cake', -1, 0),
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toBe('Conjured Mana Cake');
        expect(items[0].sellIn).toBe(9);
        expect(items[0].quality).toBe(0);

        expect(items[1].name).toBe('Conjured Mana Cake');
        expect(items[1].sellIn).toBe(9);
        expect(items[1].quality).toBe(0);

        expect(items[2].name).toBe('Conjured Mana Cake');
        expect(items[2].sellIn).toBe(9);
        expect(items[2].quality).toBe(0);
      });
    });
});
