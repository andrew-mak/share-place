import { Map, GMapCoordinates } from './UI/Map';

class LoadedPlace {
  constructor(coordinates: GMapCoordinates, address: string) {
    new Map(coordinates);
    const headerTitleEl = document.querySelector('header h1');
    if (headerTitleEl) headerTitleEl.textContent = address;
  }
}

const url = new URL(location.href);
const queryParams = url.searchParams;
let coords = null;
if (queryParams) {
  const lat = queryParams.get('lat');
  const lng = queryParams.get('lng');
  if (lat && lng)
    coords = {
      lat: +lat,
      lng: +lng
    };
}

const address = queryParams.get('address');
if (address?.length && coords) new LoadedPlace(coords, address);