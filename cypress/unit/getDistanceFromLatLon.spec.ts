
import { getDistanceFromLatLon } from '../../app/lib/getDistance';
describe('Geographical Distance Calculations', () => {
 
    it('calculates the correct distance between two points in the same location', () => {
      const distance = getDistanceFromLatLon(48.8566, 2.3522, 48.8566, 2.3522);
      expect(distance).to.eq(0);
    });


  
    it('calculates the correct distance between Paris and New York', () => {
      const distance = getDistanceFromLatLon(48.8566, 2.3522, 40.7128, -74.0060);
      const expectedDistance = 5837360; // In meters
      expect(distance).to.be.closeTo(expectedDistance, 10000);
    });



  
  
    it('calculates the correct distance between Oslo and Cape Town', () => {
      const distance = getDistanceFromLatLon(59.9139, 10.7522, -33.9249, 18.4241);
      const expectedDistance = 9999000; // In meters
      expect(distance).to.be.closeTo(expectedDistance, 10000);
    });

  
    it('calculates the correct distance for a short distance travel within the same city', () => {
      const distance = getDistanceFromLatLon(40.730610, -73.935242, 40.741895, -73.989308); // NYC
      
      const expectedDistance = 4867; // In meters
      expect(distance).to.be.closeTo(expectedDistance, 100);
    });


  
    it('calculates the correct distance between London and Tokyo', () => {
      const distance = getDistanceFromLatLon(51.5074, -0.1278, 35.6762, 139.6503);
      const expectedDistance = 9568600; // In meters
      expect(distance).to.be.closeTo(expectedDistance, 10000);
    });
  

    it('calculates the correct distance across the equator (Nairobi to São Paulo)', () => {
      const distance = getDistanceFromLatLon(-1.2921, 36.8219, -23.5505, -46.6333);
      const expectedDistance = 7614400; // In meters
      expect(distance).to.be.closeTo(expectedDistance, 10000);
    });
  
    it('calculates the correct distance between the North Pole and the South Pole', () => {
      const distance = getDistanceFromLatLon(90, 0, -90, 0);
      const expectedDistance = 20015000; // In meters
      expect(distance).to.be.closeTo(expectedDistance, 10000);
    });
  


    it('calculates the correct distance between Sydney and Johannesburg', () => {
      const distance = getDistanceFromLatLon(-33.8688, 151.2093, -26.2041, 28.0473);
      const expectedDistance = 11036000; // In meters
      expect(distance).to.be.closeTo(expectedDistance, 10000);
    });
  
    it('calculates the correct distance for travel across the International Date Line (Fiji to Hawaii)', () => {
      const distance = getDistanceFromLatLon(-17.7134, 178.0650, 21.3069, -157.8583);
      const expectedDistance = 5096000; // In meters
      expect(distance).to.be.closeTo(expectedDistance, 10000);
    });
  
    it('calculates the correct distance for travel within a small country (Luxembourg)', () => {
      const distance = getDistanceFromLatLon(49.6116, 6.1319, 49.8153, 6.1296); 
      const expectedDistance = 22700; // In meters
      expect(distance).to.be.closeTo(expectedDistance, 500);
    });
  });
  
