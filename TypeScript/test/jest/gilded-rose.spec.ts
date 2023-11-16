import { Item, ItemTypes, GildedRose } from '@/gilded-rose';

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

  describe(ItemTypes.AGED_BRIE, () => {
    it('should lower sellIn by 1 and increase quality by 1', () => {
      const gildedRose = new GildedRose([new Item(ItemTypes.AGED_BRIE, 10, 8)]);
      const items = gildedRose.updateQuality();

      expect(items[0].name).toBe(ItemTypes.AGED_BRIE);
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(9);
    });
    it('should increase quality by 2 after sellin is less than 0', () => {
      const gildedRose = new GildedRose([new Item(ItemTypes.AGED_BRIE, -1, 8)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe(ItemTypes.AGED_BRIE);
      expect(items[0].sellIn).toBe(-2);
      expect(items[0].quality).toBe(10);
    });
    it('quality should be 50 or less', () => {
      const gildedRose = new GildedRose([new Item(ItemTypes.AGED_BRIE, 10, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe(ItemTypes.AGED_BRIE);
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(50);
    });
  });

  describe(ItemTypes.SULFURAS, () => {
    it('should keep selling and quality the same', () => {
      const gildedRose = new GildedRose([new Item(ItemTypes.SULFURAS, 10, 8)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe(ItemTypes.SULFURAS);
      expect(items[0].sellIn).toBe(10);
      expect(items[0].quality).toBe(8);
    });
  });

  describe(ItemTypes.BACKSTAGE_PASSES, () => {
    it('should lower quality by 1 when sellin is more than 10', () => {
      const gildedRose = new GildedRose([
        new Item(ItemTypes.BACKSTAGE_PASSES, 15, 8),
        new Item(ItemTypes.BACKSTAGE_PASSES, 11, 8)
      ]);
      const items = gildedRose.updateQuality();

      expect(items[0].name).toBe(ItemTypes.BACKSTAGE_PASSES);
      expect(items[0].sellIn).toBe(14);
      expect(items[0].quality).toBe(9);

      expect(items[1].name).toBe(ItemTypes.BACKSTAGE_PASSES);
      expect(items[1].sellIn).toBe(10);
      expect(items[1].quality).toBe(9);
    });
    it('should lower quality by 2 when sellin between 10 days and 6 days', () => {
      const gildedRose = new GildedRose([
        new Item(ItemTypes.BACKSTAGE_PASSES, 10, 8),
        new Item(ItemTypes.BACKSTAGE_PASSES, 6, 8)
      ]);
      const items = gildedRose.updateQuality();

      expect(items[0].name).toBe(ItemTypes.BACKSTAGE_PASSES);
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(10);

      expect(items[1].name).toBe(ItemTypes.BACKSTAGE_PASSES);
      expect(items[1].sellIn).toBe(5);
      expect(items[1].quality).toBe(10);
    });
    it('should lower quality by 3 when sellin between 5 days and 1 days', () => {
      const gildedRose = new GildedRose([
        new Item(ItemTypes.BACKSTAGE_PASSES, 5, 8),
        new Item(ItemTypes.BACKSTAGE_PASSES, 1, 8)
      ]);
      const items = gildedRose.updateQuality();

      expect(items[0].name).toBe(ItemTypes.BACKSTAGE_PASSES);
      expect(items[0].sellIn).toBe(4);
      expect(items[0].quality).toBe(11);

      expect(items[1].name).toBe(ItemTypes.BACKSTAGE_PASSES);
      expect(items[1].sellIn).toBe(0);
      expect(items[1].quality).toBe(11);
    });
    it('should lower quality by 3 when sellin between 5 days and 1 days', () => {
      const gildedRose = new GildedRose([
        new Item(ItemTypes.BACKSTAGE_PASSES, 0, 8),
        new Item(ItemTypes.BACKSTAGE_PASSES, -1, 8)
      ]);
      const items = gildedRose.updateQuality();

      expect(items[0].name).toBe(ItemTypes.BACKSTAGE_PASSES);
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(0);

      expect(items[1].name).toBe(ItemTypes.BACKSTAGE_PASSES);
      expect(items[1].sellIn).toBe(-2);
      expect(items[1].quality).toBe(0);
    });
  });
  describe('Conjured Mana Cake', () => {
    it('quality should degrade twice as fast as normal items', () => {
      const gildedRose = new GildedRose([
        new Item('Conjured Mana Cake', 1, 8),
        new Item('Conjured Mana Cake', 0, 8),
        new Item('Conjured Mana Cake', -1, 8)
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
        new Item('Conjured Mana Cake', -1, 0)
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe('Conjured Mana Cake');
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(0);

      expect(items[1].name).toBe('Conjured Mana Cake');
      expect(items[1].sellIn).toBe(9);
      expect(items[1].quality).toBe(0);

      expect(items[2].name).toBe('Conjured Mana Cake');
      expect(items[2].sellIn).toBe(-2);
      expect(items[2].quality).toBe(0);
    });
  });
});
