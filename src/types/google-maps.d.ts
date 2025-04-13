
// Type definitions for Google Maps JavaScript API
declare interface Window {
  google: {
    maps: {
      Map: new (element: HTMLElement, options: any) => any;
      Marker: new (options: any) => any;
      InfoWindow: new (options: any) => any;
      LatLng: new (lat: number, lng: number) => any;
      MapTypeId: {
        ROADMAP: string;
        SATELLITE: string;
        HYBRID: string;
        TERRAIN: string;
      }
    }
  };
  initGoogleMap?: () => void;
}
