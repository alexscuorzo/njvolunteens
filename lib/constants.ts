export const NJ_COUNTIES = [
  "Atlantic",
  "Bergen",
  "Burlington",
  "Camden",
  "Cape May",
  "Cumberland",
  "Essex",
  "Gloucester",
  "Hudson",
  "Hunterdon",
  "Mercer",
  "Middlesex",
  "Monmouth",
  "Morris",
  "Ocean",
  "Passaic",
  "Salem",
  "Somerset",
  "Sussex",
  "Union",
  "Warren",
] as const;

export const CAUSE_AREAS = [
  "Animals",
  "Arts & Culture",
  "Civic & Government",
  "Community Events",
  "Environment",
  "Food & Hunger",
  "Housing & Homelessness",
  "Hospitals & Health",
  "Libraries",
  "Seniors",
  "Sports & Recreation",
  "Tutoring & Education",
] as const;

export type County = (typeof NJ_COUNTIES)[number];
export type CauseArea = (typeof CAUSE_AREAS)[number];
