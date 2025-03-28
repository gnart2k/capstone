import { convertFloatToTime, convertTimeToFloat } from "@/app/lib/convertTime";
// cypress/integration/convertTimeToFloat.spec.js

describe('convertTimeToFloat', () => {
  it('should convert "12:30" to 12.5', () => {
    const result = convertTimeToFloat('12:30');
    expect(result).to.equal(12.5);
  });

  it('should convert "00:15" to 0.25', () => {
    const result = convertTimeToFloat('00:15');
    expect(result).to.equal(0.25);
  });

 it('should convert "23:59" to 23.983333333333334', () => {
    const result = convertTimeToFloat('23:59');
    expect(result).to.equal(23.983333333333334);
  });

  it('should throw an error for invalid format "24:00"', () => {
    expect(() => convertTimeToFloat('24:00')).to.throw('Invalid time format');
  });
  
  it('should throw an error for invalid format "12:60"', () => {
    expect(() => convertTimeToFloat('12:60')).to.throw('Invalid time format');
  });

  it('should throw an error for invalid format "12:xx"', () => {
    expect(() => convertTimeToFloat('12:xx')).to.throw('Invalid time format');
  });

  it('should throw an error for negative time "-1:00"', () => {
    expect(() => convertTimeToFloat('-1:00')).to.throw('Invalid time format');
  });
  it('should throw an error for invalid format "12:60"', () => {
    expect(() => convertTimeToFloat('12:60')).to.throw('Invalid time format');
  });

  it('should throw an error for invalid format "12:xx"', () => {
    expect(() => convertTimeToFloat('12:xx')).to.throw('Invalid time format');
  });

  it('should throw an error for negative time "-1:00"', () => {
    expect(() => convertTimeToFloat('-1:00')).to.throw('Invalid time format');
  });
  it('should convert "00:00" to 0.0', () => {
    const result = convertTimeToFloat('00:00');
    expect(result).to.equal(0.0);
  });

  it('should convert "23:00" to 23.0', () => {
    const result = convertTimeToFloat('23:00');
    expect(result).to.equal(23.0);
  });

  it('should throw an error for missing minutes "12:"', () => {
    expect(() => convertTimeToFloat('12:')).to.throw('Invalid time format');
  });

  it('should throw an error for missing hours ":30"', () => {
    expect(() => convertTimeToFloat(':30')).to.throw('Invalid time format');
  });

  it('should throw an error for empty string input', () => {
    expect(() => convertTimeToFloat('')).to.throw('Invalid time format');
  });
  // it('should throw an error for non-string input', () => {
  //   expect(() => convertTimeToFloat(null)).to.throw('Invalid time format');
  //   expect(() => convertTimeToFloat(123)).to.throw('Invalid time format');
  //   expect(() => convertTimeToFloat({})).to.throw('Invalid time format');
  // });

  it('should handle single-digit hour "5:45" correctly', () => {
    const result = convertTimeToFloat('5:45');
    expect(result).to.equal(5.75);
  });

  it('should handle leading zero hour "05:45" correctly', () => {
    const result = convertTimeToFloat('05:45');
    expect(result).to.equal(5.75);
  });

  it('should handle leading zero minute "12:05" correctly', () => {
    const result = convertTimeToFloat('12:05');
    expect(result).to.equal(12.083333333333334);
  });

  it('should handle single-digit minute "12:5" correctly', () => {
    const result = convertTimeToFloat('12:5');
    expect(result).to.equal(12.083333333333334);
  });


});
