export interface LabelLocationType {
  latitude: number;
  longitude: number;
}

export interface LocationType {
  name: string;
  labelLocation: LabelLocationType;
}

export interface CameraDataType {
  image: string;
}

export interface CamerasType {
  cameras: CameraDataType[];
}

export interface ForecastsType {
  area: string;
  forecast: string;
}

export interface ForecastItemsType {
  forecasts: ForecastsType[];
}

export interface AreaMetaDataType {
  name: "";
  label_location: LabelLocationType;
}

export interface GetCamerasDataType {
  items: CamerasType[];
}

export interface GetGeoCodesDataType {
  items: ForecastItemsType[];
  area_metadata: AreaMetaDataType[];
}
