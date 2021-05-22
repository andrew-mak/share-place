import { Modal } from './UI/Modal';
import { Map, GMapCoordinates } from './UI/Map';
import { getCoordsFromAddress, getAddressFromCoords } from './Utility/Location';

class PlaceFinder {
  shareBtn: HTMLButtonElement;
  map: any;
  constructor() {
    const addressForm = document.querySelector('form') as HTMLFormElement;
    const locateUserBtn = document.getElementById('locate-btn') as HTMLButtonElement;
    this.shareBtn = document.getElementById('share-btn') as HTMLButtonElement;

    addressForm.addEventListener('submit', this.findAddresHandler.bind(this));
    locateUserBtn.addEventListener('click', this.locateUserHandler.bind(this));
    this.shareBtn.addEventListener('click', this.sharePlaceHandler);
  }

  sharePlaceHandler() {
    const sharedLinkInputElement = document.getElementById('share-link') as HTMLInputElement;
    if (!(navigator.clipboard) && sharedLinkInputElement) {
      sharedLinkInputElement.select();
      return;
    }

    navigator.clipboard.writeText(sharedLinkInputElement.value).
      then(() => {
        alert('Copied into clipboard!');
      }).catch((error) => {
        console.log(error);
        sharedLinkInputElement.select();
      });
  }

  selectPlace(coordinates: GMapCoordinates, address: string) {
    if (this.map) {
      this.map.render(coordinates);
    }
    else {
      this.map = new Map(coordinates);
    }
    this.shareBtn.disabled = false;
    const sharedLinkInputElement = document.getElementById('share-link') as HTMLInputElement;
    sharedLinkInputElement.value = `${location.origin}/myplace?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${coordinates.lng}`;
  }

  locateUserHandler = () => {
    if (!navigator.geolocation) {
      alert('Location feature is not available in your browser - please use a more modern browser or manually enter an address.');
      return;
    }
    const modal = new Modal('loading-modal-content', 'Loading location - please wait');
    modal.show();
    navigator.geolocation.getCurrentPosition(async successResult => {

      const coordinates: GMapCoordinates = {
        lat: successResult.coords.latitude,
        lng: successResult.coords.longitude,
      };
      const address = await getAddressFromCoords(coordinates);
      modal.hide();
      this.selectPlace(coordinates, address);
    }, error => {
      modal.hide();
      alert('Could not locate you unfortunately. Plese, enter an address manually!' + '\n' + error);
    })
  }

  async findAddresHandler(event: Event) {
    if (event.target) {
      event.preventDefault();
      const form = event.target as HTMLFormElement;
      const address = form.querySelector('input')?.value as string;
      if (!address || address.trim().length === 0) {
        alert('Invalid address entered - please try again!');
        return;
      }
      const modal = new Modal('loading-modal-content', 'Loading location, please wait.');
      modal.show();
      try {
        const coordinates = await getCoordsFromAddress(address);
        this.selectPlace(coordinates, address);
      } catch (error) {
        alert(error.message);
      }
      modal.hide();
    }
  }
}
new PlaceFinder();