import { removeVietnameseTones } from '../../app/lib/removeVietNameseTone';

describe('removeVietnameseTones', () => {

    describe('removeVietnameseTones', () => {
        it('removes Vietnamese tones from a string', () => {
          const input = 'Tiếng Việt rất đẹp và thú vị';
          const expected = 'Tieng Viet rat dep va thu vi';
          expect(removeVietnameseTones(input)).to.equal(expected);
        });
      
      });
      
    it('removes Vietnamese tones', () => {
      const input = 'Tiếng Việt rất đẹp và thú vị';
      const expected = 'Tieng Viet rat dep va thu vi';
      expect(removeVietnameseTones(input)).to.equal(expected);
    });
  
    it('handles uppercase Vietnamese characters', () => {
      const input = 'ĐẶC BIỆT LÀ CÁC DẤU HUYỀN, SẮC, HỎI, NGÃ, NẶNG';
      const expected = 'DAC BIET LA CAC DAU HUYEN, SAC, HOI, NGA, NANG';
      expect(removeVietnameseTones(input)).to.equal(expected);
    });
  
    it('removes special characters and punctuation', () => {
      const input = 'Hello! @#% How are you?';
      const expected = 'Hello How are you';
      expect(removeVietnameseTones(input)).to.equal(expected);
    });
  
    it('reduces multiple spaces to a single space', () => {
      const input = 'This   is   a  test';
      const expected = 'This is a test';
      expect(removeVietnameseTones(input)).to.equal(expected);
    });
  
    it('trims leading and trailing spaces', () => {
      const input = '   hello world   ';
      const expected = 'hello world';
      expect(removeVietnameseTones(input)).to.equal(expected);
    });
  
    it('handles empty strings', () => {
      const input = '';
      const expected = '';
      expect(removeVietnameseTones(input)).to.equal(expected);
    });
  
    it('removes combining diacritical marks', () => {
      const input = 'hòa bình';
      const expected = 'hoa binh';
      expect(removeVietnameseTones(input)).to.equal(expected);
    });
  });
  