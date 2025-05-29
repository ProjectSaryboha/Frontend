export const selectCategories = (state) => state.products.categories;
export const selectProducts = (state) => state.products.products;
export const selectCounts = (state) => state.products.counts;
export const selectProductsByCategory = (state) =>
  state.products.productsByCategory;
export const selectIsLoading = (state) => state.products.isLoading;
export const selectError = (state) => state.products.error;
