
// =name, flags, population, region, currencies
export type Country = {
  name:any;
  region: string;
  currencies: any;
  population: number;
  flags: any;
  latlng: number[];
};
export type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
};

export type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export type Geo = {
  lat: string;
  lng: string;
};
