import { convertFloatToTime } from "@/app/lib/convertTime";
describe('convertFloatToTime', () => {
    it('should convert 12.5 to "12:30"', () => {
      const result = convertFloatToTime(12.5);
      expect(result).to.equal('12:30');
    });
  
    it('should convert 5.0 to "05:00"', () => {
      const result = convertFloatToTime(5.0);
      expect(result).to.equal('05:00');
    });
  
    it('should convert 0.0 to "00:00"', () => {
      const result = convertFloatToTime(0.0);
      expect(result).to.equal('00:00');
    });

    it('should convert 12.5 to "12:30"', () => {
      const result = convertFloatToTime(12.5);
      expect(result).to.equal('12:30');
  });

  it('should convert 5.0 to "05:00"', () => {
      const result = convertFloatToTime(5.0);
      expect(result).to.equal('05:00');
  });

  it('should convert 0.0 to "00:00"', () => {
      const result = convertFloatToTime(0.0);
      expect(result).to.equal('00:00');
  });

  // Bổ sung các test case
  it('should convert 23.75 to "23:45"', () => {
      const result = convertFloatToTime(23.75);
      expect(result).to.equal('23:45');
  });

  it('should convert 6.25 to "06:15"', () => {
      const result = convertFloatToTime(6.25);
      expect(result).to.equal('06:15');
  });

  it('should convert 15.1 to "15:06"', () => {
      const result = convertFloatToTime(15.1);
      expect(result).to.equal('15:06');
  });

  it('should convert 24.0 to "00:00"', () => {
      const result = convertFloatToTime(24.0);
      expect(result).to.equal('00:00');
  });

  it('should handle times slightly above 24.0 by wrapping around to "00:00"', () => {
      const result = convertFloatToTime(24.1);
      expect(result).to.equal('00:06');
  });

  it('should convert negative times like -0.5 to "23:30"', () => {
      const result = convertFloatToTime(-0.5);
      expect(result).to.equal('23:30');
  });

  it('should convert negative times like -1.25 to "22:45"', () => {
      const result = convertFloatToTime(-1.25);
      expect(result).to.equal('22:45');
  });

  it('should convert 13.3333 to "13:20" (rounds to the nearest minute)', () => {
      const result = convertFloatToTime(13.3333);
      expect(result).to.equal('13:20');
  });

  it('should convert 7.6667 to "07:40" (rounds to the nearest minute)', () => {
      const result = convertFloatToTime(7.6667);
      expect(result).to.equal('07:40');
  });

  it('should convert large values like 48.5 to "00:30" (wrapping around twice)', () => {
      const result = convertFloatToTime(48.5);
      expect(result).to.equal('00:30');
  });

    
})