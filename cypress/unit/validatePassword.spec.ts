import { validatePassword } from '../../app/lib/validate';

describe('Password Validation Tests', () => {
    it('accepts a valid password with mixed characters', () => {
      const validPassword = "Password1!";
      expect(validatePassword(validPassword)).to.be.true;
    });
  
    it('rejects password too short', () => {
      const shortPassword = "Pas1!";
      expect(validatePassword(shortPassword)).to.be.false;
    });
  
    it('rejects password without uppercase letters', () => {
      const noUpperPassword = "password1!";
      expect(validatePassword(noUpperPassword)).to.be.false;
    });
  
    it('rejects password without lowercase letters', () => {
      const noLowerPassword = "PASSWORD1!";
      expect(validatePassword(noLowerPassword)).to.be.false;
    });
  
    it('rejects password without numbers', () => {
      const noNumberPassword = "Password!";
      expect(validatePassword(noNumberPassword)).to.be.false;
    });
  
    it('rejects password without special characters', () => {
      const noSpecialCharPassword = "Password1";
      expect(validatePassword(noSpecialCharPassword)).to.be.false;
    });
  
    it('accepts a valid password with mixed characters', () => {
      const validPassword = "Password1!";
      expect(validatePassword(validPassword)).to.be.true;
  });

  it('rejects password too short', () => {
      const shortPassword = "Pas1!";
      expect(validatePassword(shortPassword)).to.be.false;
  });

  it('rejects password without uppercase letters', () => {
      const noUpperPassword = "password1!";
      expect(validatePassword(noUpperPassword)).to.be.false;
  });
    it('rejects password when only numbers', () => {
      const numbersOnly = "12345678";
      expect(validatePassword(numbersOnly)).to.be.false;
    });
  
    it('rejects password when only special characters', () => {
      const specialOnly = "!@#$%^&*";
      expect(validatePassword(specialOnly)).to.be.false;
    });
  
    it('rejects empty password', () => {
      const emptyPassword = "";
      expect(validatePassword(emptyPassword)).to.be.false;
    });
  });
  
