
// Type definitions for Google Maps JavaScript API
declare interface Window {
  google?: {
    maps: {
      Map: new (element: HTMLElement, options: any) => any;
      Marker: new (options: any) => any;
      LatLng: new (lat: number, lng: number) => any;
    }
  };
  initGoogleMap?: () => void;
}
