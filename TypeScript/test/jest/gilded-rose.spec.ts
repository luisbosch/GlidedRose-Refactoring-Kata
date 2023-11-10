import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  describe('At the end of each day our system lowers both values for every item', () => {
    describe('Regular item', () => {
      it('should lower sellIn by 1 and quality by 1', () => {
        const gildedRose = new GildedRose([new Item('regular', 10, 8)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toBe('regular');
        expect(items[0].sellIn).toBe(9);
        expect(items[0].quality).toBe(7);
      });
      it('should quality by 2 if sell date has passed', () => {
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

        // edge case
        expect(items[1].name).toBe('regular');
        expect(items[1].sellIn).toBe(-1);
        expect(items[1].quality).toBe(0);
      });
    });
  });

});
