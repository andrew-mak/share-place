export type GMapCoordinates = {
  lat: number;
  lng: number;
}

export class Map {
  constructor(coords: GMapCoordinates) {
    if (coords.lat && coords.lng) {
      this.render(coords);
    }
  }
  render(coordinates: any) {
    if (!google) {
      alert('Could not load maps library - please try again later!');
      return;
    }
    const map = new google.maps.Map(document.getElementById('map') as HTMLDivElement, {
      center: coordinates,
      zoom: 16
    });

    new google.maps.Marker({
      position: coordinates,
      map: map
    })
  }
}