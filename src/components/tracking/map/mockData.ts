
import { CardLocation, IndoorMapData } from './types';

// Mock card locations with floor data
export const mockCardLocations: CardLocation[] = [
  {
    id: "card-001",
    name: "Employee Card #1",
    location: "Office Building, Floor 1",
    coordinates: [121.5654, 25.0330],
    floor: 1,
    building: "office-hq"
  },
  {
    id: "card-002",
    name: "Employee Card #2",
    location: "Office Building, Floor 2",
    coordinates: [121.5658, 25.0334],
    floor: 2,
    building: "office-hq"
  },
  {
    id: "card-003",
    name: "Visitor Card #1",
    location: "Warehouse, Ground Floor",
    coordinates: [121.5645, 25.0320],
    floor: 0,
    building: "warehouse"
  },
  {
    id: "card-004",
    name: "Logistics Card #1",
    location: "Downtown",
    coordinates: [121.5180, 25.0456],
    // No floor - outdoor location
  },
  {
    id: "card-005",
    name: "Security Card #1",
    location: "Office Building, Basement",
    coordinates: [121.5650, 25.0328],
    floor: -1,
    building: "office-hq"
  }
];

// Mock indoor map data
export const mockIndoorMaps: IndoorMapData[] = [
  {
    id: "map-001",
    name: "Office Building Floor Plans",
    description: "HQ Office building floor plans",
    type: "2d",
    url: "/indoor-maps/office-floor-plan.svg",
    floors: [-1, 0, 1, 2, 3],
    defaultFloor: 1,
    buildingId: "office-hq"
  },
  {
    id: "map-002",
    name: "Warehouse 3D Model",
    description: "3D model of the main warehouse",
    type: "3d",
    url: "/indoor-maps/warehouse.glb",
    floors: [-1, 0, 1],
    defaultFloor: 0,
    buildingId: "warehouse"
  }
];
