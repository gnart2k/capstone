export function getAddressFromCoordinates({ latitude, longitude }: { latitude: number, longitude: number }) {
  return new Promise((resolve, reject) => {
    fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
      latitude +
      ',' +
      longitude +
      '&key=' +
      process.env.NEXT_PUBLIC_GOOGLE_MAP_API,
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson)
        if (responseJson.status === 'OK') {
          resolve(responseJson?.results?.[0]?.formatted_address);
        } else {
          reject('not found');
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}


