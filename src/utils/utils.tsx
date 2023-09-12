import { GetCamerasDataType, GetGeoCodesDataType, LocationType } from "./types";

const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  }

  const radius: number = 6371; // Earth's radius in kilometers
  const dLat: number = (lat2 - lat1) * (Math.PI / 180);
  const dLon: number = (lon2 - lon1) * (Math.PI / 180);
  const a: number =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance: number = radius * c; // Distance in kilometers

  return distance;
};

const findNearestLocation = (
  targetLat: number,
  targetLon: number,
  locations: LocationType[]
) => {
  let nearestLocation: LocationType = {
    name: "",
    labelLocation: { longitude: 1, latitude: 1 },
  };
  let shortestDistance: number = Infinity;

  for (const location of locations) {
    const latitude: number = location.labelLocation?.latitude;
    const longitude: number = location.labelLocation?.longitude;

    const distance: number = calculateDistance(
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

const getCamerasData = (data: GetCamerasDataType) => {
  if (data.items?.length > 0) {
    return data.items[0].cameras;
  } else {
    return [];
  }
};

const getGeoCodesData = (data: GetGeoCodesDataType) => {
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
