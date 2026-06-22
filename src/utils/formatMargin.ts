// Format the margin metric for display. A margin of 0 is a real value (e.g. a pass-through
// hourly engagement, where cost equals the billed rate), so only a null/undefined margin renders
// the empty indicator. This matches the employee list card so the same employee never shows
// "0%" in one view and "-" in another.
export const formatMargin = (margin: number | null | undefined): string =>
  margin != null ? `${margin}%` : "-";
