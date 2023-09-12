export interface SelectedLocationDataType {
  forecast: string;
  images: string[];
}

export interface WeatherTrafficDataType {
  status?: any;
  api_info?: any;
  area_metadata: any[];
  items: any[];
}

export interface TrafficImagesDataType {
  status?: any;
  api_info?: any;
  items: any[];
}
