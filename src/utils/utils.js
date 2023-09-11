const calculateDistance = (lat1, lon1, lat2, lon2) => {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  }

  const radius = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = radius * c; // Distance in kilometers

  return distance;
};

const findNearestLocation = (targetLat, targetLon, locations) => {
  let nearestLocation = null;
  let shortestDistance = Infinity;

  for (const location of locations) {
    const latitude = location.labelLocation.latitude;
    const longitude = location.labelLocation.longitude;

    const distance = calculateDistance(
      targetLat,
      targetLon,
      latitude,
      longitude
    );

    if (distance < shortestDistance) {
      shortestDistance = distance;
      nearestLocation = location;
    }
  }

  return nearestLocation;
};

const getCamerasData = (data) => {
  if (Array.isArray(data.items) && data.items.length > 0) {
    return data.items[0].cameras;
  } else {
    return [];
  }
};

const getGeoCodesData = (data) => {
  if (
    data &&
    Array.isArray(data.area_metadata) &&
    Array.isArray(data.items) &&
    Array.isArray(data.items[0].forecasts)
  ) {
    const areas = data.area_metadata;
    const forecasts = data.items[0].forecasts;
    const geoCodes = areas.map((area, index) => {
      return {
        name: area.name,
        labelLocation: area.label_location,
        forecast: forecasts[index].forecast,
      };
    });
    return geoCodes;
  } else {
    return [];
  }
};

export {
  calculateDistance,
  findNearestLocation,
  getCamerasData,
  getGeoCodesData,
};
