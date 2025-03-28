import { generateRandomUsername } from "@/app/lib/generator";

describe('generateRandomUsername', () => {
    it('should generate a username starting with "user@"', () => {
      const username = generateRandomUsername();
      expect(username.startsWith('user@')).to.be.true;
    });

    it('should generate a username of length 13', () => {
        const username = generateRandomUsername();
        expect(username.length).to.equal(13);
      });
    
      it('should generate a username with alphanumeric characters', () => {
        const username = generateRandomUsername();
        const alphanumericRegex = /^[a-zA-Z0-9@]+$/;
        expect(alphanumericRegex.test(username)).to.be.true;
      });
    
      it('should generate different usernames on multiple calls', () => {
        const username1 = generateRandomUsername();
        const username2 = generateRandomUsername();
        expect(username1).to.not.equal(username2);
      });
}) 
