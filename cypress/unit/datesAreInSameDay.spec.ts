import { datesAreInSameDay } from "@/app/lib/dateInSameDay";
describe('datesAreInSameDay', () => {
    it('should return true for the same date', () => {
      const date1 = new Date('2024-08-08T10:00:00');
      const date2 = new Date('2024-08-08T22:00:00');
      expect(datesAreInSameDay(date1, date2)).to.be.true;
    });
  
    it('should return false for different dates', () => {
      const date1 = new Date('2024-08-07T23:59:59');
      const date2 = new Date('2024-08-08T00:00:00');
      expect(datesAreInSameDay(date1, date2)).to.be.false;
    });
  
    it('should return true for the same date ignoring time', () => {
      const date1 = new Date('2024-08-08T00:00:00');
      const date2 = new Date('2024-08-08T23:59:59');
      expect(datesAreInSameDay(date1, date2)).to.be.true;
    });
  
    it('should return true for dates that are exactly 24 hours apart but still on the same day', () => {
      const date1 = new Date('2024-08-08T00:00:00');
      const date2 = new Date('2024-08-08T23:59:59');
      expect(datesAreInSameDay(date1, date2)).to.be.true;
    });
  
    it('should return false for dates that are on consecutive days', () => {
      const date1 = new Date('2024-08-08T23:59:59');
      const date2 = new Date('2024-08-09T00:00:00');
      expect(datesAreInSameDay(date1, date2)).to.be.false;
    });
  });