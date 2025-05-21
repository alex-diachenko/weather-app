export interface CityModel {
  country: string;
  lat: number;
  local_names: { [key: string]: string };
  lon: number;
  name: string;
}
