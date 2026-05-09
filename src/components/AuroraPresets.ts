import type {
  AuroraLayer,
  SkyLayer,
} from "@/components/react-bits/aurora-blur";

// Brand-aligned aurora — orange/amber tones over black sky
export const orangeAurora: AuroraLayer[] = [
  { color: "#f87a13", speed: 0.32, intensity: 0.55 },
  { color: "#ff9a4d", speed: 0.18, intensity: 0.34 },
  { color: "#ffba80", speed: 0.12, intensity: 0.18 },
];

// Subtler aurora for less-intense backgrounds
export const subtleOrangeAurora: AuroraLayer[] = [
  { color: "#f87a13", speed: 0.28, intensity: 0.32 },
  { color: "#ff9a4d", speed: 0.15, intensity: 0.22 },
];

// Warm welcoming aurora for participant flows
export const warmAurora: AuroraLayer[] = [
  { color: "#ffb070", speed: 0.22, intensity: 0.45 },
  { color: "#f87a13", speed: 0.16, intensity: 0.32 },
  { color: "#ffd9b3", speed: 0.1, intensity: 0.18 },
];

export const blackSky: SkyLayer[] = [
  { color: "#1a0f08", blend: 0.7 },
  { color: "#000000", blend: 0.6 },
];

export const warmSky: SkyLayer[] = [
  { color: "#231209", blend: 0.55 },
  { color: "#0a0503", blend: 0.7 },
];
