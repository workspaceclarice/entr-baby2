export const formatPrice = (price: number | undefined): string => {
  if (price === undefined) return 'Price TBD';
  if (price === 0) return 'Free';
  return `$${price}`;
}; 