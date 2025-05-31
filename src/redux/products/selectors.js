export const selectCategories = (state) => state.data.categories;
export const selectProducts = (state) => state.data.products;
export const selectCounts = (state) => state.data.counts;
export const selectProductsByCategory = (state) =>
  state.data.productsByCategory;
export const selectIsLoading = (state) => state.data.isLoading;
export const selectError = (state) => state.data.error;
