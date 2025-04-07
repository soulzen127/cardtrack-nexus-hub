
import React from 'react';
import { createMarkers } from './map/createMarkers';
import { CardLocation } from './map/types';

// Dummy component for bundling related functions
export const MapMarker: React.FC = () => {
  return null;
};

// Re-export the types and functions
export type { CardLocation };
export { createMarkers };

export default MapMarker;
