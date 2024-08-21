export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

export const calculateGameRating = (game) => {
  // Implement game rating calculation logic
  return 5; // Placeholder
};
