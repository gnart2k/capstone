import { dateToArray } from "@/app/lib/dateToArray";

describe('dateToArray', () => {
    it('should convert a timestamp to an array of numbers [HH, mm, ss, dd, MM, yyyy]', () => {
      const timestamp = new Date('2024-08-08T14:45:30').getTime(); // Convert specific date to timestamp
      const result = dateToArray(timestamp);
      expect(result).to.deep.equal([14, 45, 30, 8, 8, 2024]);
    });
  
    it('should handle midnight correctly', () => {
      const timestamp = new Date('2024-08-08T00:00:00').getTime();
      const result = dateToArray(timestamp);
      expect(result).to.deep.equal([0, 0, 0, 8, 8, 2024]);
    });
  
    it('should handle leap year date correctly', () => {
      const timestamp = new Date('2024-02-29T23:59:59').getTime();
      const result = dateToArray(timestamp);
      expect(result).to.deep.equal([23, 59, 59, 29, 2, 2024]);
    });
  
    it('should handle single-digit minutes and seconds correctly', () => {
      const timestamp = new Date('2024-08-08T05:07:09').getTime();
      const result = dateToArray(timestamp);
      expect(result).to.deep.equal([5, 7, 9, 8, 8, 2024]);
    });
  
    it('should handle the start of the century correctly', () => {
      const timestamp = new Date('2000-01-01T01:01:01').getTime();
      const result = dateToArray(timestamp);
      expect(result).to.deep.equal([1, 1, 1, 1, 1, 2000]);
    });
  });
  