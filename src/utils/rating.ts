export function getRatingPercentage(rating: number): string {
  return `${rating}%`;
}

export function getNumericRating(rating: number): string {
  return (rating / 20).toFixed(1);
}
