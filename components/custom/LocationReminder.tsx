import { AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';

const LocationReminder = () => {
  const [locationPermission, setLocationPermission] = useState<PermissionState | null>(null);

  useEffect(() => {
    if ('permissions' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        setLocationPermission(result.state);
        result.onchange = () => setLocationPermission(result.state);
      });
    } else {
      setLocationPermission('default' as PermissionState);
    }
  }, []);

  const requestLocation = () => {
    navigator.geolocation.getCurrentPosition(
      () => setLocationPermission('granted'),
      () => setLocationPermission('denied')
    );
  };

  return (
    <>
      {locationPermission === 'denied' && (
        <div className="flex items-center  border border-yellow-300 text-yellow-600 rounded-lg shadow-lg py-2 px-4">
          <AlertTriangle className='text-yellow-600 w-4 h-4' />
          <div className="ml-2">Hãy cho phép truy cập vị trí để chúng tôi có thể tìm kiếm những nhân viên phù hợp nhất</div>
        </div>
      )}
    </>
  );
};

export default LocationReminder;

