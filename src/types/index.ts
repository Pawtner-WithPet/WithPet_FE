export interface Pet {
  id: number;
  name: string;
  isActive?: boolean;
}

export interface WalkRecord {
  date: string;
  time: string;
  duration: string;
  distance: string;
  speed: string;
}

export type TabType = "walk" | "health" | "pets" | "analysis";
