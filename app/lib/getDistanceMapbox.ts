export async function getDistanceMapbox({ lat1, lon1, lat2, lon2 }: { lat1: number, lon1: number, lat2: number, lon2: number }) {
  try {
    console.log(lat1, lon1, lat2, lon2)

    const result = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${lat1}%2C${lon1}%3B${lat2}%2C${lon2}?alternatives=true&geometries=geojson&language=en&overview=full&steps=false&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`)
    const resultJson = await result.json();
    if (resultJson?.routes?.length > 0) {

      const data = resultJson.routes[0].distance
      return ({ data: data, success: true, message: "get distance successfully" })
    }
    console.log(resultJson)
    return ({ data: null, success: false, message: "get distance failed" })
  } catch (e) {
    console.log(e)
    return ({ data: null, success: false, message: "get distance failed" })

  }

}
